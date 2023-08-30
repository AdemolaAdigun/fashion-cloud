import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IProduct extends Document {
        gtin: number;
        name: string;
        image: string;
        brand: string;
        category: string;
        color: string;
        stock: number;
        price: number;
}

const ProductSchema: Schema = new Schema(
    {
            gtin: { type: Number, unique: true, required: true },
            name: { type: String, required: true },
            image: { type: String, validate: { validator: value => /https?:\/\/.+/i.test(value), message: 'Invalid URL' } },
            brand: { type: String, required: true },
            category: { type: String, required: true },
            color: { type: String, required: true },
            stock: { type: Number, required: true, min: 0 }, // Assuming stock cannot be negative
            price: { type: Number, required: true, min: 0 }  // Assuming price cannot be negative
    },
    { timestamps: true }
);

const Product: Model<IProduct> = mongoose.model<IProduct>('products', ProductSchema);

export default Product;
