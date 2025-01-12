import { google } from "googleapis";
import googleSheetsService from "@services/googleSheetsService";

jest.mock("googleapis", () => {
  return {
    google: {
      auth: {
        GoogleAuth: jest.fn().mockImplementation(() => {
          return {
            getClient: jest.fn().mockResolvedValue("authClient"),
          };
        }),
      },
      sheets: jest.fn().mockImplementation(() => {
        return {
          spreadsheets: {
            values: {
              append: jest.fn().mockResolvedValue("Data added successfully"),
            },
          },
        };
      }),
    },
  };
});
describe("Google Sheets service unit test suite", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
  test("Should append data to Google Sheets", async () => {
    await googleSheetsService.appendToSheet(["data"]);
    
    expect(google.auth.GoogleAuth).toHaveBeenCalled();
  });
});
