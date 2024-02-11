import { forwardRef } from "react";

type SceneContainerProps = {
  children: React.ReactNode;
};

const SceneContainer = forwardRef<HTMLDivElement, SceneContainerProps>(
  ({ children }, ref) => {
    return (
      <div
        ref={ref}
        className="relative mx-auto -mb-10 -mt-5 h-72 w-72 sm:-mb-32 sm:-mt-14 sm:h-[30rem] sm:w-[30rem] md:-mb-44 md:-mt-28 md:h-[40rem] md:w-[40rem]"
      >
        {children}
      </div>
    );
  },
);
SceneContainer.displayName = "SceneContainer";

export default SceneContainer;
