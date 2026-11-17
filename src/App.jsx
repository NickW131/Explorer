import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Details from "./pages/Details.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Manage from "./pages/Manage.jsx";
import Submission from "./pages/Submission.jsx";
import Confirmation from "./pages/Confirmation.jsx";
import ReviewSubmission from "./pages/ReviewSubmission.jsx";
import Submissions from "./pages/Submissions.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/websites/:id" element={<Details />} />
        <Route path="/login" element={<Login />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/submit" element={<Submission />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage/:id"
          element={
            <ProtectedRoute>
              <Manage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/submissions"
          element={
            <ProtectedRoute>
              <Submissions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/submissions/:id/review"
          element={
            <ProtectedRoute>
              <ReviewSubmission />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
