import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'test') {
    dotenv.config({ path: '.env.test' });
} else {
    dotenv.config();
}

const { WEBHOOK_VERIFY_TOKEN, API_TOKEN, PORT, API_VERSION, BUSINESS_PHONE, NODE_ENV, CDN_BASE_URL, GOOGLE_SPREAD_SHEET_ID } = process.env;

export default { WEBHOOK_VERIFY_TOKEN, API_TOKEN, PORT, API_VERSION, BUSINESS_PHONE, ENVIRONMENT: NODE_ENV, CDN_BASE_URL, GOOGLE_SPREAD_SHEET_ID };