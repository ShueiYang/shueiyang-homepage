
import dynamic from "next/dynamic"
import HomepageLayout from "@/components/resume/homepage"
import { Section } from "@/components/layouts/Section"
import Button from "@/components/customButton/Button"
import Curriculum from "@/components/resume/Curriculum"
import Langues from "@/components/resume/Langues"
import WebPresence from "@/components/resume/WebPresence"


const SkillsBar = dynamic(()=> import("@/components/skillsAnimeBar/SkillsBar"), {
   ssr: false 
})


export default function Homepage() {  

  return ( 
    <HomepageLayout>
      <Section delay={0.1}> 
        <h2 className="section">
          A propos
        </h2>
        <p className="text-justify indent-4">Ancien vendeur et assistant commercial en maroquinerie et en informatique actuellement
          en reconversion professionnelle dans le développement Web, j&apos;ai commencé en autodidacte en 2022 et afin d'officialiser 
          cette reconversion j&apos;ai décidé de démissionner de mon poste pour poursuivre ce &quot;Carrer path&quot; ! 
          <br />&nbsp; J&apos;ai récemment complété ma formation chez Le Reacteur afin de renforcer mes compétences, et je 
          suis actuellement à la recherche d&apos;un stage ou alternance pour mettre en pratique mes compétences en Backend 
          et/ou Frontend.  
        </p>
      </Section>
          
      <Section delay={0.2}>
        <h2 className="section"> 
          Competence
        </h2>
        <SkillsBar />
      </Section>
               
      <Section delay={0.3}> 
        <Button path="/projects">
          Mon portfolio
        </Button>
      </Section> 

      <Section delay={0.4}>
        <h2 className="section"> 
          Bio
        </h2>
        <Curriculum />
      </Section>

      <Section delay={0.5}>
        <WebPresence />
      </Section>

      <Section delay={0.6}>
        <Langues />
      </Section>

      <Section delay={0.7}>
        <h2 className="section"> 
          Hobbies
        </h2>
        <p>
          Veille technologique, Jeux video de type MMORPG, RTS, Hack&apos;n Slash, et City-Builder,
          Cyclisme, Manga et Manhwa, Film coréen en VOSTA.
        </p>
      </Section>
    </HomepageLayout>
  )
};