import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import { FaTimes, FaTrashAlt } from "react-icons/fa";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";
import { useBuildingContext } from "../hooks/useBuildingContext";

import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

function BldgDefects() {
  const { building, dispatch } = useBuildingContext();
  const { id } = useParams();
  const [imagePreviews, setImagePreviews] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreviews((prevPreviews) => [...prevPreviews, reader.result]);
      };
      reader.readAsDataURL(file);
    });
    setImages(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const removeImage = (index, e) => {
    e.stopPropagation();
    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(index, 1);
    setImagePreviews(updatedPreviews);
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const getBldgDefects = async () => {
    try {
      const response = await axios.get(`/${id}`);
      if (response) {
        console.log("Get buildings:", response.data);
        dispatch({ type: "SET_BUILDING", payload: response.data });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    try {
      const formData = new FormData();
      images.forEach((file) => {
        formData.append("images", file);
      });

      const response = await axios.put(`/uploadBldgDefects/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Images uploaded successfully:", response.data);
      getBldgDefects();
      setIsLoading(false);
      setImages("");
      setImagePreviews("");
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  // For cloudinary fetching defects
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

  const onInit = () => {
    // console.log("lightGallery has been initialized");
  };

  const deleteDefectImage = async (defect) => {
    try {
      const response = await axios.delete(`/deleteBldgDefect/${id}`, {
        data: { defect: defect },
      });

      if (response) {
        getBldgDefects();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="mb-3">
        {building && building.defects && building.defects.length > 0 ? (
          <LightGallery
            onInit={onInit}
            speed={500}
            plugins={[lgThumbnail, lgZoom]}
          >
            {building.defects.map((defect) => (
              <a
                key={defect}
                href={`https://res.cloudinary.com/${cloudName}/image/upload/${defect}`}
                className={`relative m-0.5 inline-flex w-[30%] items-center`}
              >
                <img
                  key={defect} // Adding a unique key prop for each image
                  src={`https://res.cloudinary.com/${cloudName}/image/upload/${defect}`}
                  alt="Defect Image" // Make sure to provide an alt attribute for accessibility
                  className=""
                />
                {user && (
                  <div
                    onClick={() => {
                      deleteDefectImage(defect);
                    }}
                    className="absolute bottom-[2px] right-[2px] origin-bottom-right rounded-md bg-muted p-1 text-destructive transition-all hover:scale-150"
                  >
                    <FaTrashAlt />
                  </div>
                )}
              </a>
            ))}
          </LightGallery>
        ) : (
          <div className="my-3 text-center text-sm">No Defect Images Found</div>
        )}
      </div>
      {user && (
        <div
          {...getRootProps()}
          className="mb-3 cursor-pointer rounded-md border bg-accent p-5 text-center"
        >
          <input {...getInputProps()} name="images" type="file" multiple />
          {images.length > 0 && imagePreviews.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-3 bg-accent">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <button
                    className="absolute -right-1 -top-1 rounded-full bg-destructive p-1 text-muted transition-all hover:p-1.5"
                    onClick={(e) => removeImage(index, e)}
                  >
                    <FaTimes />
                  </button>
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="h-20"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h4 className="mb-3 font-semibold">Add Defects</h4>
              <p className="text-sm">
                Drag & drop images here, or click to select images
              </p>
            </div>
          )}
          {images.length > 0 && (
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className="mt-3 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              {isLoading ? "Uploading..." : "Upload Images"}
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default BldgDefects;
