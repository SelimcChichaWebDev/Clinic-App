import mongoose, { Document, Schema } from 'mongoose'

export interface IForm extends Document {
	fullName: string
	created_at?: Date | string
	phone: string | number
	problem: string
}

const FormSchema = new Schema<IForm>({
	fullName: { type: String, required: true },
	created_at: { type: Date, default: Date.now },
	phone: { type: String, required: true },
	problem: { type: String, required: true, unique: true },
})

export const FormModel = mongoose.model<IForm>('Form', FormSchema)
