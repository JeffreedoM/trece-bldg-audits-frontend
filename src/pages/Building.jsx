import { useCallback, useEffect, useState } from "react";
import axios from "../../api/axios";
import { useParams, Link } from "react-router-dom";
import { useBuildingContext } from "../hooks/useBuildingContext";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import EditBldgForm from "@/components/EditBldgForm";
import { ResponsivePie } from "@nivo/pie";
import { useDropzone } from "react-dropzone";
import { FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "@/components/ui/use-toast";
import { useAuthContext } from "../hooks/useAuthContext";

import schoolImg from "../assets/school.jpg";
import BldgDefects from "../components/BldgDefects";

function Building() {
  const { id } = useParams();
  const { building, dispatch } = useBuildingContext();
  const { user } = useAuthContext();

  const [editMode, setEditMode] = useState(false);

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

  let imageUrl = "";

  if (
    (building && building.image === undefined) ||
    (building && building.image == "")
  ) {
    imageUrl = schoolImg;
  } else {
    imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${building && building.image}`;
  }

  useEffect(() => {
    axios
      .get(`/${id}`)
      .then((response) => {
        console.log(response.data);
        dispatch({ type: "SET_BUILDING", payload: response.data });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // react dropzone
  const [imagePreview, setImagePreview] = useState("null");
  const [image, setImage] = useState(null);
  const [updateImageSuccess, setUpdateImageSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the dropped files, like setting the image state
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
      setImage(file);
      setUpdateImageSuccess(false);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const [hoverChangeImage, sethoverChangeImage] = useState(false);

  const handleChangeImage = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.put(`/edit-bldg-image/${id}`, formData);
      console.log("Response:", response.data);
      toast({
        title: "Successfully updated image!",
      });
      setUpdateImageSuccess(true);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wrapper pt-4">
      <div className="w-full rounded-md bg-muted p-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to={"/"}>
                <BreadcrumbLink>Home</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link to={"/schools"}>
                <BreadcrumbLink>Schools</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  <BreadcrumbEllipsis className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>
                    <Link to={`/schools/${building && building.school}`}>
                      {building && building.school}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{building && building.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="grid grid-cols-3 gap-10 pt-8">
        <div className="col-span-3 mb-3 md:mb-0 lg:col-span-1">
          {/* <img src={imageUrl} alt="" className="mx-auto h-72" /> */}
          {!user ? (
            <img src={imageUrl} alt="Building Image" className="mx-auto h-72" />
          ) : (
            <div {...getRootProps()}>
              <input {...getInputProps()} name="image" type="file" />
              {image ? (
                <div
                  onMouseEnter={() => {
                    sethoverChangeImage(true);
                  }}
                  onMouseLeave={() => {
                    sethoverChangeImage(false);
                  }}
                  className="relative cursor-pointer"
                >
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mx-auto h-72"
                  />
                  <div
                    className={`${hoverChangeImage ? "opacity-100" : "opacity-0"} absolute bottom-0 w-full bg-black/60 p-4 text-center text-sm text-white transition-opacity duration-300 `}
                  >
                    Change Image
                  </div>
                </div>
              ) : (
                <div
                  onMouseEnter={() => sethoverChangeImage(true)}
                  onMouseLeave={() => sethoverChangeImage(false)}
                  className="relative cursor-pointer"
                >
                  <img src={imageUrl} alt="Preview" className="mx-auto h-72" />
                  <div
                    className={`${hoverChangeImage ? "opacity-100" : "opacity-0"} absolute bottom-0 w-full bg-black/60 p-4 text-center text-sm text-white transition-opacity duration-300 `}
                  >
                    Change Image
                  </div>
                </div>
              )}
            </div>
          )}
          <div>
            {image && !updateImageSuccess && (
              <div className="mt-4 flex items-center justify-between rounded-md bg-accent p-3 text-sm font-semibold">
                {isLoading ? (
                  <p className="mx-auto">Updating Image...</p>
                ) : (
                  <>
                    <p>Confirm Update?</p>
                    <div className="flex gap-1">
                      <FaCheck
                        className="cursor-pointer text-lg text-green-400"
                        onClick={handleChangeImage}
                      />
                      <FaTimes
                        className="cursor-pointer text-lg text-red-500"
                        onClick={() => setImage(null)}
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="my-3">
            <h3 className="text-sm font-semibold">Sample Defects Found:</h3>
            <BldgDefects />
          </div>
        </div>
        <div className="col-span-3 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-bold">Building Information</h3>
            {user && (
              <Button onClick={() => setEditMode(!editMode)}>
                {editMode ? "Close" : "Edit"}
              </Button>
            )}
          </div>

          {editMode ? (
            <EditBldgForm />
          ) : (
            <>
              <div className="mb-3">
                <h3 className="text-sm font-semibold">Building</h3>
                <div className="min-h-11 rounded-md bg-accent p-3 text-sm">
                  {building && building.name}
                </div>
              </div>
              <div className="mb-3">
                <h3 className="text-sm font-semibold">Year Established</h3>
                <div className="min-h-11 rounded-md bg-accent p-3 text-sm">
                  {building && building.year}
                </div>
              </div>
              <div className="mb-3">
                <h3 className="text-sm font-semibold">Location</h3>
                <div className="min-h-11 rounded-md bg-accent p-3 text-sm">
                  {building && building.location}
                </div>
              </div>
              <div className="mb-3">
                <h3 className="text-sm font-semibold">Number of Storey</h3>
                <div className="min-h-11 rounded-md bg-accent p-3 text-sm">
                  {building && building.storey}
                </div>
              </div>
              <div className="mb-3">
                <h3 className="text-sm font-semibold">Type of Building</h3>
                <div className="min-h-11 rounded-md bg-accent p-3 text-sm">
                  {building && building.building_type}
                </div>
              </div>
              <div className="mb-3">
                <h3 className="text-sm font-semibold">Type of Structure</h3>
                <div className="min-h-11 rounded-md bg-accent p-3 text-sm">
                  {building && building.structure_type}
                </div>
              </div>
              <div className="mb-3">
                <h3 className="text-sm font-semibold">Design Occupancy</h3>
                <div className="min-h-11 rounded-md bg-accent p-3 text-sm">
                  {building && building.occupancy}
                </div>
              </div>

              <p className="my-6 font-bold">Summary Report</p>

              <div className="mb-3">
                <h3 className="text-sm font-semibold">RVS Score</h3>
                <div className="min-h-11 rounded-md bg-accent p-3 text-sm">
                  {building && building.rvs_score}
                </div>
              </div>

              <div className="mb-3">
                <h3 className="text-sm font-semibold">Vulnerability</h3>
                <div className="min-h-11 rounded-md bg-accent p-3 text-sm">
                  {building && building.vulnerability}
                </div>
              </div>
              <div className="mb-3">
                <h3 className="text-sm font-semibold">Physical Conditions</h3>
                <div className="min-h-11 rounded-md bg-accent p-3 text-sm">
                  {building && building.physical_conditions}
                </div>
              </div>
              <div className="mb-3 mt-6">
                <h3 className="text-sm font-semibold">
                  Compliance to Accessibility Law
                </h3>
              </div>
              <div className="h-[350px] w-full">
                <ResponsivePie
                  activeOuterRadiusOffset={8}
                  // width={500}
                  height={350}
                  animate
                  data={[
                    {
                      color: "hsl(156, 70%, 50%)",
                      id: "yes",
                      value: `${building && building.compliance}`,
                    },
                    {
                      color: "hsl(106, 70%, 50%)",
                      id: "no",
                      value: `${100 - (building && building.compliance)}`,
                    },
                  ]}
                  legends={[
                    {
                      anchor: "top-right",
                      direction: "column",
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemTextColor: "#000",
                          },
                        },
                      ],
                      itemHeight: 18,
                      itemTextColor: "#999",
                      itemWidth: 100,
                      symbolShape: "circle",
                      symbolSize: 18,
                      toggleSerie: true,
                    },
                  ]}
                  margin={{
                    bottom: 10,
                    left: 120,
                    right: 120,
                    top: 10,
                  }}
                  theme={{
                    text: {
                      fontFamily:
                        "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
                    },
                  }}
                />
              </div>

              <div className="mb-3">
                <h3 className="text-sm font-semibold">
                  Remarks for Compliance to Accessibility Law
                </h3>
                <div className="min-h-11 rounded-md bg-accent p-3 text-sm">
                  {building && building.remarks}
                </div>
              </div>
              <div className="mb-3">
                <h3 className="text-sm font-semibold">
                  Hazard/Risk Mitigation Actions
                </h3>
                <div className="min-h-11 rounded-md bg-accent p-3 text-sm">
                  {building && building.mitigation_actions}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Building;
