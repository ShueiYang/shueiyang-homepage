import { RESUME_DATA } from "@/constants/resume.data";
import { Fragment } from "react";

export default function Curriculum() {
  return (
    <dl className="grid grid-cols-4 gap-5">
      {RESUME_DATA.map((resume) => {
        return (
          <Fragment key={resume.year}>
            <dt className="col-span-1">{resume.year}</dt>
            <dd className="col-span-3">{resume.cv}</dd>
          </Fragment>
        );
      })}
    </dl>
  );
}
