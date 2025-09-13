import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import UserPortal from "./pages/UserPortal";
import OwnerPortal from "./pages/OwnerPortal";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route -> Login */}
        <Route path="/" element={<Login />} />

        {/* User portal */}
        <Route path="/user" element={<UserPortal />} />

        {/* Owner portal */}
        <Route path="/owner" element={<OwnerPortal />} />

        {/* Catch-all redirect to Login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
