export default function Loader() {
  return (
    <div className="container relative mt-6 md:mt-[10%] xl:max-w-5xl">
      <div className="mt-[12%] text-center font-ibm text-xl">
        <h3 className="m-12 font-semibold">En chargement</h3>
        <div className="bouncer flex justify-center gap-2">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
