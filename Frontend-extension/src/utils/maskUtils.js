export const maskEmail = (email) => {
  const [name, domain] = email.split("@");

  if (!name || !domain) return email;

  return `${name[0],name[1],name[2]}${"*".repeat(Math.max(3, name.length - 1))}@${domain}`;
};