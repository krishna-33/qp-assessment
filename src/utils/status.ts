const statusCodes = {
  SUCCESS: 200,
  RESOURCE_ADDED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  ERROR: 500,
} as const;

type StatusCodes = typeof statusCodes;

export default statusCodes;
