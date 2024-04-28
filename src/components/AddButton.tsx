import React from "react";
import { FaPlus } from "react-icons/fa";

function AddButton() {
  return (
    <div className="fixed bottom-6 left-1/2 z-10 -translate-x-1/2">
      <div className="cursor-pointer rounded-full border-4 border-secondary bg-primary p-3 text-secondary hover:bg-primary/90">
        <FaPlus />
      </div>
    </div>
  );
}

export default AddButton;
