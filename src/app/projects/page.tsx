import type { Metadata } from "next";
import { ImageDataType, ProjectData } from "@root/common.types";
import { getProjects } from "@/actions";

import PortfolioLayout from "@/components/layouts/PortfolioLayout";
import PreviousLink from "@/components/PreviousLink";

export const revalidate = 60; // revalidate every 60s...

export const metadata: Metadata = {
  title: "Kim Nguyen - Projects",
  description: `Kim"s website`,
};

export default async function Projects() {
  // Data fetching on server side
  const projectsData: ProjectData[] = await getProjects();

  return (
    <article className="container mb-6">
      <PreviousLink path="/">Retour</PreviousLink>
      <h2 className="section text-2xl">Projects</h2>
      <div className="mx-auto mt-4 grid max-w-[35rem] auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 lg:max-w-[40rem] xl:max-w-[80%] xl:grid-cols-3 xl:gap-12">
        {projectsData.map((project) => {
          const projectImage = project.images.at(0) ?? ({} as ImageDataType);

          return (
            <div key={project.id}>
              <PortfolioLayout
                href={`/projects/${project.id}`}
                title={project.title}
                thumbnail={projectImage.secure_url}
              >
                {project.description}
              </PortfolioLayout>
            </div>
          );
        })}
      </div>
    </article>
  );
}
