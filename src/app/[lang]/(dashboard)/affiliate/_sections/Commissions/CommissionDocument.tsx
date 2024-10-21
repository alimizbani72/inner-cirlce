"use client";
import { fDate } from "@/utils/format-time";
import { formatCurrency } from "@/utils/toNumber";
import type { PayoutCommissionResponse } from "@minecraft/requests";
import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";
import { useMemo, type FC } from "react";

type CommissionDocumentProps = {
  commissions: PayoutCommissionResponse[];
  fromDate: string;
  toDate: string;
};

Font.register({
  family: "Montserrat",
  fonts: [
    { src: "/assets/fonts/montserrat/Montserrat-SemiBold.ttf", fontWeight: "semibold" },
    { src: "/assets/fonts/montserrat/Montserrat-Bold.ttf", fontWeight: "bold" },
  ],
});

const useStyles = () =>
  useMemo(
    () =>
      StyleSheet.create({
        page: {
          fontFamily: "Montserrat",
          flexDirection: "column",
          backgroundColor: "#ffffff",
          position: "relative",
        },
        tableWrap: {
          paddingHorizontal: 50,
          paddingBottom: 50,
        },
        pageWrap: {
          display: "flex",
          flexDirection: "column",
          paddingTop: 20,
          paddingBottom: 50,
          paddingHorizontal: 50,
          gap: 70,
        },
        headerSection: {
          backgroundColor: "#070720",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          paddingTop: 50,
          paddingHorizontal: 50,
          paddingBottom: 20,
        },

        logo: { width: 100 },
        title: {
          fontSize: 18,
          fontWeight: "bold",
          textAlign: "center",
          color: "#ffffff",
        },
        row: {
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        },
        companySection: {
          display: "flex",
          flexDirection: "column",
          marginRight: 50,
        },
        dateSection: {
          display: "flex",
          flexDirection: "column",
          gap: 4,
        },
        dateRow: {
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
        },
        lightText: {
          fontSize: 10,
          fontWeight: "light",
          textAlign: "left",
        },
        boldText: {
          fontSize: 10,
          fontWeight: "semibold",
          textAlign: "left",
        },
        infoText: {
          fontSize: 10,
          color: "#666666",
        },
        infoTitle: {
          fontSize: 14,
          fontWeight: "bold",
          marginBottom: 10,
        },
        tableHeader: {
          flexDirection: "row",
          borderBottomWidth: 1,
          borderBottomColor: "#e0e0e0",
          paddingBottom: 5,
          marginBottom: 5,
        },

        tableRow: {
          flexDirection: "row",
          borderBottomWidth: 1,
          borderBottomColor: "#f0f0f0",
          paddingBottom: 5,
          paddingTop: 5,
        },
        tableCellHeader: {
          flexBasis: 100,
          fontSize: 10,
          fontWeight: "semibold",
          color: "#333333",
        },
        dateCellHeader: {
          flexBasis: 120,
          fontSize: 10,
          fontWeight: "semibold",
          color: "#333333",
        },
        emailCellHeader: {
          flexBasis: 200,
          fontSize: 10,
          fontWeight: "semibold",
          color: "#333333",
        },
        tableCell: {
          flexBasis: 100,
          fontSize: 10,
          color: "#666666",
        },
        emailCell: {
          flexBasis: 200,
          fontSize: 10,
          color: "#666666",
        },
        dateCell: {
          flexBasis: 120,
          fontSize: 10,
          color: "#666666",
        },
      }),
    []
  );
const CommissionDocument: FC<CommissionDocumentProps> = ({ commissions, fromDate, toDate }) => {
  const styles = useStyles();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* commission Title */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>Commissions</Text>
          <Image style={styles.logo} src="/logo/logo-type.png" />
        </View>
        <View style={styles.pageWrap}>
          <View style={styles.row}>
            {/* Company Information */}
            <View style={styles.companySection}>
              <Text style={styles.infoTitle}>ChainMind AG</Text>
              <Text style={styles.lightText}>Chamerstrasse 172</Text>
              <Text style={styles.lightText}>6300 Zug</Text>
              <Text style={styles.lightText}>Switzerland</Text>
              <View style={styles.dateRow}>
                <Text style={styles.lightText}>UID:</Text>
                <Text style={styles.boldText}>CHE-473.139.498</Text>
              </View>
              <Text style={styles.lightText}>office@chainmind.com</Text>
            </View>

            {/* Date Range (From - To) */}
            <View style={styles.dateSection}>
              <View style={styles.dateRow}>
                <Text style={styles.boldText}>From:</Text>
                <Text style={styles.infoText}>{fDate(fromDate, "MMMM dd, yyyy")}</Text>
              </View>
              <View style={styles.dateRow}>
                <Text style={styles.boldText}>To:</Text>
                <Text style={styles.infoText}>{fDate(toDate, "MMMM dd, yyyy")}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Table Header */}

        <View style={styles.tableWrap}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableCellHeader}>UserID</Text>
            <Text style={styles.emailCellHeader}>Email</Text>
            <Text style={styles.tableCellHeader}>Package Name</Text>
            <Text style={styles.tableCellHeader}>Amount</Text>
            <Text style={styles.tableCellHeader}>Percentage</Text>
            <Text style={styles.dateCellHeader}>Date</Text>
          </View>

          {/* Table Body */}
          {commissions.map((commission, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{commission.user_id}</Text>
              <Text style={styles.emailCell}>{commission.email}</Text>
              <Text style={styles.tableCell}>{commission.plan_type}</Text>
              <Text style={styles.tableCell}>{formatCurrency(commission.amount)}</Text>
              <Text style={styles.tableCell}>{commission.percent}</Text>
              <Text style={styles.dateCell}>{fDate((commission as any).created_at, "dd.MM.yyyy")}</Text>
            </View>
          ))}
        </View>
        {/* Footer */}
        <View style={{ ...styles.row, position: "absolute", left: 50, right: 50, bottom: 20 }}>
          <Text style={{ fontSize: 8, fontWeight: "light" }}>
            {" "}
            {fDate((commissions[0] as any).created_at, "MMMM dd, yyyy")}
          </Text>
          <Text
            style={styles.lightText}
            render={({ pageNumber, totalPages }) => `Page ${pageNumber} Of ${totalPages}`}
            fixed
          />
        </View>
      </Page>
    </Document>
  );
};

export default CommissionDocument;
