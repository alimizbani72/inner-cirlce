"use client";
import { fDate } from "@/utils/format-time";
import { Document, Page, Text, View, Image, Font } from "@react-pdf/renderer";
import type { FC } from "react";

type ContractDocumentProps = {
  info: {
    address: string;
    city: string;
    company_name: string;
    country: string;
    email: string;
    holder_name: string;
    zip_code: string;
    vat_number: string;
    registration_number: string;
    created_at: string;
  };
};

Font.register({
  family: "Montserrat",
  fonts: [
    { src: "/assets/fonts/montserrat/Montserrat-Regular.ttf", fontWeight: "normal" },
    { src: "/assets/fonts/montserrat/Montserrat-Medium.ttf", fontWeight: "medium" },
    { src: "/assets/fonts/montserrat/Montserrat-SemiBold.ttf", fontWeight: "semibold" },
  ],
});

// Invoice Document Component
const ContractDocument: FC<ContractDocumentProps> = ({ info }) => {
  return (
    <Document>
      <Page
        size="A4"
        style={{
          fontFamily: "Montserrat",
          flexDirection: "column",
          backgroundColor: "#ffffff",
          position: "relative",
        }}
      >
        {/* Invoice Title */}
        <View
          style={{
            backgroundColor: "#070720",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "4px solid #565CE4",
          }}
        >
          <View
            style={{ paddingHorizontal: 32, paddingVertical: 24, display: "flex", flexDirection: "column", gap: 8 }}
          >
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 3 }}>
              <Text style={{ fontSize: 14, fontWeight: "normal", color: "white" }}>ChainMind</Text>
              <Text style={{ fontSize: 14, fontWeight: "semibold", color: "white" }}>AG Official Affiliate</Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 3 }}>
              <Text style={{ fontSize: 14, fontWeight: "semibold", color: "white" }}>Partnership</Text>
              <Text style={{ fontSize: 14, fontWeight: "normal", color: "white" }}>Agreement!</Text>
            </View>
          </View>
          <View style={{ paddingHorizontal: 32, paddingVertical: 24, borderLeft: "1.5px solid #14162E" }}>
            <Image style={{ width: 48, height: 48 }} src="/logo/logo.png" />
          </View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            paddingHorizontal: 32,
            paddingVertical: 24,
            gap: 16,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              flex: 1,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "semibold",
                paddingBottom: 8,
                marginBottom: 5,
                borderBottom: "1px solid #EBEDF0",
              }}
            >
              ChainMind AG
            </Text>
            <Text style={{ fontSize: 12, fontWeight: "normal" }}>Chamerstrasse 172</Text>
            <Text style={{ fontSize: 12, fontWeight: "normal" }}>6300 Zug</Text>
            <Text style={{ fontSize: 12, fontWeight: "normal" }}>Switzerland</Text>
            <Text style={{ fontSize: 12, fontWeight: "normal" }}>UID: CHE-473.139.498</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              flex: 1,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "semibold",
                paddingBottom: 8,
                borderBottom: "1px solid #EBEDF0",
              }}
            >
              Website & Email
            </Text>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 4 }}>
              <Image style={{ width: 12, height: 12 }} src="/assets/png/globe.png" />

              <Text style={{ fontSize: 12, fontWeight: "medium", color: "#565CE4" }}>
                www.innercircle-chainmind.com
              </Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 4 }}>
              <Image style={{ width: 12, height: 12 }} src="/assets/png/mail.png" />
              <Text style={{ fontSize: 12, fontWeight: "medium", color: "#565CE4" }}>office@chainmind.com</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            paddingHorizontal: 32,
            paddingVertical: 16,
            backgroundColor: "#EBEDF0",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "medium",
              color: "#070720",
              textAlign: "center",
              flex: 1,
            }}
          >
            Affiliate Partnership Agreement
          </Text>

          <View style={{ display: "flex", flexDirection: "column", marginTop: 16 }}>
            <Text style={{ fontSize: 12, fontWeight: "semibold", color: "#070720", marginBottom: 8 }}>
              This is to confirm that:
            </Text>

            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 3 }}>
              <Text style={{ fontSize: 16, fontWeight: "medium", color: "#404365", paddingBottom: 8, marginRight: 5 }}>
                .
              </Text>
              <Text style={{ fontSize: 12, fontWeight: "medium", color: "#404365" }}>Account Holder Name:</Text>
              <Text style={{ fontSize: 12, fontWeight: "medium", color: "#070720" }}>{info.holder_name}</Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 3 }}>
              <Text style={{ fontSize: 16, fontWeight: "medium", color: "#404365", paddingBottom: 8, marginRight: 5 }}>
                .
              </Text>
              <Text style={{ fontSize: 12, fontWeight: "medium", color: "#404365" }}>Company Name:</Text>
              <Text style={{ fontSize: 12, fontWeight: "medium", color: "#070720" }}>{info.company_name}</Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 3 }}>
              <Text style={{ fontSize: 16, fontWeight: "medium", color: "#404365", paddingBottom: 8, marginRight: 5 }}>
                .
              </Text>
              <Text style={{ fontSize: 12, fontWeight: "medium", color: "#404365" }}>Company Address::</Text>
              <Text
                style={{ fontSize: 12, fontWeight: "medium", color: "#070720" }}
              >{`${info.address}, ${info.zip_code}, ${info.city}, ${info.country}`}</Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 3 }}>
              <Text style={{ fontSize: 16, fontWeight: "medium", color: "#404365", paddingBottom: 8, marginRight: 5 }}>
                .
              </Text>
              <Text style={{ fontSize: 12, fontWeight: "medium", color: "#404365" }}>Registration Number:</Text>
              <Text style={{ fontSize: 12, fontWeight: "medium", color: "#070720" }}>{info.registration_number}</Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 3 }}>
              <Text style={{ fontSize: 16, fontWeight: "medium", color: "#404365", paddingBottom: 8, marginRight: 5 }}>
                .
              </Text>
              <Text style={{ fontSize: 12, fontWeight: "medium", color: "#404365" }}>Email:</Text>
              <Text style={{ fontSize: 12, fontWeight: "medium", color: "#070720" }}>{info.email}</Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 3 }}>
              <Text style={{ fontSize: 16, fontWeight: "medium", color: "#404365", paddingBottom: 8, marginRight: 5 }}>
                .
              </Text>
              <Text style={{ fontSize: 12, fontWeight: "medium", color: "#404365" }}>Licence Number (VAT/UID):</Text>
              <Text style={{ fontSize: 12, fontWeight: "medium", color: "#070720" }}>{info.vat_number}</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            paddingHorizontal: 32,
            paddingVertical: 16,
            gap: 8,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "medium",
              color: "#070720",
              lineHeight: "2",
            }}
          >
            Is officially recognized as an Affiliate Partner of ChainMind AG.
          </Text>

          <Text
            style={{
              fontSize: 10,
              fontWeight: "medium",
              color: "#070720",
              lineHeight: "2",
            }}
          >
            This document serves as an official confirmation that the aforementioned company and account holder have
            entered into a formal affiliate partnership with ChainMind AG. The affiliate is authorized to promote and
            collaborate with ChainMind AG as an independent affiliate partner, who promotes our products and services to
            his network in accordance with the terms and conditions of our partnership agreement.
          </Text>

          <Text
            style={{
              fontSize: 10,
              fontWeight: "medium",
              color: "#070720",
              lineHeight: "2",
              borderBottom: "1px solid #EBEDF0",
              paddingBottom: 16,
              marginBottom: 8,
            }}
          >
            This partnership is established under Swiss law and is recognized for official purposes, including taxation
            and other legal requirements. ChainMind AG verifies that this affiliate relationship is valid and that all
            required information is accurate as of the date of issuance.
          </Text>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ display: "flex", flexDirection: "column" }}>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 3 }}>
                <Text style={{ fontSize: 10, lineHeight: "2.4", fontWeight: "medium", color: "#404365" }}>
                  Partnership Activation Date:
                </Text>
                <Text style={{ fontSize: 10, lineHeight: "2.4", fontWeight: "medium", color: "#070720" }}>
                  {fDate(info.created_at, "dd MMMM,yyyy")}
                </Text>
              </View>

              <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 3 }}>
                <Text style={{ fontSize: 10, lineHeight: "2.4", fontWeight: "medium", color: "#404365" }}>
                  Certificate Issued on:
                </Text>
                <Text style={{ fontSize: 10, lineHeight: "2.4", fontWeight: "medium", color: "#070720" }}>
                  {fDate(new Date().toUTCString(), "dd MMMM,yyyy")}
                </Text>
              </View>
            </View>

            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 3 }}>
              <Text style={{ fontSize: 10, lineHeight: "2.4", fontWeight: "medium", color: "#404365" }}>
                Authorized Signatory:
              </Text>
              <Text style={{ fontSize: 10, lineHeight: "2.4", fontWeight: "medium", color: "#070720" }}>
                Christian Brom | CEO
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ContractDocument;
