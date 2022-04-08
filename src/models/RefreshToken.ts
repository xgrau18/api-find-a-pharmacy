import mongoose, { Schema, Document } from 'mongoose';

export interface RefreshToken extends Document {
    token: string,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
    expiryDate: Date
}

const RefreshTokenSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true},
    user: { type: JSON, required: true},
    expiryDate: { type: Date, required: true}
})

// * Export the model and return the interface
export default mongoose.model<RefreshToken>('RefreshToken', RefreshTokenSchema);

