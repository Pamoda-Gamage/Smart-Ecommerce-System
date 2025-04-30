import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";
import {
  getAllTickets,
  deleteTicketById,
  updateTicketById,
} from "../../api/ticketService";

const TicketsTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const response = await getAllTickets();
        setTickets(response);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch tickets. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setLoading(true);
    setError("");
    try {
      await updateTicketById(id, { status: newStatus });
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === id ? { ...ticket, status: newStatus } : ticket
        )
      );
    } catch (error) {
      console.error(error);
      setError("Failed to update ticket status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTicket = async (id) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      setLoading(true);
      setError("");
      try {
        await deleteTicketById(id);
        setTickets((prevTickets) =>
          prevTickets.filter((ticket) => ticket._id !== id)
        );
      } catch (error) {
        console.error(error);
        setError("Failed to delete ticket. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Tickets Report", 10, 10);
    const tableData = filteredTickets.map((ticket) => [
      ticket.title,
      ticket.issue,
      ticket.status,
      ticket.ownedBy.firstName + " " + ticket.ownedBy.lastName,
      ticket.ownedBy.email,
      new Date(ticket.createdAt).toLocaleString(),
    ]);
    autoTable(doc, {
      head: [["Title", "Issue", "Status", "Owner", "Email", "Created At"]],
      body: tableData,
    });
    doc.save("tickets_report.pdf");
  };

  const filteredTickets = tickets.filter((ticket) => {
    const ownerName =
      `${ticket.ownedBy.firstName} ${ticket.ownedBy.lastName}`.toLowerCase();
    const ownerEmail = ticket.ownedBy.email.toLowerCase();
    return (
      ownerName.includes(searchQuery.toLowerCase()) ||
      ownerEmail.includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Tickets</h2>
      {error && (
        <div style={{ color: "red", textAlign: "center" }}>{error}</div>
      )}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Search by owner name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "8px",
            flex: "1",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          onClick={generatePDF}
          style={{
            padding: "8px 15px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Generate PDF
        </button>
      </div>
      {loading ? (
        <div style={{ textAlign: "center" }}>Loading...</div>
      ) : filteredTickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#007bff", color: "white" }}>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Title
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Issue
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Status
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Owner
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Email
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Created At
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map((ticket) => (
              <tr key={ticket._id}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {ticket.title}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {ticket.issue}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  <select
                    value={ticket.status}
                    onChange={(e) =>
                      handleStatusChange(ticket._id, e.target.value)
                    }
                    style={{
                      padding: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {ticket.ownedBy.firstName} {ticket.ownedBy.lastName}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {ticket.ownedBy.email}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {new Date(ticket.createdAt).toLocaleString()}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  <button
                    onClick={() => handleDeleteTicket(ticket._id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                    }}
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

export default TicketsTable;
