import type { Metadata } from "next"
import { ProjectData } from "@root/common.types";
import { getProjects } from "@/app/action";

import PageLayout from "@/components/layouts/PageLayout";
import PortfolioLayout from "@/components/layouts/PortfolioLayout";
import PreviousLink from '@/components/PreviousLink';
import DataRevalidator from "@/components/DataRevalidator";

export const revalidate = 60 // revalidate every 60s...

export const metadata: Metadata = {
  title: "Kim Nguyen - Projects",
  description: `Kim"s website`,
}


export default async function Projects() {
  // Data fetching on server side
  const projectsData: ProjectData[] = await getProjects();

  return (
    <PageLayout>
      <DataRevalidator />
      <article className="container mb-6">
        <PreviousLink path="/">
          Retour
        </PreviousLink>
        <h2 className="section text-2xl">
          Projects    
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 auto-rows-fr mt-4 mx-auto gap-6 xl:gap-12 max-w-[35rem] lg:max-w-[40rem] xl:max-w-[80%]">
          {projectsData.map((project) => {
            return (
              <div key={project.id}>  
                <PortfolioLayout
                  href={`/projects/${project.id}`}
                  title={project.title}
                  thumbnail={project.images[0].secure_url}
                >
                  {project.description}
                </PortfolioLayout>
              </div>
            )})
          }
        </div>
      </article>
    </PageLayout>
  )
};  