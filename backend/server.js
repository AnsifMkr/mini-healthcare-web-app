import express from 'express';
import cors from 'cors';
import { appendToSheet } from './sheets.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/submit', async (req, res) => {
    try {
        const formData = req.body;
        console.log('Received form data:', formData);

        if (!process.env.SPREADSHEET_ID || process.env.SPREADSHEET_ID === 'your_spreadsheet_id_here') {
            console.warn("SPREADSHEET_ID is missing or still the placeholder. Please update backend/.env");
            res.status(200).json({ success: true, message: 'Data received (Mocked: SPREADSHEET_ID not configured)' });
            return;
        }

        try {
            await appendToSheet(formData);
            res.status(200).json({ success: true, message: 'Data saved to Google Sheets' });
        } catch (sheetError) {
            console.error("Sheet Error details:", sheetError);
            if (sheetError.code === 404 || sheetError.code === 'ENOENT' || (sheetError.message && sheetError.message.includes('credentials.json'))) {
                console.warn("Google Sheets credentials not found or invalid. Returning success for DEMO purposes, but data was NOT saved to Sheets.");
                res.status(200).json({ success: true, message: 'Data received (Mocked: Credentials missing)' });
            } else {
                res.status(500).json({ success: false, message: 'Failed to save to Google Sheets', error: sheetError.message });
            }
        }

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});
