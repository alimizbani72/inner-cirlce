import { useState } from "react";

export function useZipFileDownload() {
  const [isLoading, setIsLoading] = useState(false);

  const downloadZipFile = async (imageUrls: string[]) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/download-zip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrls }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate zip file");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link to download the zip file
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "images.zip");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the URL object
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      console.error("Error downloading zip:", error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, downloadZipFile };
}

export function useFileDownload() {
  const [isLoading, setIsLoading] = useState(false);

  const downloadFile = async (fileUrl: string): Promise<void> => {
    setIsLoading(true);

    try {
      const pathname = new URL(fileUrl).pathname;
      const fileName = pathname.substring(pathname.lastIndexOf("/") + 1);

      const link = document.createElement("a");
      link.href = `/api/download-file?url=${fileUrl}&filename=${fileName}`;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error: any) {
      console.error("Error downloading the file:", error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, downloadFile };
}
