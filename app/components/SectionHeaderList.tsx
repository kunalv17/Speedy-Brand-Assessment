"use client";

import { useState } from "react";
import Button from "./shared/Button";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { SectionHeaderListData } from "@/app/constants/index";
import { useAppContext } from "../context/AppContext";
import AddTopicModal from "./modals/AddTopicModal";

interface SectionHeaderListProps {}

const SectionHeaderList: React.FC<SectionHeaderListProps> = ({}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activeState, setActiveState } = useAppContext();
  return (
    <>
      <div className="flex justify-between mt-4 items-center flex-wrap">
        <div className="flex">
          {SectionHeaderListData.map((item, index) => (
            <div
              key={index}
              className={`px-2 py-1 sm:px-8 sm:py-3 border-b-4 box-border ${
                activeState === index
                  ? "border-orange-500 text-orange-500"
                  : "border-transparent"
              } cursor-pointer hover:bg-gray-100`}
              onClick={() => setActiveState(index)}
            >
              <h3 className="font-semibold">{item.title}</h3>
            </div>
          ))}
        </div>
        <div className="mt-4 sm:mt-0">
          <Button onClick={() => setIsModalOpen(true)}>
            <span className="flex gap-2">
              <span className="text-white">Add Topic</span>
              <span>
                <ChevronRightIcon className="h-5 w-5 stroke-[2]" />
              </span>
            </span>
          </Button>
        </div>
        <AddTopicModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </>
  );
};

export default SectionHeaderList;
