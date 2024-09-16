import dynamic from "next/dynamic";
import Image from "next/image";
import HomeHeader from "@/components/resume/HomeHeader";
import { Section } from "@/components/layouts/Section";
import Button from "@/components/customButton/Button";
import Curriculum from "@/components/resume/Curriculum";
import Langues from "@/components/resume/Langues";
import WebPresence from "@/components/resume/WebPresence";
import ContactSection from "@/components/resume/ContactSection";

const SkillsBar = dynamic(
  () => import("@/components/skillsAnimeBar/SkillsBar"),
  {
    ssr: false,
  },
);

export default function Homepage() {
  return (
    <article className="container xl:max-w-5xl">
      <HomeHeader />

      <Section delay={0.1}>
        <h2 className="section">A propos</h2>
        <p className="text-justify indent-4">
          {`Ancien vendeur et assistant commercial en maroquinerie et en informatique,
            j'ai effectué une reconversion professionnelle dans le développement Web en
            débutant mon apprentissage en autodidacte en 2022. Pour officialiser 
            cette reconversion, j'ai pris la décision de démissionner de mon poste afin 
            de me consacrer pleinement à ce nouvel objectif professionnel et poursuivre 
            ce "Carrer path" !`}
          <br />
          &nbsp; J&apos;ai donc par la suite complété ma formation chez Le
          Reacteur afin de renforcer mes compétences, et je suis désormais au
          poste de développer Front chez&nbsp;
          <a
            href="https://www.ekino.fr"
            className="inline-block"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image
              src={`/images/ekino.svg`}
              alt="Ekino"
              width={49}
              height={49}
            />
          </a>
        </p>
      </Section>

      <Section delay={0.2}>
        <h2 className="section">Competence</h2>
        <SkillsBar />
      </Section>

      <Section delay={0.3}>
        <Button path="/projects">Mon portfolio</Button>
      </Section>

      <Section delay={0.4}>
        <h2 className="section">Bio</h2>
        <Curriculum />
      </Section>

      <Section delay={0.5}>
        <WebPresence />
      </Section>

      <Section delay={0.6}>
        <Langues />
      </Section>

      <Section delay={0.7}>
        <h2 className="section">Hobbies</h2>
        <p>
          Veille technologique, Jeux video de type MMORPG, RTS, Hack&apos;n
          Slash, et City-Builder, Cyclisme, Manga et Manhwa, Film coréen en
          VOSTA.
        </p>
      </Section>

      <ContactSection />
    </article>
  );
}
