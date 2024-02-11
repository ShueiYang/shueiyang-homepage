import { RESUME_DATA } from "@/constants/resume.data";
import { Fragment } from "react";

const Curriculum = () => {
  // use index as key since this data is static.
  return (
    <div className="grid grid-cols-4 gap-5">
      {RESUME_DATA.map((resume, index) => {
        return (
          <Fragment key={index}>
            <div className="col-span-1">{resume.year}</div>
            <div className="col-span-3">{resume.cv}</div>
          </Fragment>
        );
      })}
    </div>
  );
};

export default Curriculum;
