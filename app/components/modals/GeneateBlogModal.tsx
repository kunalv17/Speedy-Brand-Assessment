import React, { useEffect, useState, useMemo, useRef } from "react";
import Modal from "../shared/Modal";
import Input from "../shared/Input";
import Button from "../shared/Button";
import Select from "../shared/Select";
import { useForm, FieldValues } from "react-hook-form";
import JoditEditor from "jodit-react";
import { JoditButtons, Options } from "../../constants";
import { generateBlog } from "@/app/api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: ISuggestedData;
}

const GenerateBlogModal: React.FC<Props> = ({ isOpen, onClose, data }) => {
  const editor = useRef(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [tone, setTone] = useState("formal");

  const config = useMemo(
    () => ({
      buttons: JoditButtons,
      readonly: false,
      placeholder: "Enter your content here...",
      height: 350,
      toolbarAdaptive: true,
      removeButtons: ["fullsize"],
    }),
    []
  );

  useEffect(() => {
    setValue("topic", data.topic);
    setValue("keywords", data.keywords.join(", "));
  }, []);

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      topic: data.topic,
      keywords: [...data.keywords],
    },
  });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  const handleAIContent = async () => {
    setLoading(true);
    if (watch("topic") === "" && watch("keywords") === "" && tone === "")
      return;
    const payload = {
      topic: watch("topic"),
      keywords: watch("keywords"),
      tone: tone,
    };
    try {
      const response = await generateBlog(payload);
      response && setContent(response);
    } catch (error) {
      // Handle the error
      console.error("Error generating blog:", error);
    }
    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} fullScreen={true}>
      <div className="editor flex flex-col gap-4 h-[calc(100vh-112px)] overflow-y-scroll">
        <h3 className="font-semibold text-[#303030]">Blog Editor</h3>
        <form
          className="flex flex-col gap-4 justify-between h-[100%]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-4">
            <div>
              <Input
                label="Topic"
                id="topic"
                register={register}
                errors={errors}
                required
              />
            </div>
            <div>
              <Input
                label="Keywords"
                id="keywords"
                register={register}
                errors={errors}
                required
              />
              <p className="text-xs text-[#303030]">
                Please enter keywords seperated by comma
              </p>
            </div>
          </div>
          <div className="flex-grow">
            <JoditEditor
              className="h-full"
              ref={editor}
              value={content}
              config={config}
              onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            />
          </div>
          <div className="flex w-full justify-between gap-4 flex-wrap">
            <div className="flex gap-4">
              <Select
                value={tone}
                options={Options}
                onChange={(value) => setTone(value)}
                placeholder={"Select Tone"}
              />
              <Button type="button" generate onClick={handleAIContent}>
                {loading ? "Generating..." : "Generate"}
              </Button>
            </div>
            <div className="flex gap-4">
              <Button danger onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default GenerateBlogModal;
