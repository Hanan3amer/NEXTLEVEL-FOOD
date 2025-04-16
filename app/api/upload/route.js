import cloudinary from "@/lib/cloudinary";
import fs from "fs";

export async function POST(req) {
  const data = await req.formData();
  const file = data.get("file");

  const buffer = Buffer.from(await file.arrayBuffer());
  const tmpPath = `/tmp/${file.name}`;
  fs.writeFileSync(tmpPath, buffer);

  try {
    const result = await cloudinary.uploader.upload(tmpPath, {
      folder: "meals",
    });
    return Response.json({ url: result.secure_url });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Upload failed" }), {
      status: 500,
    });
  }
}
