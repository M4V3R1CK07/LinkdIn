// pages/api/upload.js
import { IncomingForm } from "formidable";
import cloudinary from "../../lib/cloudinary";

// Disable Next.js's default body parsing so that formidable can handle the file stream.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Create a new instance of IncomingForm.
  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing files:", err);
      return res.status(500).json({ error: "Error parsing file" });
    }

    // Extract the file from the parsed form data.
    // It might be an array if multiple files were sent, so use the first one.
    let fileData = files.file;
    if (Array.isArray(fileData)) {
      fileData = fileData[0];
    }

    if (!fileData) {
      console.error("No file found in form data. Files object:", files);
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("File received:", fileData);

    try {
      // Upload the file to Cloudinary.
      const result = await cloudinary.uploader.upload(fileData.filepath, {
        folder: "your_folder_name", // Optional: change this to your desired folder name.
        resource_type: "auto", // 'auto' lets Cloudinary detect the file type (image/video).
      });

      return res.status(200).json({ url: result.secure_url });
    } catch (uploadError) {
      console.error("Upload error:", uploadError);
      return res.status(500).json({ error: "Error uploading file" });
    }
  });
}
