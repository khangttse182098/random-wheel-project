import cloudinary from "../../config/cloudinaryConfig";

export const uploadImage = async (filePath: string) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "random-wheel",
    });
    return result;
  } catch (error) {
    throw new Error("Image upload failed");
  }
};
