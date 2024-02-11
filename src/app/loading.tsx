import { ModalSection } from "@/components/layouts/Section";

const Loader = () => {
  return (
    <ModalSection>
      <div className="mt-[12%] text-center font-ibm text-xl">
        <h3 className="m-12 font-semibold">En chargement</h3>
        <div className="bouncer flex justify-center gap-2">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </ModalSection>
  );
};

export default Loader;
