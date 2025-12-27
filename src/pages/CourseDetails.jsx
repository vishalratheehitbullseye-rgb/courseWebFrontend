import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCourseById } from "../api/courseApi.js";

export default function CourseDetails() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await getCourseById(courseId);
        setCourse(data);
      } catch (e) {
        setError(e.message || "Failed to load course");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [courseId]);

  return (
    <div className="container">
      <Link to="/" style={{ textDecoration: "none" }}>← Back</Link>

      <div style={{ height: 12 }} />

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="errorBox">{error}</div>
      ) : !course ? (
        <div className="muted">No course found.</div>
      ) : (
        <div className="card" style={{ padding: 16, display: "grid", gap: 10 }}>
          <h1 style={{ margin: 0 }}>{course.courseName}</h1>
          <div className="muted">
            Course ID: <code>{course.courseId}</code>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span className="badge">Duration: {course.duration ?? "—"}</span>
            <span className="badge">Listed: {course.listedOn ?? "—"}</span>
            <span className="badge">Price: {course.price != null ? `₹${course.price}` : "—"}</span>
            {course.tags ? <span className="badge">Tags: {course.tags}</span> : null}
          </div>

          <div style={{ marginTop: 6, whiteSpace: "pre-wrap", lineHeight: 1.5 }}>
            {course.courseDescription}
          </div>
        </div>
      )}
    </div>
  );
}
