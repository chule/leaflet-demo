import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import CarMarker from "./CarMarker";
import data from "./data.json";

import "./styles.css";

let cursor = 0;
export default function App() {
  const [currentTrack, setCurrentTrack] = useState({});
  const [geoPointsList, setGeoPointsList] = useState(null);

  const geopoints = data.list;

  useEffect(() => {
    const temp = geopoints.map((d) => {
      return [d.lattitude, d.longitude];
    });

    setGeoPointsList(temp);

    setCurrentTrack(geopoints[cursor]);

    const interval = setInterval(() => {
      if (cursor === geopoints.length - 1) {
        cursor = 0;
        setCurrentTrack(geopoints[cursor]);
        return;
      }

      cursor += 1;
      setCurrentTrack(geopoints[cursor]);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [geopoints]);

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
            <CarMarker data={currentTrack ?? {}} />
          </>
        ) : null}
      </MapContainer>
    </div>
  );
}
