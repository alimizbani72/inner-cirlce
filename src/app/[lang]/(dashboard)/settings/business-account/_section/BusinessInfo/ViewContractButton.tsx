import { type FC, useState } from "react";
import { Button, Stack } from "@mui/material";
import { Icon } from "@/components/icons";

const ViewContractButton: FC<{ info: any }> = ({ info }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePreview = async () => {
    setIsGenerating(true);

    try {
      const [{ pdf }, { default: ContractDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./ContractDocument"),
      ]);

      const doc = <ContractDocument info={info} />;

      const blob = await pdf(doc).toBlob();

      // Create a URL and open in a new tab
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank", "noopener,noreferrer");

      // Optionally revoke the object URL after some time
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 60000); // Revoke after 1 minute
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button variant="text" endIcon={<Icon name="Arrow-right" />} onClick={handlePreview}>
      <Stack sx={{ width: 32, height: 32, borderRadius: 1, bgcolor: "white", mr: 1.5 }} />
      {isGenerating ? "Loading..." : "OPEN"}
    </Button>
  );
};

export default ViewContractButton;
