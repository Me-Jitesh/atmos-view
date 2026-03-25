import { BrowserRouter, Routes, Route } from "react-router-dom";
import CurrentWeather from "./pages/CurrentWeather";
import Historical from "./pages/Historical";
import Landing from "./pages/Landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/current" element={<CurrentWeather />} />
        <Route path="/historical" element={<Historical />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
