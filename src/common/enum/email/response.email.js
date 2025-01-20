export const responseEmail = {
  success: ({ message = "Success", mail = undefined }) => ({
    status: 200,
    success: true,
    error: false,
    message,
    mail: mail ?? {
      from: '',
      to: '',
      subject: ''
    }
  }),
  error: ({ message = "Error", mail = undefined }) => ({
    status: 500,
    success: false,
    error: true,
    message,
    mail: mail
  })
};