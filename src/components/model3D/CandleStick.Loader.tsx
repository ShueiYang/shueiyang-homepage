import CircularProgressBar from "../CircularLoader";
import SceneContainer from "./SceneContainer";

export default function CandleStickLoader({
  progress,
}: Readonly<{ progress?: number }>) {
  return (
    <SceneContainer>
      <div className="absolute inset-x-0 top-[40%] flex flex-col items-center justify-center gap-2">
        <CircularProgressBar
          strokeWidth={7}
          sqSize={100}
          percentage={progress ?? 0}
          preload={!progress}
        />
      </div>
    </SceneContainer>
  );
}
