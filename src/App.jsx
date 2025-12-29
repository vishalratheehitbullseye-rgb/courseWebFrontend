import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";
import Orders from "./pages/Orders.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/course/:courseId" element={<CourseDetails />} />
      <Route path="/orders/" element={<Orders />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
