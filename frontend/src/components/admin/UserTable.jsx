import React, { useState, useEffect } from "react";
import { getAllUsers, deleteUserById } from "../../api/userService";
import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setLoading(true);
      try {
        await deleteUserById(id);
        setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        console.error(error);
        setError("Failed to delete user.");
      } finally {
        setLoading(false);
      }
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("User Report", 10, 10);

    const tableData = filteredUsers.map((user) => [
      user.firstName,
      user.lastName,
      user.email,
      user.role,
    ]);

    autoTable(doc, {
      head: [["First Name", "Last Name", "Email", "Role"]],
      body: tableData,
    });

    doc.save("users_report.pdf");
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-3">User Management</h2>
      {error && <p className="text-danger">{error}</p>}

      <div className="d-flex mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn btn-primary ms-2" onClick={generatePDF}>
          Generate PDF Report
        </button>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserTable;
