import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import {
  Contact,
  Footer,
  FullBleed,
  Gallery,
  Hero,
  Reviews,
  ServiceSections,
  ServicesIndex,
  Statement,
  Story,
} from "@/components/Sections";
import { business } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Statement />
        <Story />
        <FullBleed
          src="/images/chef.jpg"
          alt={business.ownerHe}
          position="center 16%"
        />
        <ServicesIndex />
        <ServiceSections />
        <Gallery />
        <Reviews />
        <FullBleed
          src="/images/dish.jpg"
          position="center 55%"
          className="h-[300px] md:h-[480px]"
        />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
