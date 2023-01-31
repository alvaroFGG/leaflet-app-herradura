import S from '../../../settings'
import mongoose from 'mongoose'

export default class ProviderDatabase {
    public static async init() {
        const dbChain = process.env.DB_CHAIN || S.DB_CHAIN;
        await mongoose.connect(dbChain, {});
        console.log('Database connected');
        
    }
}