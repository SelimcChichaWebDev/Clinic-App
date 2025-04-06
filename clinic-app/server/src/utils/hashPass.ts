import bcrypt from 'bcrypt'

export const hashPass = async (
	password: string,
	salt: number | string
): Promise<string> => await bcrypt.hash(password, salt)
