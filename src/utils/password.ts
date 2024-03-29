import { hash, compare } from 'bcryptjs';

export const hashPassword = async (password) => {
  const hashPassword = await hash(password, 12);
  return hashPassword;
};

export const comparePassword = (loginPassword, userPaswword) => {
  const comparePassword = compare(loginPassword, userPaswword);
  return comparePassword;
};
