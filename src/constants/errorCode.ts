const errorStatusCode = {
  authErrorCode: {
    AUTH_ERR_CODE_001: "AUTH_ERR_CODE_001", // Generic validation error
    AUTH_ERR_CODE_002: "AUTH_ERR_CODE_002", // Internal server error
    AUTH_ERR_CODE_003: "AUTH_ERR_CODE_003", // Duplicate email
    AUTH_ERR_CODE_004: "AUTH_ERR_CODE_004", // not found
    AUTH_ERR_CODE_005: "AUTH_ERR_CODE_005", // DB fetch error
    AUTH_ERR_CODE_006: "AUTH_ERR_CODE_006", // Invalid Credentials
  },
  userErrorCode: {
    USER_ERR_CODE_001: "USER_ERR_CODE_001", // Generic validation error
    USER_ERR_CODE_002: "USER_ERR_CODE_002", // Internal server error
    USER_ERR_CODE_003: "USER_ERR_CODE_003", // Duplicate email
    USER_ERR_CODE_004: "USER_ERR_CODE_004", // not found
    USER_ERR_CODE_005: "USER_ERR_CODE_005", // DB fetch error
    USER_ERR_CODE_006: "USER_ERR_CODE_006", // Invalid Credentials
    USER_ERR_CODE_007: "USER_ERR_CODE_007", // Unauthorized
    USER_ERR_CODE_008: "USER_ERR_CODE_008", // Profile Avatar update failed
  },
  postErrorCode: {
    POST_ERR_CODE_001: "POST_ERR_CODE_001", // Generic validation error
    POST_ERR_CODE_002: "POST_ERR_CODE_002", // Internal server error
    POST_ERR_CODE_003: "POST_ERR_CODE_003", // Duplicate title
    POST_ERR_CODE_004: "POST_ERR_CODE_004", // not found
    POST_ERR_CODE_005: "POST_ERR_CODE_005", // DB fetch error
    POST_ERR_CODE_006: "POST_ERR_CODE_006", // Invalid Credentials
  },
};

export default errorStatusCode;
