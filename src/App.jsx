import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Pricing from "./pages/Pricing";
import AuthForm from "./pages/AuthForm";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute"; // create this

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/sign" element={<AuthForm />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<Pricing />} />
      </Routes>
    </Router>
  );
}

export default App;
