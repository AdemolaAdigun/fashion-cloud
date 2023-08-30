import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

/** Connect to MongoDB */
export async function connectToDatabase(uri: string): Promise<void> {
    try {
        await mongoose.connect(uri);
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw error;
    }
}
