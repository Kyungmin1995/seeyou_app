export const validateEmail = (e: string) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(e);
};

export const validatePassword = (e: string) => {
  if (e.length > 5) return true;
  const regex = /^[0-9]{5}$/;

  return regex.test(e);
};
