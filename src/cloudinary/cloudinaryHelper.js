import { cloudName, uploadPreset } from "./cloudinaryConfig";

const baseUrl = `https://api.cloudinary.com/v1_1/${cloudName}`;

export const makeUploadRequest = ({
  file,
  fieldName,
  progressCallback,
  successCallback,
  errorCallback,
}) => {
  const url = `${baseUrl}/image/upload`;

  const formData = new FormData();
  formData.append(fieldName, file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", "trece-building-audits"); // Created folder in cloudinary

  const request = new XMLHttpRequest();
  request.open("POST", url);

  request.upload.onprogress = (e) => {
    progressCallback(e.lengthComputable, e.loaded, e.total);
  };

  request.onload = () => {
    if (request.status >= 200 && request.status < 300) {
      const { delete_token: deleteToken, public_id: publicId } = JSON.parse(
        request.response,
      );

      console.log(request.response);
      successCallback(deleteToken);
      console.log(publicId);
    } else {
      errorCallback(request.responseText);
    }
  };

  console.log(formData);
  request.send(formData);

  return () => {
    request.abort();
  };
};

export const makeDeleteRequest = ({
  token,
  successCallback,
  errorCallback,
}) => {
  const url = `${baseUrl}/delete_by_token`;

  const request = new XMLHttpRequest();
  request.open("POST", url);

  request.setRequestHeader("Content-Type", "application/json");

  request.onload = () => {
    if (request.status >= 200 && request.status < 300) {
      successCallback();
    } else {
      errorCallback(request.responseText);
    }
  };
  request.send(JSON.stringify({ token }));
};
