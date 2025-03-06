'use client';
import type { PayoutHttpPayoutResponse } from '@/services/minecraft/minecraftAPI.schemas';
import { fDate } from '@/utils/format-time';
import { formatCurrency } from '@/utils/toNumber';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { useMemo, type FC } from 'react';

type PayoutDocumentProps = {
  payouts: PayoutHttpPayoutResponse[];
  fromDate: string;
  toDate: string;
};

Font.register({
  family: 'Montserrat',
  fonts: [
    { src: '/assets/fonts/montserrat/Montserrat-SemiBold.ttf', fontWeight: 'semibold' },
    { src: '/assets/fonts/montserrat/Montserrat-Bold.ttf', fontWeight: 'bold' },
  ],
});

const useStyles = () =>
  useMemo(
    () =>
      StyleSheet.create({
        page: {
          fontFamily: 'Montserrat',
          flexDirection: 'column',
          backgroundColor: '#ffffff',
          position: 'relative',
        },
        tableWrap: {
          paddingHorizontal: 50,
          paddingBottom: 50,
        },
        pageWrap: {
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 20,
          paddingBottom: 50,
          paddingHorizontal: 50,
          gap: 70,
        },
        headerSection: {
          backgroundColor: '#070720',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          paddingTop: 50,
          paddingHorizontal: 50,
          paddingBottom: 20,
        },

        logo: { width: 100 },
        title: {
          fontSize: 18,
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#ffffff',
        },
        row: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        },
        companySection: {
          display: 'flex',
          flexDirection: 'column',
          marginRight: 50,
        },
        dateSection: {
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        },
        dateRow: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        },
        lightText: {
          fontSize: 10,
          fontWeight: 'light',
          textAlign: 'left',
        },
        boldText: {
          fontSize: 10,
          fontWeight: 'semibold',
          textAlign: 'left',
        },
        infoText: {
          fontSize: 10,
          color: '#666666',
        },
        infoTitle: {
          fontSize: 14,
          fontWeight: 'bold',
          marginBottom: 10,
        },
        tableHeader: {
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#e0e0e0',
          paddingBottom: 5,
          marginBottom: 10,
        },

        tableRow: {
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#f0f0f0',
          paddingBottom: 5,
          paddingTop: 5,
        },
        tableCellHeader: {
          flex: 1,
          fontSize: 10,
          fontWeight: 'semibold',
          color: '#333333',
          textTransform: 'uppercase',
        },
        tableCell: {
          flex: 1,
          fontSize: 10,
          color: '#666666',
        },
        amountCell: {
          flex: 1,
          fontSize: 10,
          color: '#666666',
          textAlign: 'right',
        },
        footer: {
          marginTop: 20,
          textAlign: 'center',
          fontSize: 10,
          color: '#666666',
        },
      }),
    []
  );
const PayoutDocument: FC<PayoutDocumentProps> = ({ payouts, fromDate, toDate }) => {
  const styles = useStyles();

  const columns = [
    { title: 'UserID', field: 'user_id' },
    { title: 'WalletID', field: 'wallet_id' },
    { title: 'Date', field: 'created_at' },
    { title: 'Amount', field: 'amount' },
    { title: 'Status', field: 'status' },
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* payout Title */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>Payout</Text>
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
                <Text style={styles.infoText}>{fDate(fromDate, 'DD.MM.YYYY')}</Text>
              </View>
              <View style={styles.dateRow}>
                <Text style={styles.boldText}>To:</Text>
                <Text style={styles.infoText}>{fDate(toDate, 'DD.MM.YYYY')}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Table Header */}

        <View style={styles.tableWrap}>
          <View style={styles.tableHeader}>
            {columns.map((column) => (
              <Text key={column.title} style={styles.tableCellHeader}>
                {column.title}
              </Text>
            ))}
          </View>

          {/* Table Body */}
          {payouts.map((payout, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{payout.user_id}</Text>
              <Text style={styles.tableCell}>{payout.wallet_id}</Text>
              <Text style={styles.tableCell}>
                {fDate((payout as any).created_at, 'DD.MM.YYYY')}
              </Text>
              <Text style={styles.tableCell}>{formatCurrency(payout.amount)}</Text>
              <Text style={styles.tableCell}>{(payout as any).status}</Text>
            </View>
          ))}
        </View>
        <View style={{ ...styles.row, position: 'absolute', left: 50, right: 50, bottom: 20 }}>
          <Text style={{ fontSize: 8, fontWeight: 'light' }}>
            {' '}
            {fDate((payouts[0] as any).created_at, 'DD.MM.YYYY')}
          </Text>
          <Text
            style={styles.lightText}
            render={({ pageNumber, totalPages }) => `Page ${pageNumber} Of ${totalPages}`}
            fixed
          />
        </View>
        {/* Footer */}
      </Page>
    </Document>
  );
};

export default PayoutDocument;
