// app/api/download-file/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fileUrl = searchParams.get("url");
  const fileName = searchParams.get("filename") || "file";

  if (!fileUrl) {
    return NextResponse.json({ error: "File URL is required" }, { status: 400 });
  }

  try {
    // Fetch the external file
    const externalResponse = await fetch(fileUrl);

    if (!externalResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch the file" }, { status: 500 });
    }

    const contentType = externalResponse.headers.get("content-type") || "application/octet-stream";
    const fileBuffer = await externalResponse.arrayBuffer();

    // Serve the file
    return new NextResponse(Buffer.from(fileBuffer), {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error("Error fetching the file:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
