import { NextResponse } from "next/server";
import JSZip from "jszip";

export async function POST(request: Request) {
  try {
    const { imageUrls }: { imageUrls: string[] } = await request.json();

    if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
      return NextResponse.json({ error: "No image URLs provided" }, { status: 400 });
    }

    const zip = new JSZip();

    // Fetch and add each image to the zip
    await Promise.all(
      imageUrls.map(async (url, index) => {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to fetch image at ${url}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const fileName = getFileNameFromUrl(url, index);
        zip.file(fileName, arrayBuffer);
      })
    );

    // Generate the zip file
    const zipContent = await zip.generateAsync({ type: "nodebuffer" });

    // Serve the zip file
    return new NextResponse(zipContent, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="images.zip"',
      },
    });
  } catch (error) {
    console.error("Error generating zip:", error);
    return NextResponse.json({ error: "An error occurred while generating the zip file" }, { status: 500 });
  }
}

// Helper function to get file extension from URL
function getFileExtension(url: string): string {
  const pathname = new URL(url).pathname;
  const ext = pathname.split(".").pop();
  return ext || "jpg"; // Default to 'jpg' if extension is missing
}

function getFileNameFromUrl(url: string, index: number): string {
  try {
    const pathname = new URL(url).pathname;
    let fileName = pathname.substring(pathname.lastIndexOf("/") + 1);
    if (!fileName) {
      fileName = `image_${Date.now()}_${index}.${getFileExtension(url)}`;
    } else {
      // Append index if filename already exists in zip
      fileName = `${index}_${fileName}`;
    }
    return fileName;
  } catch {
    return `image_${Date.now()}_${index}.${getFileExtension(url)}`;
  }
}
