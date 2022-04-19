import mongoose, { Schema, Document } from 'mongoose'

export interface Feature extends Document {
    id: number
    type: string,
    geometry: {
        type: string,
        coordinates: Array<number>,
    },
    properties: {
        name: string,
        postalCode: string,
        tel: string,
        location: string;
    }

}

const FeatureSchema: Schema = new Schema({
    id: { type: Number, unique: true, required: true },
    type: { type: String, required: true },
    geometry: {
        type: { type: String, required: true },
        coordinates: { type: Array, required: true }
    },
    properties: {
        name: { type: String, required: true },
        postalCode: { type: String, required: true },
        tel: { type: String, required: true },
        location: { type: String, required: true }
    }
})

// * Export the model and return the interface
export default mongoose.model<Feature>('Feature', FeatureSchema);