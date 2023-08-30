const SERVICE_PORT: number = parseInt(process.env.SERVICE_PORT) || 8000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/';
const FASHION_CLOUD_DB = process.env.FASHION_CLOUD_DB || 'fashioncloud-assignment';

export default {
    SERVICE_PORT,
    MONGO_URL,
    FASHION_CLOUD_DB
}
