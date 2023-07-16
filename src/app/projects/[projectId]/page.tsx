// import { ParsedUrlQuery } from "querystring";
import { ProjectData } from "@root/common.types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation"
import PageLayout from "@/components/layouts/PageLayout";
import PreviousLink from "@/components/PreviousLink";
import { getProjects } from "../page";
import { getProjectInfo } from "@/app/action";

export const revalidate = 60 // revalidate every 60s...

interface ParamsProps {
  params: { projectId: string }
}

export async function generateStaticParams() {
  const projectsData: ProjectData[] = await getProjects();
  const paths = projectsData.map(project => {
      return { projectId: project.id }
  })
  return paths;
}


const Work = async ({params}: ParamsProps) => {
  const projectId = params.projectId
  // console.log("check", params);
  
  const project: ProjectData | null = await getProjectInfo(projectId);

  if(!project) {
    notFound();
  }

  return (
    <PageLayout>
      <article className="container xl:max-w-5xl my-6">
        <div className="flex justify-between md:max-w-[44rem] mx-auto">
          <PreviousLink path="/projects" style="">
            Projects
          </PreviousLink>
          <Link
            href={`/backoffice/dashboard/${projectId}`}
            prefetch={false}
            className="flex items-start h-full"
          >
            <span className="text-lg text-blue-600 dark:text-teal-300 hover:underline underline-offset-4">
              Edit
            </span>
            <Image
              src="/icons/pencile.svg"
              className="dark:invert mx-1"
              width={23}
              height={23}
              alt="Edit pencil"
            />
          </Link>
        </div>
        <h1 className="subSection text-3xl font-ibm font-semibold text-center my-6">
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
          })}             
        </div>      

        <div className="subSection mt-2 sm:mt-0 font-ibm">
          <h3 className="subTitle mr-3">
            WEBSITE
          </h3>
          <a 
            href={project.siteUrl}
            className="text-blue-600 dark:text-teal-300 hover:underline underline-offset-4"              
            rel="noopener noreferrer" 
            target="_blank"
          >              
            <span>{project.siteUrl}</span>
          </a>
        </div>

        <div className="subSection font-ibm">
          <h3 className="subTitle mr-3">
            SOURCE CODE
          </h3>
          <a 
            href={project.githubUrl}
            className="text-blue-600 dark:text-teal-300 hover:underline underline-offset-4"              
            rel="noopener noreferrer" 
            target="_blank"
          > 
            <span>{project.githubUrl}</span>
          </a>
        </div>

        <div className="subSection">
        {project.images.map((image, index) => {
          return (
            <div key={index} className="mt-8">
              <Image 
                src={image.secure_url}
                className="rounded-xl w-full aspect-[16/10]"
                alt="project preview"
                loading="lazy"
                placeholder="blur"
                blurDataURL={`/images/assets/vercel.jpeg`}
                width={550}
                height={300}
              />
            </div>
          )
        })}      
        </div>  
      </article>
    </PageLayout>
  )
}

export default Work;