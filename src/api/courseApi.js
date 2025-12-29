const BASE_URL = "http://localhost:8080";

async function parseError(res) {
  // Try to parse JSON error bodies like:
  // { message: "Validation failed", errors: { field: "msg" } }
  // or plain text.
  const contentType = res.headers.get("content-type") || "";
  try {
    if (contentType.includes("application/json")) {
      const data = await res.json();
      // Build a readable message
      if (data?.errors && typeof data.errors === "object") {
        const lines = Object.entries(data.errors).map(([k, v]) => `${k}: ${v}`);
        return lines.join(" | ");
      }
      if (data?.message) return data.message;
      return JSON.stringify(data);
    }
    const text = await res.text();
    return text || "Request failed";
  } catch {
    return "Request failed";
  }
}

async function request(path, options) {
  const res = await fetch(`${BASE_URL}${path}`, options);
  if (!res.ok) {
    const msg = await parseError(res);
    throw new Error(msg);
  }
  // some DELETE endpoints return no content
  if (res.status === 204) return null;
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return res.json();
  return res.text();
}

export function getAllCourses() {
  return request("/courses/allCourses", { method: "GET" });
}

export function getCourseById(courseId) {
  return request(`/courses/${courseId}`, { method: "GET" });
}

export function addCourse(course) {
  return request("/courses/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  });
}

export function updateCourse(courseId, course) {
  return request(`/courses/${courseId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  });
}

export function deleteCourse(courseId) {
  return request(`/courses/${courseId}`, { method: "DELETE" });
}

export function getAllOrders(){
  return request(`/orders/`, { method: "GET" });
}
