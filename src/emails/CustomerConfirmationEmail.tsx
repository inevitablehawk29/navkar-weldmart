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

export interface CustomerConfirmationEmailProps {
  enquiryId: string;
  fullName: string;
  projectType: string;
  projectLocation: string;
  estimatedBudget?: string;
  projectDetails: string;
}

export const CustomerConfirmationEmail = ({
  enquiryId = "ENQ-20260603-9999",
  fullName = "Rahul Sharma",
  projectType = "Structural Fabrication",
  projectLocation = "Indore, MP",
  estimatedBudget = "₹5–10 Lakh",
  projectDetails = "Need a structural steel mezzanine floor fabricated and installed in our workshop in Indore. Dimensions are approximately 30x40 feet.",
}: CustomerConfirmationEmailProps) => {
  return (
    <Html lang="en">
      <Head />
      <Preview>
        Enquiry Received - Navkar Weldmart (ID: {enquiryId})
      </Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Branded Header */}
          <Section style={styles.header}>
            <Heading as="h1" style={styles.logoText}>
              NAVKAR WELDMART
            </Heading>
            <Text style={styles.tagline}>Steel Solutions. Built to Last.</Text>
          </Section>

          <Hr style={styles.divider} />

          {/* Acknowledgement Message */}
          <Section style={styles.contentSection}>
            <Heading as="h2" style={styles.greeting}>
              Hello {fullName},
            </Heading>
            <Text style={styles.paragraph}>
              Thank you for contacting Navkar Weldmart. We have successfully received your project enquiry. 
            </Text>
            <Text style={styles.paragraph}>
              Our engineering team is currently reviewing your requirements. You can expect a response from us within <strong>24 to 48 business hours</strong>.
            </Text>
            
            <Text style={styles.enquiryNotice}>
              <strong>Enquiry ID:</strong> {enquiryId}
            </Text>
          </Section>

          {/* Summary of Submitted Details */}
          <Section style={styles.card}>
            <Heading as="h3" style={styles.cardHeader}>
              Enquiry Summary
            </Heading>
            <table style={styles.table} cellPadding={0} cellSpacing={0}>
              <tbody>
                <tr>
                  <td style={styles.tableLabelCell}>Project Type:</td>
                  <td style={styles.tableValueCell}><strong>{projectType}</strong></td>
                </tr>
                <tr>
                  <td style={styles.tableLabelCell}>Location:</td>
                  <td style={styles.tableValueCell}>{projectLocation}</td>
                </tr>
                {estimatedBudget && (
                  <tr>
                    <td style={styles.tableLabelCell}>Budget Range:</td>
                    <td style={styles.tableValueCell}>{estimatedBudget}</td>
                  </tr>
                )}
                <tr>
                  <td style={styles.tableLabelCell}>Details:</td>
                  <td style={styles.tableValueCell}>{projectDetails || "No additional details provided."}</td>
                </tr>
              </tbody>
            </table>
          </Section>

          <Hr style={styles.divider} />

          {/* Corporate / Contact Details */}
          <Section style={styles.footerSection}>
            <Heading as="h4" style={styles.footerHeader}>
              Navkar Weldmart Support
            </Heading>
            <Text style={styles.footerText}>
              If you have any urgent changes or questions, please reach out to us directly:
            </Text>
            <Text style={styles.contactItem}>
              <strong>Phone:</strong> +91 96697 69760 / +91 62637 21818
            </Text>
            <Text style={styles.contactItem}>
              <strong>Email:</strong>{" "}
              <Link href="mailto:navkarweldmart@gmail.com" style={styles.footerLink}>
                navkarweldmart@gmail.com
              </Link>
            </Text>
            <Text style={styles.contactItem}>
              <strong>Website:</strong>{" "}
              <Link href="https://navkarweldmart.com" style={styles.footerLink}>
                navkarweldmart.com
              </Link>
            </Text>
            <Text style={styles.contactItem}>
              <strong>Office:</strong> Indore, Madhya Pradesh
            </Text>
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
    padding: "32px 24px",
  },
  header: {
    textAlign: "center" as const,
    marginBottom: "16px",
  },
  logoText: {
    fontSize: "20px",
    fontWeight: "800" as const,
    color: "#1a202c",
    letterSpacing: "2px",
    margin: "0 0 4px 0",
  },
  tagline: {
    fontSize: "12px",
    color: "#b48a4a",
    fontWeight: "600" as const,
    letterSpacing: "1px",
    textTransform: "uppercase" as const,
    margin: "0",
  },
  divider: {
    borderColor: "#e2e8f0",
    margin: "20px 0",
  },
  contentSection: {
    marginBottom: "20px",
  },
  greeting: {
    fontSize: "16px",
    fontWeight: "700" as const,
    color: "#2d3748",
    margin: "0 0 12px 0",
  },
  paragraph: {
    fontSize: "14px",
    color: "#4a5568",
    lineHeight: "1.5",
    margin: "0 0 12px 0",
  },
  enquiryNotice: {
    fontSize: "13px",
    color: "#2d3748",
    backgroundColor: "#f7fafc",
    padding: "8px 12px",
    borderRadius: "4px",
    display: "inline-block" as const,
    margin: "8px 0 0 0",
  },
  card: {
    backgroundColor: "#f8fafc",
    border: "1px solid #edf2f7",
    borderRadius: "6px",
    padding: "16px",
    marginBottom: "20px",
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
    width: "100px",
    fontSize: "13px",
    color: "#718096",
    padding: "6px 0",
    verticalAlign: "top",
  },
  tableValueCell: {
    fontSize: "13px",
    color: "#2d3748",
    padding: "6px 0",
    verticalAlign: "top",
    lineHeight: "1.4",
  },
  footerSection: {
    marginTop: "20px",
  },
  footerHeader: {
    fontSize: "13px",
    fontWeight: "700" as const,
    color: "#2d3748",
    margin: "0 0 8px 0",
    textTransform: "uppercase" as const,
  },
  footerText: {
    fontSize: "12px",
    color: "#718096",
    lineHeight: "1.4",
    margin: "0 0 10px 0",
  },
  contactItem: {
    fontSize: "12px",
    color: "#4a5568",
    margin: "4px 0",
  },
  footerLink: {
    color: "#b48a4a",
    textDecoration: "underline",
    fontWeight: "600",
  },
};

export function getCustomerConfirmationEmailText(props: CustomerConfirmationEmailProps): string {
  return `
NAVKAR WELDMART
Steel Solutions. Built to Last.
==============================================
Hello ${props.fullName},

Thank you for contacting Navkar Weldmart. We have successfully received your project enquiry.
Our engineering team is currently reviewing your requirements. You can expect a response from us within 24 to 48 business hours.

Enquiry ID: ${props.enquiryId}

ENQUIRY SUMMARY:
- Project Type: ${props.projectType}
- Location: ${props.projectLocation}
- Budget Range: ${props.estimatedBudget || "Not provided"}
- Details: ${props.projectDetails}

----------------------------------------------
Navkar Weldmart Support
If you have any urgent changes or questions, please reach out to us directly:
- Phone: +91 96697 69760 / +91 62637 21818
- Email: navkarweldmart@gmail.com
- Website: navkarweldmart.com
- Office: Indore, Madhya Pradesh
  `.trim();
}

export default CustomerConfirmationEmail;

