import type { Metadata } from "next"
import PageLayout from "@/components/layouts/PageLayout";
import PortfolioLayout from "@/components/layouts/PortfolioLayout";
import { projectsData } from "@/constants/portfolio.database";
import PreviousLink from '@/components/PreviousLink';
import { prisma } from "@/lib/prisma";

// export const metadata: Metadata = {
//   title: "Kim Nguyen - Projects",
//   description: `Kim"s website`,
//   authors: [{ name: "Kim Nguyen" }, { name: "Shueiyang", url: "https://nextjs.org" }],
// }

export async function getProjects() {
  return Promise.resolve(projectsData);
}

const Projects = async () => {

  const projectsData = await getProjects();

  // const results = await prisma.project.findMany();
  // console.log("API fetch Results", results);
    
  return (
    <PageLayout>
      <article className="container mb-6">
        <PreviousLink path="/">
          Retour
        </PreviousLink>
        <h2 className="section text-2xl">
            Projects    
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 auto-rows-fr mt-4 mx-auto gap-6 xl:gap-12 max-w-[35rem] lg:max-w-[40rem] xl:max-w-[80%]">
          {
            projectsData.map((project) => {
              return (
                <div key={project.id}>  
                  <PortfolioLayout
                    href={`/projects/${project.id}`}
                    title={project.title}
                    thumbnail={`/images/assets/${project.images[0]}`}
                  >
                    {project.desc}
                  </PortfolioLayout>
                </div>
              )
            })
          }
        </div>
      </article>
    </PageLayout>
  )
}

export default Projects;        