import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import CarMarker from "./CarMarker";
import data from "./data.json";

import "./styles.css";

let cursor = 0;
export default function App() {
  const [currentTrack, setCurrentTrack] = useState({});
  const [geoPointsList, setGeoPointsList] = useState(null);
  const [speed, setSpeed] = useState(1000);
  const [selectedSpeedControl, setSelectedSpeedControl] = useState("1x");

  const geopoints = data.list;

  useEffect(() => {
    const temp = geopoints.map((d) => {
      return [d.lattitude, d.longitude];
    });

    setCurrentTrack(geopoints[cursor]);

    const interval = setInterval(() => {
      if (cursor === geopoints.length - 1) {
        cursor = 0;
        setCurrentTrack(geopoints[cursor]);
        return;
      }

      cursor += 1;
      setGeoPointsList(temp.slice(0, cursor)); // set track
      setCurrentTrack(geopoints[cursor]);
    }, speed);

    return () => {
      clearInterval(interval);
    };
  }, [geopoints, speed]);

  return (
    <div>
      <MapContainer
        style={{ height: "100vh" }}
        center={[geopoints[0].lattitude, geopoints[0].longitude]}
        zoom={17}
        minZoom={5}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geoPointsList ? (
          <>
            <Polyline positions={geoPointsList} color="red" />
            <CarMarker data={currentTrack ?? {}} speed={speed} />
          </>
        ) : null}

        <div className="leaflet-top leaflet-right">
          <div className="leaflet-control leaflet-bar top-right">
            <h4>SPEED CONTROLL</h4>
            <span
              // className={
              //   `speed-control ` + selectedSpeedControl === "x1"
              //     ? "speed-control-selected"
              //     : null
              // }
              className={
                selectedSpeedControl === "1x"
                  ? "speed-control speed-control-selected"
                  : "speed-control"
              }
              onClick={() => {
                setSpeed(1000);
                setSelectedSpeedControl("1x");
              }}
            >
              1x
            </span>
            <span
              className={
                selectedSpeedControl === "2x"
                  ? "speed-control speed-control-selected"
                  : "speed-control"
              }
              onClick={() => {
                setSpeed(1000 / 2);
                setSelectedSpeedControl("2x");
              }}
            >
              2x
            </span>
            <span
              className={
                selectedSpeedControl === "4x"
                  ? "speed-control speed-control-selected"
                  : "speed-control"
              }
              onClick={() => {
                setSpeed(1000 / 4);
                setSelectedSpeedControl("4x");
              }}
            >
              4x
            </span>
            <span
              className={
                selectedSpeedControl === "8x"
                  ? "speed-control speed-control-selected"
                  : "speed-control"
              }
              onClick={() => {
                setSpeed(1000 / 8);
                setSelectedSpeedControl("8x");
              }}
            >
              8x
            </span>
            <span
              className={
                selectedSpeedControl === "16x"
                  ? "speed-control speed-control-selected"
                  : "speed-control"
              }
              onClick={() => {
                setSpeed(1000 / 16);
                setSelectedSpeedControl("16x");
              }}
            >
              16x
            </span>
          </div>
        </div>
      </MapContainer>
    </div>
  );
}
