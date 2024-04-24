import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type BuildingsProps = {
  building: String;
  image: String;
  location: String;
};

export default function ({ building }: BuildingsProps) {
  const { name, image, location } = building;
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${image}`;
  return (
    <div className="relative flex w-full cursor-pointer flex-col rounded-md border-2 border-transparent p-4 pb-4 text-sm shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] hover:border-primary/50 md:text-base">
      <div className="mx-auto flex h-[200px] w-full items-center justify-center overflow-hidden bg-accent">
        <img
          src={imageUrl}
          alt=""
          className="max-h-[200px] rounded-md transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="mt-3">
        <h3 className="mb-1 line-clamp-2 font-semibold" title={name}>
          {name}
        </h3>
        <p className="line-clamp-2 text-sm">{location}</p>
      </div>
    </div>
  );
}
