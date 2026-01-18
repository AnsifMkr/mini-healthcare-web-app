# Backend Setup & Credentials

To enable the Google Sheets integration, you must provide valid Google Cloud credentials.

## 1. Google Sheets API Credentials
1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  Create a project or select an existing one.
3.  Enable the **Google Sheets API**.
4.  Create a **Service Account**.
5.  Create a JSON key for the service account and download it.
6.  Rename the file to `credentials.json` and place it in the `backend/` directory.

## 2. Share the Sheet
1.  Create a new Google Sheet.
2.  Share the sheet (Editor access) with the `client_email` found in your `credentials.json`.
3.  Copy the Spreadsheet ID from the URL (e.g., `https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit`).

## 3. Environment Variables
1.  Create a `.env` file in the `backend/` directory (if it doesn't exist).
2.  Add the Spreadsheet ID:
    ```env
    SPREADSHEET_ID=your_spreadsheet_id_here
    ```

## 4. Running the Server
The server is started automatically with `npm run dev`.
If credentials are missing, the server will run in **Mock Mode**, logging data to the console instead of saving to Sheets.
