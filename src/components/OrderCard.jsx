import { Link } from "react-router-dom";

export default function OrderCard({ order}) {
  return (
    <div className="card" style={styles.card}>
      <div style={styles.body}>
        <div style={styles.top}>
          <h3 style={{ margin: 0 }}>{order.Id}</h3>
          <span style={{ fontWeight: 700 }}>{order.amountPaid != null ? `₹${order.amountPaid}` : "—"}</span>
        </div>

        {/* <p className="muted" style={{ margin: 0, fontSize: 13, lineHeight: 1.4 }}>
          {course.courseDescription}
        </p> */}

        <div style={styles.meta}>
            
          <span className="badge">Course: {order.course.courseName}</span>  
          <span className="badge">Course ID: {order.course.courseId}</span>
          <span className="badge">Order ID: {order.orderId}</span>
          <span className="badge">Purchase Date: {order.purchaseDate}</span>
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
