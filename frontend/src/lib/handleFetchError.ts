export const handleFetchError = (data: {
  error: string | { field: string; message: string }[];
}) => {
  if (data.error) {
    if (typeof data.error === "string") {
      return data.error;
    }
    const errors: { field: string; message: string }[] = data.error;
    const errorMessages = errors.map((error) => error.message).join("---");
    return errorMessages;
  }
};
