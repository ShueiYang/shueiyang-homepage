// import { ParsedUrlQuery } from "querystring";
import { notFound } from "next/navigation"
import Image from "next/image";
import PageLayout from "@/components/layouts/PageLayout";
import PreviousLink from "@/components/PreviousLink";
import { getProjects } from "../page";
// import Loader from "@/components/Loader";


interface ParamsProps {
  params: { projectName: string }
}


async function getProjectDetail(projectName: string) {
  const projectsData = await getProjects()
  const project = projectsData.find(project => project.id === projectName)
  return project;       
}


export async function generateStaticParams() {
  const projectsData = await getProjects();
  const paths = projectsData.map(project => {
      return { projectName: project.id }
  })
  return paths;
}



const Work = async ({params}: ParamsProps) => {
   
  const project = await getProjectDetail(params.projectName)

  if(!project) {
    notFound();
  }

  return (
    <PageLayout>
      <article className="container xl:max-w-5xl my-6">
        <PreviousLink path="/projects" style="mx-auto">
          Projects
        </PreviousLink>
 
        <h1 className="subSection text-3xl font-ibm font-semibold text-center mb-6">
          {project.title}
        </h1>
        
        <div className="subSection mb-6">
          <p className="indent-5">{project.content}</p>
        </div>
        
        <div className="subSection font-ibm">
          <h3 className="subTitle mr-2">
            STACK
          </h3>
          { project.stack.map((item, index) => {
              return (
                <span key={index} className="mx-1 md:mx-1.5">
                  {`${item},`}
                </span>
              )
            })
          }            
        </div>      

        <div className="subSection mt-2 sm:mt-0 font-ibm">
          <h3 className="subTitle mr-3">
            WEBSITE
          </h3>
          <a 
            href={project.url}
            className="text-blue-600 dark:text-teal-300 hover:underline underline-offset-4"              
            rel="noopener noreferrer" 
            target="_blank"
          >              
            <span>{project.url}</span>
          </a>
        </div>

        <div className="subSection font-ibm">
          <h3 className="subTitle mr-3">
            SOURCE CODE
          </h3>
          <a 
            href={project.source}
            className="text-blue-600 dark:text-teal-300 hover:underline underline-offset-4"              
            rel="noopener noreferrer" 
            target="_blank"
          > 
            <span>{project.source}</span>
          </a>
        </div>

        <div className="subSection">
         {
          project.images.map((image, index) => {
            return (
              <div key={index} className="mt-8">
                <Image 
                  src={`/images/assets/${image}`}
                  className="rounded-xl w-full aspect-[16/10]"
                  alt={image}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={`/images/assets/${image}`}
                  width={550}
                  height={300}
                />
              </div>
            )
          })
         } 
        </div>  
      </article>
    </PageLayout>
  )
}

export default Work;