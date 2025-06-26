import React from "react";

const TrashHeader = () => {
  return (
    <div className="flex justify-between items-center border-b">
      <div className="px-5 py-3">
        <h1 className="text-xl font-IBMPlexSans font-semibold">Trash</h1>
      </div>
      <div className="flex space-x-3 justify-start items-center pr-10 py-3">
        <div className="border py-2 px-4 flex space-x-2 hover:bg-taf-color hover:text-white hover:transition hover:duration-300 hover:ease-in-out rounded-[3px]">
          <span className={`text-[13px] font-MonaSans`}>Empty Trash</span>
        </div>
        <div className="border py-2 px-4 flex space-x-2 hover:bg-taf-color hover:text-white hover:transition hover:duration-300 hover:ease-in-out rounded-[3px]">
          <span className={`text-[13px] font-MonaSans`}>Restore All</span>
        </div>
      </div>
    </div>
  );
};

export default TrashHeader;
