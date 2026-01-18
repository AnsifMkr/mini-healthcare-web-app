import { google } from 'googleapis';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

// Load credentials from JSON file
// User must place 'credentials.json' in the backend directory
const KEY_FILE_PATH = path.join(__dirname, 'credentials.json');

// Scopes required for writing to Sheets
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// Auth client
const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: SCOPES,
});

export async function appendToSheet(data) {
    try {
        const client = await auth.getClient();
        const sheets = google.sheets({ version: 'v4', auth: client });

        const spreadsheetId = process.env.SPREADSHEET_ID;

        // Prepare values for a new row
        // Columns: Timestamp, Name, Contact, Type, Additional Info
        const resource = {
            values: [
                [
                    new Date().toISOString(),
                    data.name,
                    data.contact,
                    data.type,
                    JSON.stringify(data.details)
                ]
            ],
        };

        // Write all data to the first sheet (Sheet1)
        const range = 'Sheet1!A:E';

        const result = await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: 'USER_ENTERED',
            resource,
        });

        console.log('%d cells updated.', result.data.updates.updatedCells);
        return result.data;

    } catch (err) {
        console.error('Error appending to sheet:', err);
        throw err;
    }
}
