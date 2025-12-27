import { useEffect, useMemo, useState } from "react";
import CourseForm from "../components/CourseForm.jsx";
import CourseCard from "../components/CourseCard.jsx";
import { addCourse, deleteCourse, getAllCourses, updateCourse } from "../api/courseApi.js";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [editingCourse, setEditingCourse] = useState(null);
  const [query, setQuery] = useState("");

  async function loadCourses() {
    setLoadingList(true);
    setError("");
    try {
      const data = await getAllCourses();
      setCourses(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || "Failed to load courses");
    } finally {
      setLoadingList(false);
    }
  }

  useEffect(() => {
    loadCourses();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return courses;

    return courses.filter((c) => {
      const name = (c.courseName || "").toLowerCase();
      const desc = (c.courseDescription || "").toLowerCase();
      const tags = (c.tags || "").toLowerCase();
      return name.includes(q) || desc.includes(q) || tags.includes(q);
    });
  }, [courses, query]);

  async function handleAdd(payload) {
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      await addCourse(payload);
      setSuccess("Course added successfully.");
      await loadCourses();
    } catch (e) {
      setError(e.message || "Failed to add course");
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdate(payload) {
    if (!editingCourse) return;

    setSaving(true);
    setError("");
    setSuccess("");
    try {
      await updateCourse(editingCourse.courseId, payload);
      setEditingCourse(null);
      setSuccess("Course updated successfully.");
      await loadCourses();
    } catch (e) {
      setError(e.message || "Failed to update course");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(course) {
    const ok = window.confirm(`Are you sure you want to delete "${course.courseName}"?`);
    if (!ok) return;

    setError("");
    setSuccess("");
    try {
      await deleteCourse(course.courseId);
      setSuccess("Course deleted successfully.");
      await loadCourses();
    } catch (e) {
      setError(e.message || "Failed to delete course");
    }
  }

  return (
    <div className="container">
      <header className="header">
        <h1 style={{ margin: 0 }}>Course Store</h1>
        <p className="muted" style={{ margin: 0 }}>
          Home loads from <code>GET /courses/allCourses</code> • Add uses <code>POST /courses/</code> • Update/Delete on each course card.
        </p>
      </header>

      <div className="grid">
        <section style={{ display: "grid", gap: 12 }}>
          <CourseForm
            mode={editingCourse ? "edit" : "add"}
            initialCourse={editingCourse}
            onSubmit={editingCourse ? handleUpdate : handleAdd}
            onCancel={editingCourse ? () => setEditingCourse(null) : null}
            loading={saving}
          />

          <div className="card" style={{ padding: 12, display: "flex", gap: 10 }}>
            <input
              className="input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name/description/tags..."
            />
            <button className="btn" onClick={loadCourses} disabled={loadingList}>
              {loadingList ? "Loading..." : "Refresh"}
            </button>
          </div>

          {error ? <div className="errorBox">{error}</div> : null}
          {success ? <div className="successBox">{success}</div> : null}
        </section>

        <section style={{ minWidth: 0 }}>
          <h2 style={{ marginTop: 0 }}>All Courses</h2>

          {loadingList ? (
            <div>Loading courses...</div>
          ) : filtered.length === 0 ? (
            <div className="muted">No courses found.</div>
          ) : (
            <div style={{ display: "grid", gap: 12 }}>
              {filtered.map((c) => (
                <CourseCard
                  key={c.courseId}
                  course={c}
                  onEditClick={(course) => setEditingCourse(course)}
                  onDeleteClick={handleDelete}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
