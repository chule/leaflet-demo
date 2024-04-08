/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";

// leaflet
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "l.movemarker";

// components
import Button from "./Button";

const Map = () => {
  const instanceRef = useRef();

  // state
  const [mapContext, setMapContext] = useState();
  const [hidePolylines, setHidePolylines] = useState(true);
  const [hideMarker, setHideMarker] = useState(false);
  const [animateMarker, setAnimateMarker] = useState(true);
  const [animatePolyline, setAnimatePolyline] = useState(true);
  const [followMarker, setFollowMarker] = useState(false);

  const createMarker = () => {
    instanceRef.current = L.moveMarker(
      [
        [45.7941, 15.957642],
        [45.797691, 16.034203]
      ],
      {
        animate: animatePolyline,
        color: "red",
        weight: 4,
        hidePolylines: hidePolylines,
        duration: 10000,
        removeFirstLines: true,
        maxLengthLines: 3
      },
      {
        animate: animateMarker,
        hideMarker: hideMarker,
        duration: 10000,
        speed: 0,
        followMarker: followMarker,
        rotateMarker: true,
        rotateAngle: 0,
        icon: L.divIcon({
          iconSize: [28, 28],
          className: "position-relative rotate--marker",
          html:
            '<div><img style="width: 28px;margin-top: 10px" src="https://www.pngkit.com/png/full/54-544296_red-top-view-clip-art-at-clker-cartoon.png" /></div>'
        })
      },
      {}
    ).addTo(mapContext);
  };

  const handleMoreLine = (latLng, options) =>
    instanceRef.current.addMoreLine(latLng, options);

  useEffect(() => {
    if (instanceRef.current) instanceRef.current.hidePolylines(hidePolylines);
    if (instanceRef.current)
      instanceRef.current.getMarker().hideMarker(hideMarker);
    if (instanceRef.current)
      instanceRef.current?.getMarker()?.activeAnimate(animateMarker);
    if (instanceRef.current)
      instanceRef.current
        ?.getCurrentPolyline()
        ?.activeAnimate(animatePolyline);
    if (instanceRef.current)
      instanceRef.current?.getMarker()?.activeFollowMarker(followMarker);
  }, [hidePolylines, hideMarker, animateMarker, animatePolyline, followMarker]);

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        width: "100%"
      }}
    >
      {/* panel play */}
      <div
        style={{
          position: "absolute",
          backgroundColor: "white",
          width: "180px",
          zIndex: 99999,
          padding: "14px",
          top: "12px",
          right: "12px"
        }}
      >
        <div style={{ marginBottom: "8px" }}>
          <Button onClick={createMarker}>start</Button>
        </div>

        {/* <div style={{ marginBottom: "8px" }}>
          <Button
            onClick={() =>
              handleMoreLine([-8.794207, 115.206045], {
                rotateAngle: 150,
                animatePolyline: animatePolyline
              })
            }
          >
            add more line 1
          </Button>
        </div>

        <div style={{ marginBottom: "8px" }}>
          <Button
            onClick={() =>
              handleMoreLine([-8.804884, 115.205219], {
                rotateAngle: 94,
                animatePolyline: animatePolyline
              })
            }
          >
            add more line 2
          </Button>
        </div>

        <div style={{ marginBottom: "8px" }}>
          <Button
            onClick={() =>
              handleMoreLine([-8.822512, 115.186803], {
                rotateAngle: 141,
                animatePolyline: animatePolyline
              })
            }
          >
            add more line 3
          </Button>
        </div>

        <div style={{ marginBottom: "8px" }}>
          <Button
            onClick={() =>
              handleMoreLine([-8.783891, 115.187601], {
                rotateAngle: 268,
                animatePolyline: animatePolyline
              })
            }
          >
            add more line 4
          </Button>
        </div>

        <h5>feature marker</h5>
        <div style={{ marginBottom: "8px" }}>
          <Button onClick={() => setFollowMarker(!followMarker)}>
            {followMarker ? "disable" : "enable"} follow marker
          </Button>
        </div>
        <div style={{ marginBottom: "8px" }}>
          <Button onClick={() => setHideMarker(!hideMarker)}>
            {hideMarker ? "show" : "hide"} marker
          </Button>
        </div>
        <div style={{ marginBottom: "8px" }}>
          <Button onClick={() => setAnimateMarker(!animateMarker)}>
            {animateMarker ? "disable" : "enable"} animate marker
          </Button>
        </div>

        <h5>feature polyline</h5>
        <div style={{ marginBottom: "8px" }}>
          <Button onClick={() => setAnimatePolyline(!animatePolyline)}>
            {animatePolyline ? "disable" : "enable"} animate polyline
          </Button>
        </div>
        <div style={{ marginBottom: "8px" }}>
          <Button onClick={() => setHidePolylines(!hidePolylines)}>
            {hidePolylines ? "show" : "hide"} polyline
          </Button>
        </div>

        <h5>feature all</h5>
        <div style={{ marginBottom: "8px" }}>
          <Button onClick={() => instanceRef.current.stop()}>
            stop all animate
          </Button>
        </div> */}
      </div>

      <MapContainer
        style={{ height: "100%", width: "100%" }}
        center={[45.79527,16.0063351]}
        zoom={14}
        scrollWheelZoom={true}
        whenReady={(event) => setMapContext(event.target)}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default Map;
