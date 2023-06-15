"use client";

import { useAppContext } from "@/app/context/AppContext";
import { SuggestedTopics } from "../constants";
import SingleTopic from "@/app/components/SingleTopic";
import dynamic from "next/dynamic";

const SectionBody: React.FC = () => {
  const { activeState, setActiveState, customData, setCustomData } =
    useAppContext();

  return (
    <div className="mt-8 border">
      <div className="flex w-full flex-col divide-y">
        <div className="px-4 py-3 text-sm bg-gray-100">
          {activeState === 0
            ? "All Topics"
            : activeState === 1
            ? "Recommended Topics"
            : customData.length > 0
            ? "Custom Topics"
            : "No Custom Topic create one by clicking on add topic button"}
        </div>
        {activeState === 0 &&
          [...SuggestedTopics, ...customData].map((item, index) => (
            <SingleTopic key={index} data={item} />
          ))}
        {activeState === 1 &&
          [...SuggestedTopics].map((item, index) => (
            <SingleTopic key={index} data={item} />
          ))}
        {activeState === 2 &&
          [...customData].map((item, index) => (
            <SingleTopic key={index} data={item} />
          ))}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(SectionBody), {
  ssr: false,
});
