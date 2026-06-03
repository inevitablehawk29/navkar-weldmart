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
  Img,
} from "@react-email/components";

export interface CustomerConfirmationEmailProps {
  enquiryId: string;
  fullName: string;
  projectType: string;
  projectLocation: string;
  estimatedBudget?: string;
  projectDetails: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://navkarweldmart.com";

export const CustomerConfirmationEmail = ({
  enquiryId = "ENQ-20260603-4921",
  fullName = "Mayank",
  projectType = "Residential Fabrication",
  projectLocation = "Jabalpur, Madhya Pradesh",
  estimatedBudget = "Under ₹2 Lakh",
  projectDetails = "Testing Navkar Weldmart lead flow and email confirmation.",
}: CustomerConfirmationEmailProps) => {
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
            .mobile-p-top {
              padding-top: 16px !important;
            }
            .mobile-hide {
              display: none !important;
            }
            .mobile-center {
              text-align: center !important;
            }
            .timeline-item {
              display: block !important;
              width: 100% !important;
              margin-bottom: 16px !important;
              text-align: left !important;
            }
            .timeline-divider {
              display: none !important;
            }
            .timeline-content {
              display: flex !important;
              align-items: center !important;
              text-align: left !important;
              gap: 12px !important;
            }
            .timeline-text {
              text-align: left !important;
              margin-top: 0 !important;
            }
            .assistance-item {
              display: block !important;
              width: 100% !important;
              padding-bottom: 16px !important;
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
            .text-secondary, p {
              color: #d1d5db !important;
            }
            .card-bg {
              background-color: #262626 !important;
              border-color: #3f3f46 !important;
            }
            .table-border {
              border-color: #3f3f46 !important;
            }
            .table-cell-bg {
              background-color: #2d2d2d !important;
            }
            .footer-bar {
              background-color: #000000 !important;
            }
            .timeline-num {
              background-color: #3f3f46 !important;
              color: #f3f4f6 !important;
            }
          }
        `}</style>
      </Head>
      <Preview>
        Reference ID: {enquiryId}. Our team will review your requirement and contact you shortly.
      </Preview>
      <Body style={styles.body} className="body-bg">
        <Container style={styles.container} className="main-container">
          
          {/* Top Bar */}
          <Section style={styles.topBar}>
            <Row>
              <Column style={styles.topBarLeft}>
                <Text style={styles.topBarText} className="text-secondary">
                  Thank you for contacting Navkar Weldmart.
                </Text>
              </Column>
              <Column style={styles.topBarRight} className="mobile-hide">
                <Link href={baseUrl} style={styles.topBarLink} className="text-secondary">
                  View in browser
                </Link>
              </Column>
            </Row>
          </Section>

          {/* Header */}
          <Section style={styles.header}>
            <Row>
              <Column>
                <Heading as="h1" style={styles.logoText} className="text-primary">
                  NAVKAR WELDMART
                </Heading>
                <Text style={styles.tagline}>Steel Solutions. Built to Last.</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={styles.divider} className="table-border" />

          {/* Main Title */}
          <Section style={{ padding: "0 24px" }}>
            <Heading as="h2" style={styles.mainTitle} className="text-primary">
              Enquiry Received
            </Heading>
            <div style={styles.titleUnderline}></div>
          </Section>

          {/* Intro and Reference Card Container */}
          <Section style={{ padding: "0 24px", marginTop: "24px" }}>
            <Row>
              {/* Left Column: Intro */}
              <Column style={styles.colLeft} className="mobile-stack text-secondary">
                <Text style={styles.greeting} className="text-primary">
                  Hello {fullName},
                </Text>
                <Text style={styles.paragraph} className="text-secondary">
                  Thank you for contacting Navkar Weldmart.
                </Text>
                <Text style={styles.paragraph} className="text-secondary">
                  We have received your enquiry and the details have been successfully recorded under Reference ID:
                </Text>
                <Text style={styles.refIdHighlight}>
                  {enquiryId}
                </Text>
                <Text style={styles.paragraph} className="text-secondary">
                  Our team will review your requirement and contact you to discuss the project, specifications, site details, and next steps.
                </Text>
              </Column>

              {/* Right Column: Reference Card */}
              <Column style={styles.colRight} className="mobile-stack mobile-p-top">
                <Section style={styles.refCard} className="card-bg">
                  <Text style={styles.refCardTitle} className="text-secondary">REFERENCE ID</Text>
                  <Text style={styles.refCardValue}>{enquiryId}</Text>
                  <Hr style={{ borderColor: "#e5e7eb", marginTop: "16px", marginBottom: "0" }} className="table-border" />
                </Section>
              </Column>
            </Row>
          </Section>

          {/* Summary Table */}
          <Section style={{ padding: "0 24px", marginTop: "32px" }}>
            <Section style={styles.summaryContainer} className="card-bg table-border">
              <Text style={styles.summaryTitle} className="text-primary">ENQUIRY SUMMARY</Text>
              
              <Section style={{ borderTop: "1px solid #edf2f7" }} className="table-border">
                {/* Project Type */}
                <Row style={styles.tableRow}>
                  <Column style={styles.tableLabelCol}>
                    <div style={styles.labelWrapper}>
                      <div style={styles.orangePipe}></div>
                      <Text style={styles.tableLabel} className="text-primary">Project Type</Text>
                    </div>
                  </Column>
                  <Column style={styles.tableValueCol}>
                    <Text style={styles.tableValue} className="text-secondary">{projectType}</Text>
                  </Column>
                </Row>
                
                {/* Location */}
                <Row style={{ ...styles.tableRow, borderTop: "1px solid #edf2f7" }} className="table-border">
                  <Column style={styles.tableLabelCol}>
                    <div style={styles.labelWrapper}>
                      <div style={styles.orangePipe}></div>
                      <Text style={styles.tableLabel} className="text-primary">Location</Text>
                    </div>
                  </Column>
                  <Column style={styles.tableValueCol}>
                    <Text style={styles.tableValue} className="text-secondary">{projectLocation}</Text>
                  </Column>
                </Row>
                
                {/* Budget Range */}
                {estimatedBudget && (
                  <Row style={{ ...styles.tableRow, borderTop: "1px solid #edf2f7" }} className="table-border">
                    <Column style={styles.tableLabelCol}>
                      <div style={styles.labelWrapper}>
                        <div style={styles.orangePipe}></div>
                        <Text style={styles.tableLabel} className="text-primary">Budget Range</Text>
                      </div>
                    </Column>
                    <Column style={styles.tableValueCol}>
                      <Text style={styles.tableValue} className="text-secondary">{estimatedBudget}</Text>
                    </Column>
                  </Row>
                )}
                
                {/* Project Details */}
                <Row style={{ ...styles.tableRow, borderTop: "1px solid #edf2f7" }} className="table-border">
                  <Column style={styles.tableLabelCol}>
                    <div style={styles.labelWrapper}>
                      <div style={styles.orangePipe}></div>
                      <Text style={styles.tableLabel} className="text-primary">Project Details</Text>
                    </div>
                  </Column>
                  <Column style={styles.tableValueCol}>
                    <Text style={styles.tableValue} className="text-secondary">{projectDetails || "No additional details provided."}</Text>
                  </Column>
                </Row>
              </Section>
            </Section>
          </Section>

          {/* What Happens Next */}
          <Section style={{ padding: "0 24px", marginTop: "40px", textAlign: "center" }}>
            <Heading as="h3" style={styles.nextTitle} className="text-primary">
              WHAT HAPPENS NEXT?
            </Heading>
            <div style={styles.centerUnderline}></div>
            
            {/* Timeline */}
            <Section style={{ marginTop: "24px" }}>
              <Row>
                {/* Step 1 */}
                <Column style={styles.timelineCol} className="timeline-item">
                  <div className="timeline-content" style={styles.timelineContentWrap}>
                    <div style={styles.timelineNumSimple} className="text-primary">1</div>
                    <div className="timeline-text" style={styles.timelineTextWrap}>
                      <Text style={styles.timelineHeading} className="text-primary">We Review</Text>
                      <Text style={styles.timelineDesc} className="text-secondary">Our team reviews your enquiry in detail.</Text>
                    </div>
                  </div>
                </Column>
                
                {/* Step 2 */}
                <Column style={styles.timelineCol} className="timeline-item">
                  <div className="timeline-content" style={styles.timelineContentWrap}>
                    <div style={styles.timelineNumSimple} className="text-primary">2</div>
                    <div className="timeline-text" style={styles.timelineTextWrap}>
                      <Text style={styles.timelineHeading} className="text-primary">We Contact</Text>
                      <Text style={styles.timelineDesc} className="text-secondary">We may reach out to you for additional information.</Text>
                    </div>
                  </div>
                </Column>
                
                {/* Step 3 */}
                <Column style={styles.timelineCol} className="timeline-item">
                  <div className="timeline-content" style={styles.timelineContentWrap}>
                    <div style={styles.timelineNumSimple} className="text-primary">3</div>
                    <div className="timeline-text" style={styles.timelineTextWrap}>
                      <Text style={styles.timelineHeading} className="text-primary">Discussion</Text>
                      <Text style={styles.timelineDesc} className="text-secondary">We discuss your requirements, site details & timelines.</Text>
                    </div>
                  </div>
                </Column>
                
                {/* Step 4 */}
                <Column style={styles.timelineCol} className="timeline-item">
                  <div className="timeline-content" style={styles.timelineContentWrap}>
                    <div style={styles.timelineNumSimple} className="text-primary">4</div>
                    <div className="timeline-text" style={styles.timelineTextWrap}>
                      <Text style={styles.timelineHeading} className="text-primary">Quotation Support</Text>
                      <Text style={styles.timelineDesc} className="text-secondary">We provide suitable solutions and quotation support.</Text>
                    </div>
                  </div>
                </Column>
              </Row>
            </Section>
          </Section>

          {/* Assistance Section */}
          <Section style={{ padding: "0 24px", marginTop: "32px" }}>
            <Section style={styles.assistanceCard} className="card-bg">
              <Row>
                <Column>
                  <Text style={styles.assistanceTitle} className="text-primary">NEED IMMEDIATE ASSISTANCE?</Text>
                  <Text style={styles.assistanceDesc} className="text-secondary">If your requirement is urgent, please contact us directly.</Text>
                </Column>
              </Row>
              
              <Row style={{ marginTop: "20px" }}>
                {/* Row 1 for Mobile/Desktop */}
                <Column style={styles.assistanceCol} className="assistance-item">
                  <Text style={styles.assistanceLabel} className="text-secondary">
                    Call Us
                  </Text>
                  <Text style={styles.assistanceValue} className="text-primary">+91 96697 69760</Text>
                  <Text style={styles.assistanceValue} className="text-primary">+91 62637 21818</Text>
                </Column>
                <Column style={styles.assistanceCol} className="assistance-item">
                  <Text style={styles.assistanceLabel} className="text-secondary">
                    Email Us
                  </Text>
                  <Link href="mailto:navkarweldmart@gmail.com" style={styles.assistanceLink}>
                    navkarweldmart<br/>@gmail.com
                  </Link>
                </Column>
                {/* On desktop, this will be 4 columns. Using a single row of 4 columns might be tight. Let's make it 4 columns if possible. */}
                <Column style={styles.assistanceCol} className="assistance-item">
                  <Text style={styles.assistanceLabel} className="text-secondary">
                    Visit Website
                  </Text>
                  <Link href="https://navkarweldmart.com" style={styles.assistanceLink}>
                    navkarweldmart.com
                  </Link>
                </Column>
                <Column style={styles.assistanceCol} className="assistance-item">
                  <Text style={styles.assistanceLabel} className="text-secondary">
                    Our Office
                  </Text>
                  <Text style={styles.assistanceValue} className="text-primary">Indore,<br/>Madhya Pradesh</Text>
                </Column>
              </Row>
            </Section>
          </Section>

          <Hr style={{ ...styles.divider, marginTop: "40px" }} className="table-border" />

          {/* Pre-footer */}
          <Section style={{ padding: "0 24px", marginBottom: "32px" }}>
            <Row>
              <Column style={styles.footerLogoCol} className="mobile-stack">
                <Text style={{ ...styles.logoText, fontSize: "14px", margin: 0 }} className="text-primary">
                  NAVKAR WELDMART
                </Text>
                <Text style={{ ...styles.tagline, fontSize: "10px", margin: 0 }}>
                  Steel Solutions. Built to Last.
                </Text>
              </Column>
              <Column style={styles.footerTextCol} className="mobile-stack mobile-p-top">
                <Text style={styles.footerThanks} className="text-secondary">
                  Thank you for considering Navkar Weldmart.
                  <br />
                  We look forward to working with you.
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Bottom Dark Bar */}
          <Section style={styles.bottomBar} className="footer-bar">
            <Text style={styles.bottomBarText}>
              This is an automated email. Please do not reply to this email.
            </Text>
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
  textMuted: "#4b5563",
  primary: "#b25e2b", // Using a refined orange/brown from mockup
  border: "#e5e7eb",
  cardBg: "#fafafa",
  footerBg: "#1f2937",
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
    maxWidth: "700px",
    margin: "0 auto",
    overflow: "hidden", // for the bottom bar border radius
  },
  topBar: {
    padding: "16px 24px 0",
  },
  topBarLeft: {
    textAlign: "left" as const,
  },
  topBarRight: {
    textAlign: "right" as const,
  },
  topBarText: {
    fontSize: "12px",
    color: colors.textMuted,
    margin: 0,
  },
  topBarLink: {
    fontSize: "12px",
    color: colors.textMuted,
    textDecoration: "underline",
    margin: 0,
  },
  header: {
    padding: "24px 24px 0",
  },
  logo: {
    display: "block",
  },
  logoText: {
    fontSize: "20px",
    fontWeight: "800",
    color: colors.textMain,
    letterSpacing: "1px",
    margin: "0 0 2px 0",
    lineHeight: "1",
  },
  tagline: {
    fontSize: "12px",
    color: colors.primary,
    fontWeight: "600",
    textTransform: "uppercase" as const,
    margin: "0",
    lineHeight: "1",
  },
  divider: {
    borderColor: colors.border,
    margin: "24px 0",
  },
  mainTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: colors.textMain,
    margin: "0 0 4px 0",
  },
  titleUnderline: {
    width: "40px",
    height: "3px",
    backgroundColor: colors.primary,
    borderRadius: "2px",
  },
  colLeft: {
    width: "55%",
    paddingRight: "20px",
    verticalAlign: "top",
  },
  colRight: {
    width: "45%",
    verticalAlign: "top",
  },
  greeting: {
    fontSize: "16px",
    fontWeight: "600",
    color: colors.textMain,
    margin: "0 0 12px 0",
  },
  paragraph: {
    fontSize: "14px",
    color: colors.textMuted,
    lineHeight: "1.6",
    margin: "0 0 12px 0",
  },
  refIdHighlight: {
    fontSize: "16px",
    fontWeight: "700",
    color: colors.primary,
    margin: "0 0 12px 0",
  },
  refCard: {
    backgroundColor: colors.cardBg,
    borderRadius: "8px",
    padding: "24px",
    textAlign: "center" as const,
    border: `1px solid ${colors.border}`,
  },
  refCardTitle: {
    fontSize: "10px",
    fontWeight: "700",
    color: colors.textMuted,
    letterSpacing: "2px",
    margin: "0 0 8px 0",
  },
  refCardValue: {
    fontSize: "18px",
    fontWeight: "700",
    color: colors.primary,
    margin: "0",
  },
  summaryContainer: {
    backgroundColor: colors.container,
    border: `1px solid ${colors.border}`,
    borderRadius: "8px",
  },
  summaryTitle: {
    fontSize: "12px",
    fontWeight: "700",
    color: colors.textMain,
    letterSpacing: "1px",
    padding: "16px 20px",
    margin: 0,
  },
  tableRow: {
    width: "100%",
  },
  tableLabelCol: {
    width: "35%",
    padding: "12px 20px",
    verticalAlign: "top",
    backgroundColor: "#fcfcfc",
  },
  labelWrapper: {
    display: "flex",
    alignItems: "center",
  },
  orangePipe: {
    width: "2px",
    height: "14px",
    backgroundColor: colors.primary,
    marginRight: "10px",
    display: "inline-block",
  },
  tableLabel: {
    fontSize: "13px",
    fontWeight: "600",
    color: colors.textMain,
    margin: 0,
    display: "inline-block",
  },
  tableValueCol: {
    width: "65%",
    padding: "12px 20px",
    verticalAlign: "top",
  },
  tableValue: {
    fontSize: "14px",
    color: colors.textMuted,
    margin: 0,
    lineHeight: "1.5",
  },
  nextTitle: {
    fontSize: "14px",
    fontWeight: "700",
    color: colors.textMain,
    letterSpacing: "2px",
    margin: "0 0 8px 0",
  },
  centerUnderline: {
    width: "30px",
    height: "2px",
    backgroundColor: colors.primary,
    margin: "0 auto",
  },
  timelineCol: {
    width: "25%",
    verticalAlign: "top",
    textAlign: "center" as const,
  },
  timelineContentWrap: {
    // Used for mobile overrides
  },
  timelineNumSimple: {
    fontSize: "24px",
    fontWeight: "700",
    color: colors.primary,
    marginBottom: "8px",
  },
  timelineTextWrap: {
    padding: "0 8px",
  },
  timelineHeading: {
    fontSize: "12px",
    fontWeight: "700",
    color: colors.textMain,
    margin: "0 0 4px 0",
  },
  timelineDesc: {
    fontSize: "11px",
    color: colors.textMuted,
    margin: 0,
    lineHeight: "1.5",
  },
  assistanceCard: {
    backgroundColor: "#fffaf5", // Very light orange/peach tint
    border: `1px solid #fce7d2`,
    borderRadius: "8px",
    padding: "24px",
  },
  phoneIconWrap: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "#faeedf",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // For older clients
    textAlign: "center" as const,
    lineHeight: "36px",
  },
  assistanceTitle: {
    fontSize: "14px",
    fontWeight: "700",
    color: colors.primary,
    margin: "0 0 4px 0",
  },
  assistanceDesc: {
    fontSize: "13px",
    color: colors.textMuted,
    margin: 0,
  },
  assistanceCol: {
    width: "25%",
    verticalAlign: "top",
  },
  assistanceLabel: {
    fontSize: "11px",
    fontWeight: "600",
    color: colors.textMuted,
    margin: "0 0 6px 0",
    display: "flex",
    alignItems: "center",
  },
  assistanceValue: {
    fontSize: "12px",
    color: colors.textMain,
    margin: "0 0 2px 0",
    fontWeight: "500",
  },
  assistanceLink: {
    fontSize: "12px",
    color: colors.textMain,
    textDecoration: "none",
    fontWeight: "500",
  },
  footerLogoCol: {
    width: "50%",
    verticalAlign: "middle",
  },
  footerTextCol: {
    width: "50%",
    verticalAlign: "middle",
    textAlign: "right" as const,
  },
  footerThanks: {
    fontSize: "12px",
    color: colors.textMain,
    margin: 0,
    lineHeight: "1.5",
  },
  bottomBar: {
    backgroundColor: colors.footerBg,
    padding: "16px 24px",
    textAlign: "center" as const,
  },
  bottomBarText: {
    fontSize: "11px",
    color: "#9ca3af",
    margin: 0,
  },
};

export function getCustomerConfirmationEmailText(props: CustomerConfirmationEmailProps): string {
  return `
NAVKAR WELDMART
Steel Solutions. Built to Last.
==============================================
Hello ${props.fullName},

Thank you for contacting Navkar Weldmart.

We have received your enquiry and the details have been successfully recorded under Reference ID: ${props.enquiryId}.

Our team will review your requirement and contact you to discuss the project, specifications, site details, and next steps.

----------------------------------------------
REFERENCE ID: ${props.enquiryId}
----------------------------------------------

ENQUIRY SUMMARY
Project Type: ${props.projectType}
Location: ${props.projectLocation}
Budget Range: ${props.estimatedBudget || "Not specified"}
Project Details: ${props.projectDetails || "No additional details provided."}

WHAT HAPPENS NEXT?
1. We Review - Our team reviews your enquiry in detail.
2. We Contact - We may reach out to you for additional information.
3. Discussion - We discuss your requirements, site details & timelines.
4. Quotation Support - We provide suitable solutions and quotation support.

NEED IMMEDIATE ASSISTANCE?
If your requirement is urgent, please contact us directly.

Call Us: +91 96697 69760, +91 62637 21818
Email Us: navkarweldmart@gmail.com
Visit Website: navkarweldmart.com
Our Office: Indore, Madhya Pradesh

Thank you for considering Navkar Weldmart. We look forward to working with you.

This is an automated email. Please do not reply to this email.
  `.trim();
}

export default CustomerConfirmationEmail;
