
const okResponse = (res, data, message) => {
  return res.status(200).json({success: true, data, message});
}

const badRequest = (res, message) => {
  return res.status(400).json({success: false, message}); //bad request - 400
}

const unauthorizedAccess = (res, message) => {
  return res.status(401).json({success: false, message});
}

const serverError = (res, message) => {
  return res.status(500).json({success: false, message});
}

const notFound = (res, message) => {
  return res.status(404).json({success: false, message});
}
export {
  okResponse,
  badRequest,
  unauthorizedAccess,
  serverError,
  notFound
}