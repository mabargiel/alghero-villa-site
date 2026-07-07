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
  greeting: string;
  body: string;
  followUp: string;
  contactHeader: string;
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

type ConfirmationEmailProps = {
  firstName: string;
  translations: Translations;
  siteUrl: string;
  estimatedPrice?: EstimatedPrice;
};

export default function ConfirmationEmail({
  firstName,
  translations: t,
  siteUrl,
  estimatedPrice,
}: Readonly<ConfirmationEmailProps>) {
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

          {estimatedPrice && (
            <>
              <Hr style={divider} />
              <Text style={priceHeader}>
                {t.estimatedPriceLabel ?? "Estimated price"}
              </Text>
              <Text style={priceText}>
                €{Math.round(estimatedPrice.totalPrice)} ·{" "}
                {estimatedPrice.totalNights} {t.estimatedNights ?? "nights"}
              </Text>
              <Text style={priceDate}>
                {estimatedPrice.arriveDate} – {estimatedPrice.leaveDate}
              </Text>
              <Text style={disclaimerText}>
                {t.estimatedDisclaimer ??
                  "This is an estimated price, subject to confirmation."}
              </Text>
            </>
          )}

          <Hr style={divider} />

          <Text style={contactHeader}>{t.contactHeader}</Text>

          <Text style={contactText}>
            <Link href="tel:+393207171841" style={link}>
              +39 320 717 1841
            </Link>
          </Text>
          <Text style={contactText}>
            <Link href="tel:+48500290390" style={link}>
              +48 500 290 390
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

const logoSection: React.CSSProperties = {
  textAlign: "center" as const,
  marginBottom: "32px",
};

const greeting: React.CSSProperties = {
  fontSize: "22px",
  fontWeight: 600,
  color: "#2C2825",
  marginBottom: "16px",
};

const bodyText: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#6B6560",
  marginBottom: "12px",
};

const priceHeader: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 600,
  color: "#8A8478",
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  marginBottom: "8px",
};

const priceDate: React.CSSProperties = {
  fontSize: "13px",
  color: "#6B6560",
  marginBottom: "4px",
};

const contactHeader: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 600,
  color: "#8A8478",
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  marginBottom: "8px",
};

const contactText: React.CSSProperties = {
  fontSize: "14px",
  color: "#6B6560",
  margin: "4px 0",
};

const link: React.CSSProperties = {
  color: "#2D5A4A",
  textDecoration: "none",
};
