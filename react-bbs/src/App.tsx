import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header/header";
import Home from "./components/home/home";
import NewThred from "./components/newThred/newThred";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/thred/new" element={<NewThred />} />
      </Routes>
    </div>
  );
}

export default App;
