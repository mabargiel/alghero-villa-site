import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Img,
  Text,
  Hr,
  Row,
  Column,
} from "@react-email/components";
import {
  main,
  container,
  logo,
  divider,
  footer,
  priceText,
  disclaimerText,
} from "./styles";

type Translations = {
  subject: string;
  contactSection: string;
  staySection: string;
  messageSection: string;
  nameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  arrivalLabel: string;
  departureLabel: string;
  guestsLabel: string;
  estimatedPriceLabel?: string;
  estimatedNights?: string;
  estimatedDisclaimer?: string;
};

type EstimatedPrice = {
  totalPrice: number;
  totalNights: number;
  arriveDate: string;
  leaveDate: string;
};

type OwnerNotificationEmailProps = {
  firstName: string;
  email: string;
  phone: string;
  arriveDate: string;
  leaveDate: string;
  guests: number;
  message: string;
  translations: Translations;
  siteUrl: string;
  estimatedPrice?: EstimatedPrice;
};

export default function OwnerNotificationEmail({
  firstName,
  email,
  phone,
  arriveDate,
  leaveDate,
  guests,
  message,
  translations: t,
  siteUrl,
  estimatedPrice,
}: Readonly<OwnerNotificationEmailProps>) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Img
              src={`${siteUrl}/favicon.png`}
              width="48"
              height="48"
              alt="Villa Monte Calvia"
              style={logo}
            />
          </Section>

          <Text style={heading}>
            {t.subject.replace("{firstName}", firstName)}
          </Text>

          <Hr style={divider} />

          <Text style={sectionHeader}>{t.contactSection}</Text>
          <Section style={detailsSection}>
            <Row>
              <Column style={labelCol}>{t.nameLabel}</Column>
              <Column style={valueCol}>{firstName}</Column>
            </Row>
            <Row>
              <Column style={labelCol}>{t.emailLabel}</Column>
              <Column style={valueCol}>{email}</Column>
            </Row>
            <Row>
              <Column style={labelCol}>{t.phoneLabel}</Column>
              <Column style={valueCol}>{phone}</Column>
            </Row>
          </Section>

          <Hr style={divider} />

          <Text style={sectionHeader}>{t.staySection}</Text>
          <Section style={detailsSection}>
            <Row>
              <Column style={labelCol}>{t.arrivalLabel}</Column>
              <Column style={valueCol}>{arriveDate}</Column>
            </Row>
            <Row>
              <Column style={labelCol}>{t.departureLabel}</Column>
              <Column style={valueCol}>{leaveDate}</Column>
            </Row>
            <Row>
              <Column style={labelCol}>{t.guestsLabel}</Column>
              <Column style={valueCol}>{guests}</Column>
            </Row>
          </Section>

          <Hr style={divider} />

          <Text style={sectionHeader}>{t.messageSection}</Text>
          <Text style={messageText}>{message}</Text>

          {estimatedPrice && (
            <>
              <Hr style={divider} />
              <Text style={sectionHeader}>
                {t.estimatedPriceLabel ?? "Estimated price"}
              </Text>
              <Text style={priceText}>
                €{Math.round(estimatedPrice.totalPrice)} ·{" "}
                {estimatedPrice.totalNights} {t.estimatedNights ?? "nights"}
              </Text>
              <Text style={disclaimerText}>
                {t.estimatedDisclaimer ??
                  "This is an estimated price, subject to confirmation."}
              </Text>
            </>
          )}

          <Hr style={divider} />

          <Text style={footer}>
            Villa Monte Calvia &middot; Alghero, Sardinia
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const logoSection: React.CSSProperties = {
  textAlign: "center" as const,
  marginBottom: "24px",
};

const heading: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: 600,
  color: "#2C2825",
  marginBottom: "8px",
};

const sectionHeader: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 600,
  color: "#8A8478",
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  marginBottom: "12px",
};

const detailsSection: React.CSSProperties = {
  marginBottom: "4px",
};

const labelCol: React.CSSProperties = {
  fontSize: "13px",
  color: "#8A8478",
  width: "100px",
  paddingBottom: "6px",
  verticalAlign: "top" as const,
};

const valueCol: React.CSSProperties = {
  fontSize: "14px",
  color: "#2C2825",
  paddingBottom: "6px",
  verticalAlign: "top" as const,
};

const messageText: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#6B6560",
  whiteSpace: "pre-wrap" as const,
  backgroundColor: "#ffffff",
  padding: "16px",
  borderRadius: "8px",
  border: "1px solid #E8E2D6",
};
