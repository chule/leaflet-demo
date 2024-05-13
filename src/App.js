import MapCar from "./MapCar";
import data from "./data.json";

export default function App() {
  return (
    <div style={{ height: "100vh" }}>
      <MapCar data={data} />
    </div>
  );
}
