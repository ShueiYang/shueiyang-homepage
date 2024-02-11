import CircularProgressBar from "../CircularLoader";
import SceneContainer from "./SceneContainer";

const CandleStickLoader = ({ progress }: { progress?: number }) => {
  return (
    <SceneContainer>
      <div className="absolute inset-x-0 top-[40%] flex flex-col items-center justify-center gap-2">
        <CircularProgressBar
          strokeWidth={7}
          sqSize={100}
          percentage={progress ? progress : 0}
          preload={!progress && true}
        />
      </div>
    </SceneContainer>
  );
};
export default CandleStickLoader;
