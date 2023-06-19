import "leaflet/dist/leaflet.css"
import { renderToString } from 'react-dom/server'
import Image from "next/image";

import { motion } from "framer-motion"
import { slideIn } from "@/utils/motion"
import { divIcon, LatLngExpression } from "leaflet"
import { MapContainer, TileLayer, Marker, Popup  } from 'react-leaflet'


const markerIcon = divIcon({
    html: renderToString(
        <Image 
            className=""
            src={"/icons/map-pin.svg"}
            width={24}
            height={24}
            alt="chevron-rightIcon"
        />
    ),
    iconSize: [56, 56],
    iconAnchor: [28, 56],
    popupAnchor: [0, -56],
    className: 'map-pin'
})


const MapLocation = () => {

    const position = [48.88222815673669, 2.489167667846882] as LatLngExpression

    return (
    
        <motion.div
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={slideIn("right", "tween", 0.2)}
            className="relative max-w-lg w-full lg:max-w-xl lg:flex-[0.55] p-4"
        >
            <div className="absolute bg-[#FFFFFF] z-10 top-[10%] right-[10%] w-[50%] max-w-[190px] sm:w-[40%] p-1.5 sm:p-3 text-xs sm:text-sm text-zinc-900 tracking-tight">
                Kim Nguyen <br />
                3 Allée Paul Langevin <br /> 
                93110 Rosny sous Bois <br />
              <span className="mt-1 block">yangshuei83@gmail.com</span>
            </div>

            <MapContainer 
                center={position} 
                zoom={13}
                scrollWheelZoom={false}
                className="h-[50vh] lg:h-[70vh] z-0"
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
    )
}

export default MapLocation;