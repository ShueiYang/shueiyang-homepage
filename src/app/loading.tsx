import { ModalSection } from "@/components/layouts/Section";


const Loader = () => {
    
  return (
    <ModalSection>
      <div className="font-ibm text-xl text-center mt-[12%]">
        <h3 className="font-semibold m-12">En chargement</h3> 
        <div className="bouncer flex justify-center gap-2">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </ModalSection>
  )
}

export default Loader;