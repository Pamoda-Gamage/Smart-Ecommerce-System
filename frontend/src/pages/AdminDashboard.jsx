import React, { useState } from "react";
import TicketsTable from "../components/admin/TicketsTable";
import UserTable from "../components/admin/UserTable";

const AdminDashboard = () => {
  const [activeItemKey, setActiveItemKey] = useState("dashboard");

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          backgroundColor: "#343a40",
          color: "white",
          padding: "20px",
        }}
      >
        <h4 className="text-center">Admin Panel</h4>
        <ul className="nav flex-column mt-4">
          <li className="nav-item">
            <a
              href="#"
              className={`nav-link ${
                activeItemKey === "dashboard" ? "text-warning" : "text-light"
              }`}
              onClick={() => setActiveItemKey("dashboard")}
            >
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#"
              className={`nav-link ${
                activeItemKey === "userManagement"
                  ? "text-warning"
                  : "text-light"
              }`}
              onClick={() => setActiveItemKey("userManagement")}
            >
              User Management
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#"
              className={`nav-link ${
                activeItemKey === "ticketManagement"
                  ? "text-warning"
                  : "text-light"
              }`}
              onClick={() => setActiveItemKey("ticketManagement")}
            >
              Ticket Management
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        {activeItemKey === "dashboard" && <div>Dashboard</div>}
        {activeItemKey === "ticketManagement" && <TicketsTable />}
        {activeItemKey === "userManagement" && <UserTable />}
      </div>
    </div>
  );
};

export default AdminDashboard;
