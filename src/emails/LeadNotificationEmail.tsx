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
  const cleanPhone = phoneNumber.replace(/\D/g, "");
  const whatsappNumber = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi ${fullName}, thank you for your enquiry at Navkar Weldmart. I would like to discuss your requirement for ${projectType}.`
  )}`;

  return (
    <Html lang="en">
      <Head />
      <Preview>
        New Enquiry from {fullName} ({projectType})
      </Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Metadata Block */}
          <Section style={styles.headerSection}>
            <Text style={styles.metaLabel}>NEW WEBSITE ENQUIRY ({formType.toUpperCase()} FORM)</Text>
            <Text style={styles.metaText}>
              <strong>ID:</strong> {enquiryId} &bull; <strong>Time:</strong> {timestamp}
            </Text>
          </Section>

          <Hr style={styles.divider} />

          {/* Critical Lead Info Card */}
          <Section style={styles.card}>
            <Heading as="h2" style={styles.cardHeader}>
              CORE PARAMETERS
            </Heading>
            
            <table style={styles.table} cellPadding={0} cellSpacing={0}>
              <tbody>
                <tr>
                  <td style={styles.tableLabelCell}>Name:</td>
                  <td style={styles.tableValueCell}><strong>{fullName}</strong></td>
                </tr>
                <tr>
                  <td style={styles.tableLabelCell}>Phone:</td>
                  <td style={styles.tableValueCell}>
                    <Link href={`tel:${phoneNumber}`} style={styles.textLink}>
                      {phoneNumber}
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td style={styles.tableLabelCell}>Email:</td>
                  <td style={styles.tableValueCell}>
                    {emailAddress ? (
                      <Link href={`mailto:${emailAddress}`} style={styles.textLink}>
                        {emailAddress}
                      </Link>
                    ) : (
                      <span style={styles.mutedText}>Not provided</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td style={styles.tableLabelCell}>Project Type:</td>
                  <td style={styles.tableValueCell}>
                    <span style={styles.badge}>{projectType}</span>
                  </td>
                </tr>
                <tr>
                  <td style={styles.tableLabelCell}>Budget:</td>
                  <td style={styles.tableValueCell}>
                    <span style={styles.budgetBadge}>{estimatedBudget}</span>
                  </td>
                </tr>
                <tr>
                  <td style={styles.tableLabelCell}>Location:</td>
                  <td style={styles.tableValueCell}>{projectLocation}</td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* Secondary Details Section */}
          <Section style={styles.detailsSection}>
            <Heading as="h3" style={styles.sectionHeader}>
              SECONDARY INFORMATION
            </Heading>
            <Text style={styles.detailsText}>
              <strong>Lead Source:</strong> {source || "Not provided"}
            </Text>
            <Text style={styles.sectionHeaderSub}>Enquiry Details:</Text>
            <div style={styles.detailsBox}>
              <Text style={styles.detailsBodyText}>
                {projectDetails ? projectDetails : "No additional details provided."}
              </Text>
            </div>
          </Section>

          <Hr style={styles.divider} />

          {/* Action CTAs */}
          <Section style={styles.actionSection}>
            <Heading as="h3" style={styles.actionHeader}>
              FOLLOW-UP ACTIONS
            </Heading>
            
            <table style={styles.buttonTable} cellPadding={0} cellSpacing={0}>
              <tbody>
                <tr>
                  <td style={styles.buttonCell}>
                    <Link href={`tel:${phoneNumber}`} style={styles.buttonCall}>
                      Call Client Now
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td style={styles.buttonSpace}></td>
                </tr>
                <tr>
                  <td style={styles.buttonCell}>
                    <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={styles.buttonWhatsApp}>
                      Chat on WhatsApp
                    </Link>
                  </td>
                </tr>
                {emailAddress && (
                  <>
                    <tr>
                      <td style={styles.buttonSpace}></td>
                    </tr>
                    <tr>
                      <td style={styles.buttonCell}>
                        <Link href={`mailto:${emailAddress}`} style={styles.buttonEmail}>
                          Reply via Email
                        </Link>
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const styles = {
  body: {
    backgroundColor: "#f4f4f7",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    margin: "0",
    padding: "20px 10px",
  },
  container: {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    maxWidth: "580px",
    margin: "0 auto",
    padding: "24px 20px",
  },
  headerSection: {
    marginBottom: "12px",
  },
  metaLabel: {
    fontSize: "11px",
    fontWeight: "700" as const,
    color: "#b48a4a",
    letterSpacing: "1.2px",
    margin: "0 0 4px 0",
  },
  metaText: {
    fontSize: "13px",
    color: "#4a5568",
    margin: "0",
    lineHeight: "1.4",
  },
  divider: {
    borderColor: "#e2e8f0",
    margin: "16px 0",
  },
  card: {
    backgroundColor: "#f8fafc",
    border: "1px solid #edf2f7",
    borderRadius: "6px",
    padding: "16px",
    marginBottom: "16px",
  },
  cardHeader: {
    fontSize: "12px",
    fontWeight: "700" as const,
    color: "#2d3748",
    letterSpacing: "1px",
    margin: "0 0 12px 0",
    textTransform: "uppercase" as const,
  },
  table: {
    width: "100%",
  },
  tableLabelCell: {
    width: "110px",
    fontSize: "13px",
    color: "#718096",
    padding: "6px 0",
    verticalAlign: "top",
  },
  tableValueCell: {
    fontSize: "14px",
    color: "#1a202c",
    padding: "6px 0",
    verticalAlign: "top",
  },
  textLink: {
    color: "#2b6cb0",
    textDecoration: "underline",
    fontWeight: "600",
  },
  mutedText: {
    color: "#a0aec0",
    fontStyle: "italic",
  },
  badge: {
    backgroundColor: "#edf2f7",
    color: "#2d3748",
    padding: "3px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "600" as const,
    display: "inline-block" as const,
  },
  budgetBadge: {
    backgroundColor: "#fef3c7",
    color: "#92400e",
    padding: "3px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "600" as const,
    display: "inline-block" as const,
  },
  detailsSection: {
    marginBottom: "16px",
  },
  sectionHeader: {
    fontSize: "12px",
    fontWeight: "700" as const,
    color: "#2d3748",
    letterSpacing: "1px",
    margin: "0 0 10px 0",
    textTransform: "uppercase" as const,
  },
  sectionHeaderSub: {
    fontSize: "13px",
    fontWeight: "600" as const,
    color: "#4a5568",
    margin: "12px 0 6px 0",
  },
  detailsText: {
    fontSize: "13px",
    color: "#4a5568",
    margin: "0 0 8px 0",
  },
  detailsBox: {
    backgroundColor: "#f7fafc",
    borderLeft: "3px solid #cbd5e0",
    padding: "12px",
    borderRadius: "0 4px 4px 0",
  },
  detailsBodyText: {
    fontSize: "13px",
    color: "#2d3748",
    lineHeight: "1.5",
    margin: "0",
    whiteSpace: "pre-wrap" as const,
  },
  actionSection: {
    marginTop: "16px",
  },
  actionHeader: {
    fontSize: "12px",
    fontWeight: "700" as const,
    color: "#2d3748",
    letterSpacing: "1px",
    margin: "0 0 12px 0",
    textTransform: "uppercase" as const,
    textAlign: "center" as const,
  },
  buttonTable: {
    width: "100%",
  },
  buttonCell: {
    width: "100%",
  },
  buttonSpace: {
    height: "10px",
  },
  buttonCall: {
    display: "block" as const,
    backgroundColor: "#b48a4a",
    color: "#ffffff",
    textAlign: "center" as const,
    padding: "12px 0",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "700" as const,
    textDecoration: "none" as const,
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  },
  buttonWhatsApp: {
    display: "block" as const,
    backgroundColor: "#25d366",
    color: "#ffffff",
    textAlign: "center" as const,
    padding: "12px 0",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "700" as const,
    textDecoration: "none" as const,
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  },
  buttonEmail: {
    display: "block" as const,
    backgroundColor: "#ffffff",
    border: "1px solid #cbd5e0",
    color: "#4a5568",
    textAlign: "center" as const,
    padding: "12px 0",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "700" as const,
    textDecoration: "none" as const,
  },
};

export function getLeadNotificationEmailText(props: LeadNotificationEmailProps): string {
  return `
NEW WEBSITE ENQUIRY (${props.formType.toUpperCase()} FORM)
==============================================
Enquiry ID: ${props.enquiryId}
Timestamp: ${props.timestamp}

CORE PARAMETERS:
- Name: ${props.fullName}
- Phone: ${props.phoneNumber}
- Email: ${props.emailAddress || "Not provided"}
- Project Type: ${props.projectType}
- Budget: ${props.estimatedBudget}
- Location: ${props.projectLocation}

SECONDARY INFORMATION:
- Lead Source: ${props.source || "Not provided"}

PROJECT DETAILS:
${props.projectDetails || "No additional details provided."}
  `.trim();
}

export default LeadNotificationEmail;

