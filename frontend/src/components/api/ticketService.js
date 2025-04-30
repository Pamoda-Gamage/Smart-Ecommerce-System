import axiosInstance from "./axiosConfig";

// Create a new ticket
export const createTicket = async (ticketData) => {
  try {
    const response = await axiosInstance.post("/tickets", ticketData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get all tickets
export const getAllTickets = async () => {
  try {
    const response = await axiosInstance.get("/tickets");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get ticket by ID
export const getTicketById = async (id) => {
  try {
    const response = await axiosInstance.get(`/tickets/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update ticket by ID
export const updateTicketById = async (id, updateData) => {
  try {
    const response = await axiosInstance.put(`/tickets/${id}`, updateData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete ticket by ID
export const deleteTicketById = async (id) => {
  try {
    const response = await axiosInstance.delete(`/tickets/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
