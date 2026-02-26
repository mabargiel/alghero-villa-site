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

          <Hr style={divider} />

          <Text style={footer}>
            Villa Monte Calvia &middot; Alghero, Sardinia
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main: React.CSSProperties = {
  backgroundColor: "#F4F1EB",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container: React.CSSProperties = {
  maxWidth: "520px",
  margin: "0 auto",
  padding: "40px 24px",
};

const logoSection: React.CSSProperties = {
  textAlign: "center" as const,
  marginBottom: "24px",
};

const logo: React.CSSProperties = {
  borderRadius: "50%",
  margin: "0 auto",
};

const heading: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: 600,
  color: "#2C2825",
  marginBottom: "8px",
};

const divider: React.CSSProperties = {
  borderColor: "#D5CCBE",
  margin: "24px 0",
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

const footer: React.CSSProperties = {
  fontSize: "12px",
  color: "#A09A90",
  textAlign: "center" as const,
};
