import { useState } from "react";
import Button from "./shared/Button";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { ColorCycle } from "../constants";
import GenerateBlogModal from "./modals/GeneateBlogModal";
import dynamic from "next/dynamic";

interface Props {
  data: ISuggestedData;
}

const SingleTopic: React.FC<Props> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="px-4 py-3 w-full flex justify-between gap-2">
      <div className="flex flex-col gap-2 w-full">
        <h6 className="text-[#303030] font-medium text-sm lg:text-lg line-clamp-1">
          {data.topic}
        </h6>
        <div className="flex items-center gap-2 flex-wrap">
          {data.keywords.map((keyword, index) => (
            <div key={index} className="flex items-center gap-1">
              <p
                className={`flex text-[#303030] font-medium w-fit text-xs lg:text-sm border rounded-md sm:px-2 sm:py-1 px-1 line-clamp-1 truncate ${
                  ColorCycle[index % ColorCycle.length]
                }`}
              >
                {keyword}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Button onClick={() => setIsModalOpen(true)}>
          <span className="flex gap-2">
            <span className="text-white">Write</span>
            <span>
              <ChevronRightIcon className="h-5 w-5 stroke-[2]" />
            </span>
          </span>
        </Button>
      </div>
      <GenerateBlogModal
        data={data}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default dynamic(() => Promise.resolve(SingleTopic), { ssr: false });
