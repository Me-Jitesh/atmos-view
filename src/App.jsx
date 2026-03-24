import { BrowserRouter, Routes, Route } from "react-router-dom";
import CurrentWeather from "./pages/CurrentWeather";
import Historical from "./pages/Historical";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CurrentWeather />} />
        <Route path="/historical" element={<Historical />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
