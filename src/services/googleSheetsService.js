import path from "path";
import { google } from "googleapis";
import config from "@config";

const sheets = google.sheets("v4");

async function addRowToSheet(auth, spreadsheetId, values) {
  const request = {
    spreadsheetId,
    range: "books",
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    resource: {
      values: [values]
    },
    auth,
  };

  try {
    const response = (await sheets.spreadsheets.values.append(request).data);
    return response;
  } catch (error) {
    console.error(error);
  }
}

const appendToSheet = async (data) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(
        process.cwd(),
        "src/credentials",
        "google_service_account.json"
      ),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const authClient = await auth.getClient();
    const spreadsheetId = config.GOOGLE_SPREAD_SHEET_ID;

    await addRowToSheet(authClient, spreadsheetId, data);

    return "Data added successfully";
  } catch (error) {
    console.error(error);
  }
};

export default {
  appendToSheet,
};
