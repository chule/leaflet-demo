import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import CarMarker from "./CarMarker";
import getDistance from "./helpers/getDistance";
import mToKm from "./helpers/mToKm";
import timeDifference from "./helpers/timeDifference";
import "leaflet/dist/leaflet.css";
import "./styles.css";

const speedData = ["1x", "2x", "4x", "8x", "16x"];

// let cursor = 0;
export default function App({ data }) {
  const [isMoveing, setIsMoveing] = useState(true);
  const [currentTrack, setCurrentTrack] = useState({});
  const [geoPointsList, setGeoPointsList] = useState(null);
  const [speed, setSpeed] = useState(1000);
  const [selectedSpeedControl, setSelectedSpeedControl] = useState("1x");
  const [carSpeed, setCarSpeed] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);
  const [timeDifferenceValue, setTimeDifferenceValue] = useState("00:00:00");

  let cursorRef = useRef(0);
  let intervalRef = useRef(null);

  const geopoints = data.list;

  useEffect(() => {
    const temp = geopoints.map((d) => {
      return [d.lattitude, d.longitude];
    });

    if (isMoveing) {
      setCurrentTrack(geopoints[cursorRef.current]);

      intervalRef.current = setInterval(() => {
        if (cursorRef.current === geopoints.length - 1) {
          cursorRef.current = 0;
          setCurrentTrack(geopoints[geopoints.length - 1]);
          clearInterval(intervalRef.current);
          return;
        }

        if (cursorRef.current === 0) {
          setTotalDistance(0);
        }

        cursorRef.current += 1;

        if (cursorRef.current > 1) {
          setTotalDistance(
            (oldDistance) =>
              getDistance(
                [
                  geopoints[cursorRef.current - 1].lattitude,
                  geopoints[cursorRef.current - 1].longitude,
                ],
                [
                  geopoints[cursorRef.current].lattitude,
                  geopoints[cursorRef.current].longitude,
                ]
              ) + oldDistance
          );

          setTimeDifferenceValue(
            timeDifference(
              geopoints[0].time.split(" ")[1],
              geopoints[cursorRef.current].time.split(" ")[1]
            )
          );
        }

        setCarSpeed(geopoints[cursorRef.current].speed);
        setGeoPointsList(temp.slice(0, cursorRef.current)); // set track // +1
        setCurrentTrack(geopoints[cursorRef.current]);
      }, speed);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [geopoints, speed, isMoveing]);

  return (
  
      <MapContainer
        style={{ height: "100%", minHeight: "100%" }}
        center={[geopoints[0].lattitude, geopoints[0].longitude]}
        zoom={17}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geoPointsList && geoPointsList.length >= 2 ? (
          <>
            <Polyline positions={geoPointsList.slice(0, -1)} color="red" />
            <CarMarker
              data={currentTrack ?? {}}
              speed={speed}
              isMoveing={isMoveing}
              geoPointsList={geoPointsList}
            />
          </>
        ) : null}
        {/*  controlls */}
        <div className="leaflet-top leaflet-right">
          <div className="leaflet-control leaflet-bar top-right">
            <div className="play-pause-restart">
              {isMoveing ? (
                <button
                  onClick={() => {
                    setIsMoveing(false);
                    clearInterval(intervalRef.current);
                  }}
                >
                  Pause
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsMoveing(true);
                  }}
                >
                  Play
                </button>
              )}

              <button
                onClick={() => {
                  setIsMoveing(false);
                  setSpeed(1000);
                  setSelectedSpeedControl("1x");

                  cursorRef.current = 0;
                  clearInterval(intervalRef.current);

                  setCurrentTrack(geopoints[0]);
                  setGeoPointsList(null);

                  setIsMoveing(true);
                }}
              >
                Restart
              </button>
            </div>

            <div>
              <div className="title">SPEED CONTROLL</div>
              <div className="speed-control-wrap"> </div>
              {speedData.map((speed) => {
                return (
                  <span
                    key={speed}
                    className={
                      selectedSpeedControl === speed
                        ? "speed-control speed-control-selected"
                        : "speed-control"
                    }
                    onClick={() => {
                      setSpeed(1000 / +speed.split("x")[0]);
                      setSelectedSpeedControl(speed);
                    }}
                  >
                    {speed}
                  </span>
                );
              })}
            </div>

            <div className="car-info">
              <div className="title">CAR SPEED</div>
              <div>{carSpeed === 1 ? 0 : Math.round(carSpeed)} km/h</div>
              <div className="title">TOTAL DISTANCE</div>
              <div>{mToKm(totalDistance) + " km"}</div>
              <div className="title">TIME</div>
              <div>
                {currentTrack.time ? currentTrack.time.split(" ")[1] : null}
              </div>
              <div className="title">Total time of the trip</div>
              <div>{timeDifferenceValue}</div>
            </div>
          </div>
        </div>
      </MapContainer>

  );
}
