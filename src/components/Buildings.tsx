//@ts-nocheck
import { IoLocationOutline } from "react-icons/io5";
import schoolImg from "../assets/school.jpg";

type BuildingsProps = {
  building: String;
  image: String;
  location: String;
};

export default function ({ building }: BuildingsProps) {
  const { name, image, location } = building;
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  let imageUrl = "";

  if (image === "" || image === undefined) {
    imageUrl = schoolImg;
  } else {
    imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${image}`;
  }
  return (
    <div className="relative flex h-[300px] w-full cursor-pointer flex-col rounded-md border-2 border-transparent pb-2 text-sm shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] hover:border-primary/50 md:text-base">
      <div className="mx-auto flex h-[70%] w-full items-center justify-center overflow-hidden bg-accent">
        <img
          src={imageUrl}
          alt="Building Image"
          className="rounded-md transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="mt-3 flex h-[30%] flex-col justify-between px-2">
        <h3 className="mb-1 line-clamp-2 text-sm" title={name}>
          {name}
        </h3>
        <div className="flex items-center gap-x-1" title={location}>
          <div>
            <IoLocationOutline className=" text-sm" />
          </div>
          <span className="line-clamp-1 text-xs font-light">{location}</span>
        </div>
      </div>
    </div>
  );
}
