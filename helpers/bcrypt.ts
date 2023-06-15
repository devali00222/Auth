import bcrypt from "bcryptjs";
const saltRound: number = 10;
export const hashPasswordWithBcrypt = (password: string): string => {
  const salt = bcrypt.genSaltSync(saltRound);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};
export const checkIfPasswordIsCorrectWithHash = (
  hashPassword: string,
  plainTextPassword: string
) => {
  const isCorrect = bcrypt.compareSync(plainTextPassword, hashPassword);
  return isCorrect;
};
