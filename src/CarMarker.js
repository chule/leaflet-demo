import { useEffect, useState } from "react";
// import { Polyline, Circle } from "react-leaflet";
import { LeafletTrackingMarker } from "./LeafletTrackingMarker";

import L from "leaflet";
import { Popup } from "react-leaflet";
import carIcon from "./carIcon.png";

const icon = L.icon({
  iconSize: [35, 20],
  // iconSize: [20, 35],
  popupAnchor: [2, -20],
  iconUrl: carIcon,
});

export default function CarMarker({ data, speed }) {
  const { lattitude, longitude } = data;
  // rotationAngle
  const [prevPos, setPrevPos] = useState([lattitude, longitude]);

  useEffect(() => {
    if (prevPos[1] !== longitude && prevPos[0] !== lattitude) {
      setPrevPos([lattitude, longitude]);
    }
  }, [lattitude, longitude, prevPos]);


  return (
    <>
      <LeafletTrackingMarker
        // rotationAngle={heading - 90}
        // rotationAngle={heading}
        icon={icon}
        position={[lattitude, longitude]}
        previousPosition={prevPos}
        duration={speed}
        keepAtCenter={true}// true
      >
        <Popup>{"Time: " + data.time.split(" ")[1]}</Popup>
      </LeafletTrackingMarker>
      {/* <Polyline
        positions={[
          [prevPos[0], prevPos[1]],
          [lattitude, longitude],
        ]}
        color="red"
      />
      <Circle
        center={[prevPos[0], prevPos[1]]}
        pathOptions={{ fillColor: "blue" }}
        radius={10}
      />
      <Circle
        center={[lattitude, longitude]}
        pathOptions={{ fillColor: "red" }}
        radius={10}
      /> */}
    </>
  );
}
