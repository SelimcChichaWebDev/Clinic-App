import mongoose, { Document } from 'mongoose'

const { Schema } = mongoose

export interface IUserModel extends Document {
	email: string
	password: string
}

const UserSchema = new Schema<IUserModel>({
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true,
	},

	password: {
		type: String,
		required: [true, 'Password is required'],
	},
})

export const UserModel = mongoose.model<IUserModel>('User', UserSchema)
