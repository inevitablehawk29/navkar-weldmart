import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Link,
  Hr,
  Row,
  Column,
} from "@react-email/components";

export interface LeadNotificationEmailProps {
  enquiryId: string;
  timestamp: string;
  fullName: string;
  phoneNumber: string;
  emailAddress?: string;
  projectType: string;
  estimatedBudget: string;
  projectLocation: string;
  source?: string;
  projectDetails: string;
  formType: "Main" | "Footer";
}

export const LeadNotificationEmail = ({
  enquiryId = "ENQ-20260603-9999",
  timestamp = "03 Jun 2026, 11:30 AM",
  fullName = "Rahul Sharma",
  phoneNumber = "+91 98765 43210",
  emailAddress = "rahul@example.com",
  projectType = "Structural Fabrication",
  estimatedBudget = "₹5–10 Lakh",
  projectLocation = "Indore, MP",
  source = "Google Search",
  projectDetails = "Need a structural steel mezzanine floor fabricated and installed in our workshop in Indore. Dimensions are approximately 30x40 feet.",
  formType = "Main",
}: LeadNotificationEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
          }

          /* Mobile optimizations */
          @media only screen and (max-width: 600px) {
            .mobile-stack {
              display: block !important;
              width: 100% !important;
            }
            .mobile-mt {
              margin-top: 12px !important;
            }
            .btn-block {
              display: block !important;
              width: 100% !important;
              box-sizing: border-box !important;
              margin-bottom: 12px !important;
            }
          }
          
          /* Dark mode support */
          @media (prefers-color-scheme: dark) {
            body, .body-bg {
              background-color: #121212 !important;
            }
            .main-container {
              background-color: #1e1e1e !important;
              border-color: #333333 !important;
            }
            h1, h2, h3, .text-primary {
              color: #f3f4f6 !important;
            }
            .text-secondary, p, .text-muted {
              color: #d1d5db !important;
            }
            .card-bg {
              background-color: #262626 !important;
              border-color: #3f3f46 !important;
            }
            .border-color {
              border-color: #3f3f46 !important;
            }
            .btn-outline {
              border-color: #52525b !important;
              color: #f3f4f6 !important;
            }
            .badge-bg {
              background-color: #3f3f46 !important;
              color: #f3f4f6 !important;
            }
          }
        `}</style>
      </Head>
      <Preview>
        {projectLocation} • {estimatedBudget} • {phoneNumber}
      </Preview>
      <Body style={styles.body} className="body-bg">
        <Container style={styles.container} className="main-container">
          
          {/* Header Area */}
          <Section style={styles.header}>
            <Row>
              <Column style={{ width: "50%" }}>
                <div style={styles.badge} className="badge-bg">
                  <span style={{ color: colors.primary, fontWeight: "700", marginRight: "4px" }}>•</span> 
                  NEW LEAD ({formType.toUpperCase()})
                </div>
              </Column>
              <Column style={{ width: "50%", textAlign: "right" }}>
                <Text style={styles.metaText} className="text-muted">
                  ID: {enquiryId}
                </Text>
              </Column>
            </Row>
            
            <Heading as="h1" style={styles.mainTitle} className="text-primary">
              {projectType}
            </Heading>
            <Text style={styles.locationText} className="text-secondary">
              📍 {projectLocation}
            </Text>
          </Section>

          <Hr style={styles.divider} className="border-color" />

          {/* Core Contact Info (Highly Scannable) */}
          <Section style={styles.content}>
            <Row>
              <Column style={styles.colLeft} className="mobile-stack">
                <Text style={styles.label} className="text-muted">Contact Name</Text>
                <Text style={styles.valueLarge} className="text-primary">{fullName}</Text>
              </Column>
              <Column style={styles.colRight} className="mobile-stack mobile-mt">
                <Text style={styles.label} className="text-muted">Phone Number</Text>
                <Link href={`tel:${phoneNumber}`} style={styles.valueLargeLink}>
                  {phoneNumber}
                </Link>
              </Column>
            </Row>
            
            <Row style={{ marginTop: "20px" }}>
              <Column style={styles.colLeft} className="mobile-stack">
                <Text style={styles.label} className="text-muted">Email Address</Text>
                {emailAddress ? (
                  <Link href={`mailto:${emailAddress}`} style={styles.valueLink}>
                    {emailAddress}
                  </Link>
                ) : (
                  <Text style={styles.value} className="text-secondary">Not provided</Text>
                )}
              </Column>
              <Column style={styles.colRight} className="mobile-stack mobile-mt">
                <Text style={styles.label} className="text-muted">Budget</Text>
                <div style={styles.budgetBadge} className="badge-bg">
                  {estimatedBudget}
                </div>
              </Column>
            </Row>
          </Section>

          {/* Project Details */}
          <Section style={styles.content}>
            <Text style={styles.label} className="text-muted">Project Details</Text>
            <div style={styles.detailsCard} className="card-bg border-color">
              <Text style={styles.detailsText} className="text-primary">
                {projectDetails || "No additional details provided."}
              </Text>
            </div>
          </Section>

          {/* Metadata Footer */}
          <Section style={styles.metaSection}>
            <Row>
              <Column>
                <Text style={styles.footerMetaText} className="text-muted">
                  <strong>Source:</strong> {source || "Direct/Unknown"}
                </Text>
              </Column>
              <Column style={{ textAlign: "right" }}>
                <Text style={styles.footerMetaText} className="text-muted">
                  <strong>Time:</strong> {timestamp}
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Action CTAs */}
          <Section style={styles.actionSection} className="card-bg border-color">
            <Row>
              <Column style={{ paddingRight: "8px" }} className="mobile-stack">
                <Link href={`tel:${phoneNumber}`} style={styles.btnPrimary} className="btn-block">
                  Call Client
                </Link>
              </Column>
              {emailAddress && (
                <Column style={{ paddingLeft: "8px" }} className="mobile-stack">
                  <Link href={`mailto:${emailAddress}`} style={styles.btnOutline} className="btn-block btn-outline">
                    Reply via Email
                  </Link>
                </Column>
              )}
            </Row>
          </Section>

        </Container>
      </Body>
    </Html>
  );
};

// Styles
const colors = {
  bg: "#f4f4f5",
  container: "#ffffff",
  textMain: "#111827",
  textSecondary: "#374151",
  textMuted: "#6b7280",
  primary: "#b25e2b", 
  border: "#e5e7eb",
  cardBg: "#f9fafb",
};

const styles = {
  body: {
    backgroundColor: colors.bg,
    margin: "0",
    padding: "20px 0",
  },
  container: {
    backgroundColor: colors.container,
    border: `1px solid ${colors.border}`,
    borderRadius: "8px",
    maxWidth: "600px",
    margin: "0 auto",
    padding: "32px 24px",
  },
  header: {
    paddingBottom: "16px",
  },
  badge: {
    display: "inline-block",
    backgroundColor: colors.cardBg,
    border: `1px solid ${colors.border}`,
    borderRadius: "100px",
    padding: "4px 12px",
    fontSize: "11px",
    fontWeight: "600",
    color: colors.textSecondary,
    letterSpacing: "0.5px",
  },
  metaText: {
    fontSize: "12px",
    color: colors.textMuted,
    margin: 0,
    marginTop: "6px",
  },
  mainTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: colors.textMain,
    margin: "20px 0 8px 0",
    lineHeight: "1.2",
  },
  locationText: {
    fontSize: "15px",
    color: colors.textSecondary,
    margin: 0,
    fontWeight: "500",
  },
  divider: {
    borderColor: colors.border,
    margin: "0 0 24px 0",
  },
  content: {
    marginBottom: "24px",
  },
  colLeft: {
    width: "50%",
    paddingRight: "16px",
    verticalAlign: "top",
  },
  colRight: {
    width: "50%",
    verticalAlign: "top",
  },
  label: {
    fontSize: "12px",
    fontWeight: "600",
    color: colors.textMuted,
    textTransform: "uppercase" as const,
    letterSpacing: "1px",
    margin: "0 0 6px 0",
  },
  valueLarge: {
    fontSize: "18px",
    fontWeight: "600",
    color: colors.textMain,
    margin: 0,
  },
  valueLargeLink: {
    fontSize: "18px",
    fontWeight: "600",
    color: colors.primary,
    textDecoration: "none",
  },
  value: {
    fontSize: "15px",
    color: colors.textSecondary,
    margin: 0,
  },
  valueLink: {
    fontSize: "15px",
    color: colors.primary,
    textDecoration: "underline",
  },
  budgetBadge: {
    display: "inline-block",
    backgroundColor: "#fff7ed", // Light orange tint
    color: colors.primary,
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
  },
  detailsCard: {
    backgroundColor: colors.cardBg,
    border: `1px solid ${colors.border}`,
    borderRadius: "6px",
    padding: "16px",
    marginTop: "8px",
  },
  detailsText: {
    fontSize: "14px",
    color: colors.textMain,
    lineHeight: "1.6",
    margin: 0,
    whiteSpace: "pre-wrap" as const,
  },
  metaSection: {
    marginTop: "32px",
    paddingTop: "16px",
    borderTop: `1px dashed ${colors.border}`,
  },
  footerMetaText: {
    fontSize: "12px",
    color: colors.textMuted,
    margin: 0,
  },
  actionSection: {
    marginTop: "24px",
    backgroundColor: colors.cardBg,
    border: `1px solid ${colors.border}`,
    borderRadius: "8px",
    padding: "16px",
  },
  btnPrimary: {
    display: "block",
    backgroundColor: colors.primary,
    color: "#ffffff",
    textAlign: "center" as const,
    padding: "12px 0",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    textDecoration: "none",
  },
  btnOutline: {
    display: "block",
    backgroundColor: "transparent",
    border: `1px solid ${colors.border}`,
    color: colors.textSecondary,
    textAlign: "center" as const,
    padding: "11px 0", // 1px less to account for border
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    textDecoration: "none",
  },
};

export function getLeadNotificationEmailText(props: LeadNotificationEmailProps): string {
  return `
NEW LEAD RECEIVED
==============================================
Project: ${props.projectType}
Location: ${props.projectLocation}
Budget: ${props.estimatedBudget}

CONTACT INFORMATION
Name: ${props.fullName}
Phone: ${props.phoneNumber}
Email: ${props.emailAddress || "Not provided"}

PROJECT DETAILS
${props.projectDetails || "No additional details provided."}

METADATA
ID: ${props.enquiryId}
Source: ${props.source || "Direct/Unknown"}
Time: ${props.timestamp}
Form: ${props.formType.toUpperCase()}
  `.trim();
}

export default LeadNotificationEmail;
