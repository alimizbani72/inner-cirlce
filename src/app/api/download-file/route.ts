import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fileUrl = searchParams.get("url");
  const fileName = searchParams.get("filename") || "file";

  try {
    const response = await fetch(fileUrl!);

    if (!response.ok) {
      return new NextResponse("Failed to fetch the file", { status: response.status });
    }

    // Get the content type from the response
    const contentType = response.headers.get("content-type") || "application/octet-stream";

    // Create a new readable stream from the response body
    const stream = response.body;

    return new NextResponse(stream, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error("Error fetching the file:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
