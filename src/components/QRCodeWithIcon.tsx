"use client";
import { useEffect, useRef, useMemo, type FC, useState } from "react";
import QRCodeStyling, {
  type DrawType,
  type TypeNumber,
  type Mode,
  type ErrorCorrectionLevel,
  type DotType,
  type CornerSquareType,
  type CornerDotType,
} from "qr-code-styling";

interface QRCodeWithIconProps {
  value: string;
  iconSrc: string;
  size?: number;
}

const QRCodeWithIcon: FC<QRCodeWithIconProps> = ({ size = 256, iconSrc, value }) => {
  const options = useMemo(
    () => ({
      width: size,
      height: size,
      type: "svg" as DrawType,
      data: value,
      image: iconSrc,
      qrOptions: {
        typeNumber: 0 as TypeNumber,
        mode: "Byte" as Mode,
        errorCorrectionLevel: "Q" as ErrorCorrectionLevel,
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.5,
        crossOrigin: "anonymous",
        margin: 0,
      },
      dotsOptions: {
        color: "#FFFFFF",
        type: "square" as DotType,
      },
      backgroundOptions: {
        color: "#090A23",
      },
      cornersSquareOptions: {
        color: "#FFFFFF",
        type: "square" as CornerSquareType,
      },
      cornersDotOptions: {
        color: "#FFFFFF",
        type: "square" as CornerDotType,
      },
    }),
    [size, iconSrc, value]
  );

  const [qrCode] = useState<QRCodeStyling>(() => new QRCodeStyling(options));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, [qrCode]);

  useEffect(() => {
    if (!qrCode) {
      return;
    }
    qrCode.update(options);
  }, [qrCode, options]);

  return <div ref={ref} />;
};

export default QRCodeWithIcon;
