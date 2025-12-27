import { useEffect, useState } from "react";

const todayISO = () => new Date().toISOString().slice(0, 10);

const empty = {
  courseName: "",
  courseDescription: "",
  tags: "",        // backend expects a single String
  duration: 1,     // Integer [1..2000]
  listedOn: todayISO(), // LocalDate (past or present)
  price: 0,        // Double [0..200000]
};

export default function CourseForm({
  initialCourse,
  mode = "add", // "add" | "edit"
  onSubmit,
  onCancel,
  loading,
}) {
  const [course, setCourse] = useState(empty);

  useEffect(() => {
    if (initialCourse) {
      setCourse({
        courseName: initialCourse.courseName ?? "",
        courseDescription: initialCourse.courseDescription ?? "",
        tags: initialCourse.tags ?? "",
        duration: initialCourse.duration ?? 1,
        listedOn: initialCourse.listedOn ?? todayISO(),
        price: initialCourse.price ?? 0,
      });
    } else {
      setCourse({ ...empty, listedOn: todayISO() });
    }
  }, [initialCourse]);

  function handleChange(e) {
    const { name, value, type } = e.target;

    setCourse((prev) => {
      if (type === "number") {
        return { ...prev, [name]: value === "" ? "" : Number(value) };
      }
      return { ...prev, [name]: value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      courseName: course.courseName?.trim(),
      courseDescription: course.courseDescription?.trim(),
      tags: (course.tags ?? "").trim(), // keep as String in DB
      duration: Number(course.duration),
      listedOn: course.listedOn, // "YYYY-MM-DD"
      price: Number(course.price),
    };

    onSubmit(payload);
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{ padding: 16, display: "grid", gap: 12 }}>
      <h2 style={{ margin: 0 }}>{mode === "add" ? "Add Course" : "Edit Course"}</h2>

      <label style={{ display: "grid", gap: 6, fontSize: 14 }}>
        Course Name
        <input
          className="input"
          name="courseName"
          value={course.courseName}
          onChange={handleChange}
          placeholder="e.g., CAT Crash Course"
          required
        />
      </label>

      <label style={{ display: "grid", gap: 6, fontSize: 14 }}>
        Course Description (20–1000 chars)
        <textarea
          className="textarea"
          name="courseDescription"
          value={course.courseDescription}
          onChange={handleChange}
          rows={5}
          placeholder="Write a clear description..."
          required
        />
      </label>

      <label style={{ display: "grid", gap: 6, fontSize: 14 }}>
        Tags (single string)
        <input
          className="input"
          name="tags"
          value={course.tags}
          onChange={handleChange}
          placeholder="e.g., CAT, MBA, Verbal"
        />
      </label>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <label style={{ display: "grid", gap: 6, fontSize: 14 }}>
          Duration (1–2000)
          <input
            className="input"
            name="duration"
            type="number"
            min={1}
            max={2000}
            value={course.duration}
            onChange={handleChange}
            required
          />
        </label>

        <label style={{ display: "grid", gap: 6, fontSize: 14 }}>
          Price (0–200000)
          <input
            className="input"
            name="price"
            type="number"
            min={0}
            max={200000}
            step="0.01"
            value={course.price}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <label style={{ display: "grid", gap: 6, fontSize: 14 }}>
        Listed On (past or present)
        <input
          className="input"
          name="listedOn"
          type="date"
          max={todayISO()}
          value={course.listedOn}
          onChange={handleChange}
          required
        />
      </label>

      <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Saving..." : mode === "add" ? "Add Course" : "Update Course"}
        </button>

        {onCancel && (
          <button className="btn" type="button" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
        )}
      </div>

      <div className="muted" style={{ fontSize: 12, lineHeight: 1.4 }}>
        Backend validation: <code>@NotBlank</code> for name/description, <code>@Size</code> for description, <code>@Min/@Max</code> for duration/price, <code>@PastOrPresent</code> for listedOn.
      </div>
    </form>
  );
}
