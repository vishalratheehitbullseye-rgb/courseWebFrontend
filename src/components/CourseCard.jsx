import { Link } from "react-router-dom";

export default function CourseCard({ course, onEditClick, onDeleteClick }) {
  return (
    <div className="card" style={styles.card}>
      <div style={styles.body}>
        <div style={styles.top}>
          <h3 style={{ margin: 0 }}>{course.courseName}</h3>
          <span style={{ fontWeight: 700 }}>{course.price != null ? `₹${course.price}` : "—"}</span>
        </div>

        <p className="muted" style={{ margin: 0, fontSize: 13, lineHeight: 1.4 }}>
          {course.courseDescription}
        </p>

        <div style={styles.meta}>
          <span className="badge">Duration: {course.duration ?? "—"}</span>
          <span className="badge">Listed: {course.listedOn ?? "—"}</span>
          {course.tags ? <span className="badge">Tags: {course.tags}</span> : null}
          <span className="badge">ID: {course.courseId}</span>
        </div>

        <div style={styles.actions}>
          <Link className="btn" to={`/course/${course.courseId}`}>
            View
          </Link>

          <button className="btn btn-primary" onClick={() => onEditClick(course)}>
            Update
          </button>

          <button className="btn btn-danger" onClick={() => onDeleteClick(course)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    padding: 14,
  },
  body: { display: "grid", gap: 10 },
  top: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 },
  meta: { display: "flex", flexWrap: "wrap", gap: 8 },
  actions: { display: "flex", gap: 10, flexWrap: "wrap" },
};
