const express = require("express");
const ticketController = require("./controller");

const router = express.Router();

// Ticket routes
router.post("/", ticketController.createTicket);
router.get("/", ticketController.getAllTickets);
router.get("/:id", ticketController.getTicketById);
router.put("/:id", ticketController.updateTicketById);
router.delete("/:id", ticketController.deleteTicketById);

module.exports = router;
