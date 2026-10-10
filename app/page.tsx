import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Resume } from "@/components/Resume";
import { Skills } from "@/components/Skills";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <Resume />
      <Contact />
    </>
  );
}
