import CircularProgressBar from '../CircularLoader';
import SceneContainer from './SceneContainer'


const CandleStickLoader = ({progress}: {progress?: number}) => {
  
    return (
        <SceneContainer>
            <div className="absolute inset-x-0 top-[40%] flex flex-col justify-center items-center gap-2">
                <CircularProgressBar 
                  strokeWidth={7}
                  sqSize={100}
                  percentage={progress ? progress : 0}
                />
                <span className="text-sm md:text-base">Loading...</span>
            </div>
            
        </SceneContainer>
  )
}
export default CandleStickLoader;