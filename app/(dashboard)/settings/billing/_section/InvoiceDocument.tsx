'use client';

import type {
  BillingAddressHttpBillingAddressResponse,
  PaymentHttpPaymentItemResponse,
} from '@/services/minecraft/minecraftAPI.schemas';
import { toTitleCase } from '@/utils/change-case';
import { fDate } from '@/utils/format-time';
import { formatCurrency } from '@/utils/toNumber';
import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { type FC, useMemo } from 'react';

type InvoiceDocumentProps = {
  invoice: PaymentHttpPaymentItemResponse;
  billingInfo?: BillingAddressHttpBillingAddressResponse;
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
        dateSection: {
          width: 220,
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
        infoTitle: {
          fontSize: 14,
          fontWeight: 'bold',
          textAlign: 'left',
          marginBottom: 10,
        },
        row: {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        companySection: {
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
        },
        invoiceBox: {
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          width: 200,
          backgroundColor: '#f1f1f1',
          padding: 10,
          borderRadius: 10,
        },
      }),
    []
  );

// Invoice Document Component
const InvoiceDocument: FC<InvoiceDocumentProps> = ({ invoice, billingInfo }) => {
  const styles = useStyles();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Invoice Title */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>Invoice</Text>
          <Image style={styles.logo} src="/logo/logo-type.png" />
        </View>

        <View style={styles.pageWrap}>
          {/* Invoice Header */}
          <View style={styles.dateSection}>
            <View style={styles.dateRow}>
              <Text style={styles.lightText}>Invoice Number: </Text>
              <Text style={styles.boldText}>{invoice.id}</Text>
            </View>
            <View style={styles.dateRow}>
              <Text style={styles.lightText}>Date of Issue: </Text>
              <Text style={styles.boldText}>{fDate(invoice.created_at, 'MMMM DD YYYY')}</Text>
            </View>
            <View style={styles.dateRow}>
              <Text style={styles.lightText}>Due Date: </Text>
              <Text style={styles.boldText}>{fDate(invoice.created_at, 'MMMM DD YYYY')}</Text>
            </View>
          </View>

          {/* Company Information */}
          <View style={styles.row}>
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

            {/* Bill To */}
            <View style={{ ...styles.companySection, width: 200 }}>
              <Text style={styles.infoTitle}>Bill To</Text>
              <Text style={styles.boldText}>{billingInfo?.first_name}</Text>
              <Text style={styles.lightText}>{billingInfo?.address}</Text>
              <View style={{ flexDirection: 'row', gap: 15 }}>
                <Text style={styles.lightText}>{billingInfo?.zipcode}</Text>
                <Text style={styles.lightText}>{billingInfo?.city}</Text>
              </View>
              <Text style={styles.lightText}>{billingInfo?.country}</Text>
              <Text style={styles.lightText}>{billingInfo?.email_address}</Text>
            </View>
          </View>

          <View style={{ marginBottom: '-50px' }}>
            <Text style={styles.infoTitle}>{`${formatCurrency(invoice.amount)} Due ${fDate(
              invoice.created_at,
              'MMMM DD, YYYY'
            )}`}</Text>
          </View>

          {/* Invoice Items */}
          <View>
            <View
              style={{
                ...styles.row,
                borderBottom: '1px solid lightgrey',
                marginBottom: 10,
                paddingBottom: 10,
              }}
            >
              <Text style={styles.lightText}>Description</Text>
              <View style={{ ...styles.row, gap: 50, width: 200 }}>
                <Text style={styles.lightText}>Unit Price</Text>
                <Text style={styles.lightText}>Amount</Text>
              </View>
            </View>
            <View style={styles.row}>
              <Text
                style={styles.boldText}
              >{`${toTitleCase(invoice?.plan_type || '')} Package`}</Text>
              <View style={{ ...styles.row, gap: 50, width: 200 }}>
                <Text style={styles.lightText}>{formatCurrency(invoice.amount)}</Text>
                <Text style={styles.lightText}>{formatCurrency(invoice.amount)}</Text>
              </View>
            </View>
          </View>

          {/* Subtotal, Tax, and Total */}
          <View style={{ display: 'flex', alignItems: 'flex-end', marginTop: '-50px' }}>
            <View style={styles.invoiceBox}>
              <View style={styles.row}>
                <Text style={styles.boldText}>Subtotal:</Text>
                <Text style={styles.boldText}>{formatCurrency(invoice.amount)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.boldText}>Tax:</Text>
                <Text style={styles.boldText}>0%</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.boldText}>Total:</Text>
                <Text style={styles.boldText}>{formatCurrency(invoice.amount)}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ ...styles.row, position: 'absolute', left: 50, right: 50, bottom: 50 }}>
          <Text style={{ fontSize: 8, fontWeight: 'light' }}>{`${invoice.id} . ${formatCurrency(
            invoice.amount
          )} Due ${fDate(invoice.created_at, 'MMMM DD, YYYY')}`}</Text>

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

export default InvoiceDocument;
