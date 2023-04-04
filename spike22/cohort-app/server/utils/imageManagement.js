import { v2 as cloudinary } from "cloudinary";

export const imageUpload = async(file, folder) => {
  console.log("file:", file);
  console.log("folder:", folder);
  try {
    const result = await cloudinary.uploader.upload(file.path, { folder: folder });
    return result
  } catch(e) {
    return e
  }
}