import dotenv from 'dotenv';
import config from "@config";

const OLD_ENV = process.env;
describe("Unit test suite for config", () => {
  afterEach(() => {
    process.env = OLD_ENV;
  });
  test("Should get the correct environment values from test environment", () => {
    expect(config.ENVIRONMENT).toEqual(process.env.NODE_ENV);
    expect(config.PORT).toEqual(process.env.PORT);
    expect(config.API_VERSION).toEqual(process.env.API_VERSION);
    expect(config.WEBHOOK_VERIFY_TOKEN).toEqual(
      process.env.WEBHOOK_VERIFY_TOKEN
    );
    expect(config.API_TOKEN).toEqual(process.env.API_TOKEN);
    expect(config.BUSINESS_PHONE).toEqual(process.env.BUSINESS_PHONE);
  });
});
