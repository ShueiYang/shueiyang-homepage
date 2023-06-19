import SceneContainer from './SceneContainer'


const CandleStickLoader = () => {
  
    return (
        <SceneContainer>
            <div className="spinner top-[40%] mx-auto flex justify-center items-center"></div>
            <div className="absolute left-0 right-0 w-[4.6rem] h-[4.6rem] top-[40%] mx-auto flex justify-center items-center text-xs">
                Loading
            </div>
        </SceneContainer>
  )
}
export default CandleStickLoader;        