export const maskedEmail = (email: string) => {
  const [username, domainWithTLD] = email.split("@");
  const [domain, ...tldParts] = domainWithTLD.split(".");
  const maskedUser = username[0] + "***";
  const maskedDomain = domain[0] + "***";
  const tld = tldParts.join(".");
  return `${maskedUser}@${maskedDomain}.${tld}`;
};
