import { FaPlus } from "react-icons/fa";

function AddButton() {
  return (
    <div className="fixed bottom-6 left-1/2 z-10 -translate-x-1/2">
      <div className="bg-primary text-secondary border-secondary hover:bg-primary/90 cursor-pointer rounded-full border-4 p-3">
        <FaPlus />
      </div>
    </div>
  );
}

export default AddButton;
