import Image from "next/image";
import { PageHeader } from "@/components/shared/page-header";
import { companyInfo } from "@/content";

export function AboutHero() {
  return (
    <PageHeader
      crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      title="From a hardware counter to a fabrication workshop"
      lead={
        <p>
          Navkar started in 2012 selling iron and steel to Indore&apos;s builders and
          fabricators. Today we supply the steel, fabricate it in our own workshop and erect it
          on site, for factories, hotels, sports clubs and homes across Madhya Pradesh.
        </p>
      }
      below={
        <div className="flex max-w-md items-center gap-4 border-t border-foreground pt-4 text-[0.9375rem]">
          <div>
            <p className="font-semibold">Jinesh Jain</p>
            <p className="text-steel-500">Founder</p>
          </div>
          <a
            href={companyInfo.social.bni}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-2 text-sm text-steel-500 hover:text-foreground"
          >
            <Image src="/images/bni-logo.png" alt="BNI" width={40} height={25} className="h-4 w-auto" />
            <span className="link-rule">Member profile</span>
          </a>
        </div>
      }
      imageLayout="side"
      image={{
        src: "/images/jinesh-portrait-contact.jpg",
        alt: "Jinesh Jain, founder of Navkar Weldmart, speaking at a BNI chapter meeting",
        position: "center 20%",
      }}
    />
  );
}
