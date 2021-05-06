module.exports = {
  success: (message, data) => ({
    message,
    data,
    error: false,
  }),
  error: (message) => ({ message, error: true }),
};
