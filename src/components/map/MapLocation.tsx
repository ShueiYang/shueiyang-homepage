import "leaflet/dist/leaflet.css";
import { renderToString } from "react-dom/server";
import Image from "next/image";

import { motion } from "framer-motion";
import { slideIn } from "@/utils/motion";
import { divIcon, LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const markerIcon = divIcon({
  html: renderToString(
    <Image
      src={"/icons/map-pin.svg"}
      width={24}
      height={24}
      alt="chevron-rightIcon"
    />,
  ),
  iconSize: [56, 56],
  iconAnchor: [28, 56],
  popupAnchor: [0, -56],
  className: "map-pin",
});

const MapLocation = () => {
  const position = [48.88222815673669, 2.489167667846882] as LatLngExpression;

  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={slideIn("right", "tween", 0.2)}
      className="relative w-full max-w-lg p-2 lg:max-w-xl lg:flex-[0.55] lg:p-4"
    >
      <div className="absolute right-[10%] top-[10%] z-10 w-[50%] max-w-[190px] bg-[#FFFFFF] p-1.5 text-xs tracking-tight text-zinc-900 sm:w-[40%] sm:p-3 sm:text-sm">
        Kim Nguyen <br />
        3 Allée Paul Langevin <br />
        93110 Rosny sous Bois <br />
        <span className="mt-1 block">yangshuei83@gmail.com</span>
      </div>

      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        className="z-0 h-[50vh] lg:h-[70vh]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={markerIcon}>
          <Popup>
            Je suis ici... <br /> {`en train de boire un café :)`}
          </Popup>
        </Marker>
      </MapContainer>
    </motion.div>
  );
};

export default MapLocation;
