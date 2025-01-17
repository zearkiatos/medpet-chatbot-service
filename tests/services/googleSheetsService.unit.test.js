import { google } from "googleapis";
import googleSheetsService from "@services/googleSheetsService";

jest.mock("googleapis", () => {
  let googleAuthCalls = 0;
  let appendMock = ({ resource }) => {
    const [ [ values ] ] = resource.values;
    if (values === 'data')
      return "Data added successfully"
    else
      throw new Error("Error adding data");
  };
  return {
    google: {
      auth: {
        GoogleAuth: jest.fn().mockImplementation(() => {
          if (googleAuthCalls === 2) {
            return {
              getClient: jest.fn().mockRejectedValue(new Error("Error")),
            };
          }
          googleAuthCalls++;
          return {
            getClient: jest.fn().mockResolvedValue("authClient"),
          };
        }),
      },
      sheets: jest.fn().mockImplementation(() => {
        return {
          spreadsheets: {
            values: {
              append: appendMock,
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

  test("Should throw an error when adding data to Google Sheets", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error");

    await googleSheetsService.appendToSheet(["invalid data"]);
    
    expect(consoleErrorSpy).toHaveBeenCalledWith(new Error("Error adding data"));
  });

  test("Should return an error when GoogleAuth has an error", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error");

    await googleSheetsService.appendToSheet("forceError");
    
    expect(consoleErrorSpy).toHaveBeenCalledWith(new Error("Error"));
  });
});
