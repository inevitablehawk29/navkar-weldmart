import { Client, Partner, Testimonial } from '@/types';

export const clients: Client[] = [
  // Commercial
  { name: "Ruchi HiSeeds", category: "Commercial" },
  { name: "Indore Tennis Club", category: "Commercial" },
  { name: "Ahilya Fort & Resort", category: "Commercial" },
  { name: "Nature Nest Resort", category: "Commercial" },
  { name: "Bombay Builders", category: "Commercial" },
  { name: "Aashirvad Diagnostic", category: "Commercial" },
  { name: "Sukhmani Plaza, GNT Market", category: "Commercial" },

  // Residential
  { name: "Kailash Bhalse", category: "Residential" },
  { name: "Milind Joshi", category: "Residential" },
  { name: "Gulaab Singhvi", category: "Residential" },
  { name: "Nimish Sancheti", category: "Residential" },
  { name: "Nimish Dosi", category: "Residential" },
  { name: "Aayush Patni", category: "Residential" },
  // BNI Members
  { name: "Aadarsh Modi", category: "BNI Members" },
  { name: "Aveg Bhandari", category: "BNI Members" },
  { name: "Ashish Mangal", category: "BNI Members" },
  { name: "Divyesh Kothari", category: "BNI Members" },
  { name: "Aniruddha Mittal", category: "BNI Members" },
  { name: "Rishabh Patwa", category: "BNI Members" },
  { name: "Ruchika Shah", category: "BNI Members" },

  // Architects & Engineers
  { name: "Ar. Muskan Jain", category: "Architects & Engineers" },
  { name: "Er. HI Mehta", category: "Architects & Engineers" },
  { name: "Nikhil Janghiani", category: "Architects & Engineers" },
  { name: "Bhaskar Agrawal", category: "Architects & Engineers" },
  { name: "Vallabh Agrawal", category: "Architects & Engineers" },
  { name: "Rajkumar Vaswani", category: "Architects & Engineers" },
  { name: "Pankaj Rokadiya", category: "Architects & Engineers" },
  { name: "Yash Vani", category: "Architects & Engineers" },
];

export const partners: Partner[] = [
  { name: "JSW", logo: "/images/partners/JSW_Group_logo.svg_fixed.webp" },
  { name: "Tata Structura", logo: "/images/partners/tata_structura_logo_fixed.webp" },
  { name: "Jindal Steel & Power", logo: "/images/partners/Jindal_Steel_Limited_Logo_fixed.webp" },
  { name: "AM/NS India", logo: "/images/partners/AMNS-Logo_fixed.webp" },
  { name: "Prakash Surya", logo: "/images/partners/prakash_surya_logo_new.webp" },
  { name: "Ador", logo: "/images/partners/Ador-logo1-1536x524_fixed.webp" },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Navkar Weldmart delivered our project with exceptional quality and on time. Their team is professional, reliable and solution oriented.",
    author: "Ar. Abhishek Jain",
    role: "Architect",
  },
  {
    quote:
      "The quality of fabrication work is outstanding. They understand architectural requirements and deliver precision metalwork every time.",
    author: "Er. HI Mehta",
    role: "Structural Engineer",
  },
  {
    quote:
      "From material sourcing to final installation, Navkar Weldmart handled everything seamlessly. Truly a one-stop solution for steel needs.",
    author: "Kailash Bhalse",
    role: "Property Developer",
  },
];