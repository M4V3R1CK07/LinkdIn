// pages/api/upload.js
import { IncomingForm } from "formidable"; // using the named import from formidable
import fs from "fs";
import path from "path";

// Disable Next.js body parser so that formidable can handle multipart/form-data.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Define the directory to store uploads (in public/uploads)
  const uploadDir = path.join(process.cwd(), "public/uploads");
  fs.mkdirSync(uploadDir, { recursive: true });

  // Initialize formidable with options
  const form = new IncomingForm({
    uploadDir,
    keepExtensions: true, // keep original file extensions
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("Error parsing files:", err);
      return res.status(500).json({ error: "Error parsing the files" });
    }

    console.log("Received fields:", fields);
    console.log("Received files:", files);

    // Handle if files.file is an array or a single file
    const fileData = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!fileData) {
      console.error("No file uploaded! Files object:", files);
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Get the file name from the temporary file's path
    const fileName = path.basename(fileData.filepath);
    // Create the file's public URL. Files in the public folder are served at the root.
    const fileUrl = `/uploads/${fileName}`;
    console.log("Upload successful. File available at:", fileUrl);

    return res.status(200).json({ url: fileUrl });
  });
}
