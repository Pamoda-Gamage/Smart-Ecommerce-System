const Ticket = require("./model");

// Create a new ticket
const createTicket = async (ticketData) => {
  const ticket = new Ticket(ticketData);
  return await ticket.save();
};

// Get all tickets
const getAllTickets = async () => {
  return await Ticket.find({}).populate("ownedBy");
};

// Get ticket by ID
const getTicketById = async (id) => {
  return await Ticket.findById(id).populate("ownedBy");
};

// Update ticket by ID
const updateTicketById = async (id, updateData) => {
  return await Ticket.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete ticket by ID
const deleteTicketById = async (id) => {
  return await Ticket.findByIdAndDelete(id);
};

module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicketById,
  deleteTicketById,
};
