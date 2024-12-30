export const responseAuth = {
  success: ({ message = "Success", data = undefined }) => ({
    status: 200,
    success: true,
    error: false,
    message,
    data
  }),
  error: ({ message = "Error", error = undefined }) => ({
    status: 500,
    success: false,
    error: true,
    message,
    data: error
  })
};