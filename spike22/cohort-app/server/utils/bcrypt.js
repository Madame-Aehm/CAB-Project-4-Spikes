import bcrypt from "bcrypt";

export const encryptPassword = async(password) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword
  } catch(error) {
    console.log("Error: ", error);
  }
}