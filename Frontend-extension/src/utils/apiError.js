export const parseApiError = (
  error,
  fallback = "Something went wrong."
) => {
  const data = error.response?.data;

  if (!data) {
    return {
      message: fallback,
      fieldErrors: {},
    };
  }

  const fieldErrors = {};

  if (Array.isArray(data.errors)) {
    for (const issue of data.errors) {
      const field = issue.path?.[0];

      if (!field) continue;

      if (!fieldErrors[field]) {
        fieldErrors[field] = [];
      }

      fieldErrors[field].push(issue.message);
    }
  }

  return {
    message: data.message || fallback,
    fieldErrors,
  };
};