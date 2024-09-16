import { Metadata } from "next";
import { ProjectData } from "@root/common.types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectInfo, getProjects } from "@/actions";
import PreviousLink from "@/components/PreviousLink";
import { mongoIdSchema } from "@/validator/schemaValidation";

export const revalidate = 60; // revalidate every 60s...

interface ParamsProps {
  params: { projectId: string };
}

// generate dynamic Metadata
export async function generateMetadata({
  params,
}: ParamsProps): Promise<Metadata> {
  const validatedId = mongoIdSchema.safeParse(params.projectId);

  if (!validatedId.success) {
    return { title: "Page not found" };
  }
  const project: ProjectData | null = await getProjectInfo(params.projectId);
  return {
    title: `Kim - ${project?.title ?? "Not Found"}`,
  };
}

export async function generateStaticParams() {
  const projectsData: ProjectData[] = await getProjects();
  const paths = projectsData.map((project) => {
    return { projectId: project.id };
  });
  return paths;
}

export default async function Work({ params }: Readonly<ParamsProps>) {
  const projectId = params.projectId;
  const validatedId = mongoIdSchema.safeParse(projectId);

  let project: ProjectData | null = null;

  if (validatedId.success) {
    project = await getProjectInfo(projectId);
  }

  if (!project) {
    notFound();
  }

  return (
    <article className="container my-6 xl:max-w-5xl">
      <div className="mx-auto flex justify-between md:max-w-[44rem]">
        <PreviousLink path="/projects" style="">
          Projects
        </PreviousLink>
        <Link
          href={`/backoffice/dashboard/${projectId}`}
          prefetch={false}
          className="flex h-full items-start"
        >
          <span className="text-lg text-blue-600 underline-offset-4 hover:underline dark:text-teal-300">
            Edit
          </span>
          <Image
            src="/icons/pencile.svg"
            className="mx-1 dark:invert"
            width={23}
            height={23}
            alt="Edit pencil"
          />
        </Link>
      </div>
      <h1 className="subSection my-6 text-center font-ibm text-3xl font-semibold">
        {project.title}
      </h1>

      <div className="subSection mb-6">
        <p className="indent-5">{project.content}</p>
      </div>

      <div className="subSection font-ibm">
        <h3 className="subTitle mr-2">STACK</h3>
        {project.stack.map((item, index) => {
          return (
            <span key={index} className="mx-1 md:mx-1.5">
              {`${item},`}
            </span>
          );
        })}
      </div>

      <div className="subSection mt-2 font-ibm sm:mt-0">
        <h3 className="subTitle mr-3">WEBSITE</h3>
        <a
          href={project.siteUrl ?? undefined}
          className="text-blue-600 underline-offset-4 hover:underline dark:text-teal-300"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span>{project.siteUrl}</span>
        </a>
      </div>

      <div className="subSection font-ibm">
        <h3 className="subTitle mr-3">SOURCE CODE</h3>
        <a
          href={project.githubUrl}
          className="text-blue-600 underline-offset-4 hover:underline dark:text-teal-300"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span>{project.githubUrl}</span>
        </a>
      </div>

      <div className="subSection">
        {project.images.map((image) => {
          return (
            <div key={image.id} className="mt-8">
              <Image
                src={image.secure_url}
                className="aspect-[16/10] w-full rounded-xl"
                alt="project preview"
                loading="lazy"
                placeholder="blur"
                blurDataURL={`/images/assets/vercel.jpeg`}
                width={550}
                height={300}
              />
            </div>
          );
        })}
      </div>
    </article>
  );
}
