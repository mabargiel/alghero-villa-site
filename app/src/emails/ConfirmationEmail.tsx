import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Img,
  Text,
  Hr,
  Link,
} from "@react-email/components";

type Translations = {
  subject: string;
  greeting: string;
  body: string;
  followUp: string;
  contactHeader: string;
};

type ConfirmationEmailProps = {
  firstName: string;
  translations: Translations;
  siteUrl: string;
};

export default function ConfirmationEmail({
  firstName,
  translations: t,
  siteUrl,
}: ConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Img
              src={`${siteUrl}/favicon.png`}
              width="64"
              height="64"
              alt="Villa Monte Calvia"
              style={logo}
            />
          </Section>

          <Text style={greeting}>
            {t.greeting.replace("{firstName}", firstName)}
          </Text>

          <Text style={bodyText}>{t.body}</Text>

          <Text style={bodyText}>{t.followUp}</Text>

          <Hr style={divider} />

          <Text style={contactHeader}>{t.contactHeader}</Text>

          <Text style={contactText}>
            <Link href="tel:+393207171841" style={link}>
              +39 320 717 1841
            </Link>
          </Text>
          <Text style={contactText}>
            <Link href="mailto:contact@montecalvia.com" style={link}>
              contact@montecalvia.com
            </Link>
          </Text>

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
  backgroundColor: "#f6f6f0",
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
  marginBottom: "32px",
};

const logo: React.CSSProperties = {
  borderRadius: "50%",
  margin: "0 auto",
};

const greeting: React.CSSProperties = {
  fontSize: "22px",
  fontWeight: 600,
  color: "#2d3b2d",
  marginBottom: "16px",
};

const bodyText: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#4a5a4a",
  marginBottom: "12px",
};

const divider: React.CSSProperties = {
  borderColor: "#d9d4c7",
  margin: "28px 0",
};

const contactHeader: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 600,
  color: "#7a8a7a",
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  marginBottom: "8px",
};

const contactText: React.CSSProperties = {
  fontSize: "14px",
  color: "#4a5a4a",
  margin: "4px 0",
};

const link: React.CSSProperties = {
  color: "#5a7a5a",
  textDecoration: "none",
};

const footer: React.CSSProperties = {
  fontSize: "12px",
  color: "#9a9a8a",
  textAlign: "center" as const,
};
