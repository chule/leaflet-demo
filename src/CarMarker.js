import { useEffect, useState } from "react";
// import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";
import { LeafletTrackingMarker } from "./LeafletTrackingMarker";
import L from "leaflet";


const icon = L.icon({
  iconSize: [35, 20],
  popupAnchor: [2, -20],
  iconUrl:
    "https://www.pngkit.com/png/full/54-544296_red-top-view-clip-art-at-clker-cartoon.png",
});

export default function AirplaneMarker({ data }) {

  const { lattitude, longitude } = data;
  const [prevPos, setPrevPos] = useState([lattitude, longitude]);

  useEffect(() => {
    if (prevPos[1] !== longitude && prevPos[0] !== lattitude)
      setPrevPos([lattitude, longitude]);
  }, [lattitude, longitude, prevPos]);

  return (
    <>
      <LeafletTrackingMarker
        icon={icon}
        position={[lattitude, longitude]}
        previousPosition={prevPos}
        duration={1000}
        keepAtCenter={true}
      ></LeafletTrackingMarker>
    </>
  );
}
