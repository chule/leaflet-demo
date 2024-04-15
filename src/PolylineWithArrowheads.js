import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-arrowheads";
// import { ArrowheadOptions } from "leaflet-arrowheads";



export const PolylineWithArrowheads = ({
  arrowheads,
  positions,
  ...props
}) => {
  const map = useMap();

  useEffect(() => {
    const polyline = L.polyline(positions, props);
    if (arrowheads) polyline.arrowheads(arrowheads === true ? {} : arrowheads);
    polyline.addTo(map);
  }, []);

  return null;
};
