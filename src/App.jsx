import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import AddPet from "./AddPet";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="main-container">
        <h1>🐾 Pet Store</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/add-pet">Add Pet</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-pet" element={<AddPet />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
