import type { Metadata } from "next"
import PageLayout from "@/components/layouts/PageLayout";
import PortfolioLayout from "@/components/layouts/PortfolioLayout";
import PreviousLink from '@/components/PreviousLink';


export const metadata: Metadata = {
  title: "Kim Nguyen - Projects",
  description: `Kim"s website`,
}

// function for Data fetching
export async function getProjects() {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api`)
    if(!response.ok) {
      throw new Error("Failed to Fetch Data")
    }
    return response.json();
  } catch (err) {
    console.error(err)
  }
}


const Projects = async () => {

  // Data fetching on server side
  const projectsData: ProjectData[] = await getProjects();

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
                    thumbnail={project.images[0].secure_url}
                  >
                    {project.description}
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