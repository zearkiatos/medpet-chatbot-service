import dotenv from 'dotenv';

dotenv.config();

const { WEBHOOK_VERIFY_TOKEN, API_TOKEN, PORT, API_VERSION, BUSINESS_PHONE } = process.env;

export default { WEBHOOK_VERIFY_TOKEN, API_TOKEN, PORT, API_VERSION, BUSINESS_PHONE };