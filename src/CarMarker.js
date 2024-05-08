import { useEffect, useState } from "react";
// import { Polyline, Circle } from "react-leaflet";
import { LeafletTrackingMarker } from "./LeafletTrackingMarker";
import { useMap } from "react-leaflet";
import "./leaflet.motion.js";
// import "leaflet.motion/dist/leaflet.motion";
import L from "leaflet";
import { Popup } from "react-leaflet";
import carIcon from "./carIcon.png";

const icon = L.icon({
  iconSize: [35, 20],
  // iconSize: [20, 35],
  popupAnchor: [2, -20],
  iconUrl: carIcon,
});

export default function CarMarker({ data, speed, geoPointsList, isMoveing }) {
  const mapContext = useMap();

  const { lattitude, longitude } = data;

  const [prevPos, setPrevPos] = useState([lattitude, longitude]);

  useEffect(() => {
    // console.log([prevPos, [lattitude, longitude]]);
    let instance;
    if (geoPointsList.length >= 2) {
      instance = L.motion.polyline(
        // [prevPos, [lattitude, longitude]],
        [
          [
            geoPointsList[geoPointsList.length - 2][0],
            geoPointsList[geoPointsList.length - 2][1],
          ],
          [
            geoPointsList[geoPointsList.length - 1][0],
            geoPointsList[geoPointsList.length - 1][1],
          ],
        ],
        {
          color: "red",
          // fillColor: "red",
          opacity: 1, // Set the color option for the polygon
        },

        {
          auto: true,
          duration: speed,
        }
      );

      mapContext.addLayer(instance);
    }

    // console.log({ geoPointsList }, geoPointsList.length <= 2);

    // if (geoPointsList.length <= 2) {
    //   mapContext.removeLayer(instance);
    // }

    // if (isMoveing) {
    // setTimeout(() => {
    //   console.log({ isMoveing });
    //   if (isMoveing) {
    //     console.log("removeLayer");
    //     mapContext.removeLayer(instance);
    //   } else {
    //     console.log("dontRemoveLayer");
    //     mapContext.addLayer(instance);
    //   }
    // }, speed);
    // }
    if (prevPos[1] !== longitude && prevPos[0] !== lattitude) {
      setPrevPos([lattitude, longitude]);
    }

    return () => {
      setTimeout(() => {
        if (instance) {
          mapContext.removeLayer(instance);
        }
      }, speed);
    };
  }, [
    lattitude,
    longitude,
    prevPos,
    mapContext,
    speed,
    geoPointsList,
    isMoveing,
  ]);

  return (
    <>
      <LeafletTrackingMarker
        icon={icon}
        // position={[lattitude, longitude]}
        // previousPosition={prevPos}
        position={[
          geoPointsList[geoPointsList.length - 1][0],
          geoPointsList[geoPointsList.length - 1][1],
        ]}
        previousPosition={[
          geoPointsList[geoPointsList.length - 2][0],
          geoPointsList[geoPointsList.length - 2][1],
        ]}
        duration={speed}
        keepAtCenter={true} // true
      >
        <Popup>{"Time: " + data.time.split(" ")[1]}</Popup>
      </LeafletTrackingMarker>
    </>
  );
}
