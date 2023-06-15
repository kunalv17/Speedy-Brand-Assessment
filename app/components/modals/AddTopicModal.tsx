import React from "react";
import Modal from "../shared/Modal";
import Input from "../shared/Input";
import Button from "../shared/Button";
import { useAppContext } from "../../context/AppContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
import { useForm, FieldValues } from "react-hook-form";

const AddTopicModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { setCustomData } = useAppContext();

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      topic: "",
      keywords: [],
    },
  });

  const onSubmit = (FormData: any) => {
    const data = {
      topic: FormData.topic,
      keywords: FormData.keywords.split(","),
    };
    setCustomData((prevData) => [...prevData, data]);
    setValue("topic", "");
    setValue("keywords", []);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <h3 className="font-semibold text-[#303030]">Custom Topic</h3>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
          <div className="flex w-full justify-end gap-4">
            <Button danger onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddTopicModal;
