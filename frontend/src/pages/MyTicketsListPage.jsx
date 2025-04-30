import React, { useState, useEffect } from "react";
import { getAllTickets, deleteTicketById } from "../api/ticketService";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";

const MyTicketsListPage = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch tickets on component mount
  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await getAllTickets();
        const userTickets = response.filter(
          (ticket) => ticket.ownedBy._id === userId
        );
        setTickets(userTickets);
      } catch (error) {
        setError("Failed to fetch tickets. Please try again.");
        console.error("Fetch tickets error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [userId]);

  // Handle delete ticket
  const handleDeleteTicket = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this ticket? This action cannot be undone."
      )
    ) {
      try {
        await deleteTicketById(id);
        setTickets(tickets.filter((ticket) => ticket._id !== id));
        alert("Ticket deleted successfully!");
      } catch (error) {
        setError("Failed to delete ticket. Please try again.");
        console.error("Delete ticket error:", error);
      }
    }
  };

  // Handle edit ticket
  const handleEditTicket = (id) => {
    navigate(`/edit-ticket/${id}`);
  };

  // Handle create ticket
  const handleCreateTicket = () => {
    navigate("/create-ticket");
  };

  // Handle PDF generation
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("My Tickets Report", 14, 10);
    autoTable(doc, {
      head: [["Title", "Status", "Created At"]],
      body: filteredTickets.map((ticket) => [
        ticket.title,
        ticket.status,
        new Date(ticket.createdAt).toLocaleString(),
      ]),
    });
    doc.save("my_tickets.pdf");
  };

  // Search filter
  const filteredTickets = tickets.filter((ticket) =>
    ticket.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Tickets</h2>
        <button className="btn btn-primary" onClick={handleCreateTicket}>
          Create Ticket
        </button>
      </div>

      {/* Search Input */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search tickets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {error && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => setError("")}
            aria-label="Close"
          ></button>
        </div>
      )}

      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : filteredTickets.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No matching tickets found.
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket) => (
                  <tr key={ticket._id}>
                    <td>{ticket.title}</td>
                    <td>
                      <span
                        className={`badge ${
                          ticket.status === "Open"
                            ? "bg-success"
                            : ticket.status === "In Progress"
                            ? "bg-warning"
                            : ticket.status === "Closed"
                            ? "bg-secondary"
                            : "bg-info"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </td>
                    <td>{new Date(ticket.createdAt).toLocaleString()}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEditTicket(ticket._id)}
                      >
                        <i className="bi bi-pencil-square"></i> Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteTicket(ticket._id)}
                      >
                        <i className="bi bi-trash"></i> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Download PDF Button */}
          <div className="mt-3 text-end">
            <button className="btn btn-secondary" onClick={generatePDF}>
              <i className="bi bi-file-earmark-pdf"></i> Download PDF
            </button>
          </div>

          {/* Ticket count */}
          <div className="mt-2 text-end">
            <small className="text-muted">
              Showing {filteredTickets.length} ticket(s)
            </small>
          </div>
        </>
      )}
    </div>
  );
};

export default MyTicketsListPage;
