# Mini Healthcare Support Web (CareConnect)

A compassionate web platform designed to bridge the gap between patients needing support and volunteers offering help. The application features a dynamic registration system, an integrated AI chatbot for basic health queries, and seamless data persistence using Google Sheets.

## 🚀 Features

-   **Dual-Role Registration**: distinct forms for Patients and Volunteers with dynamic fields.
-   **Google Sheets Integration**: Automatically saves form submissions to a specific Google Sheet for easy management.
-   **AI Chatbot**: "CareAssistant AI" provides instant answers to common questions (clinic hours, emergency info, etc.).
-   **Responsive Design**: Built with a mobile-first approach using modern CSS.
-   **Unified Development**: Run both Frontend (Vite) and Backend (Express) with a single command.

## 🛠️ Tech Stack

-   **Frontend**: HTML5, CSS3, JavaScript (ES6+), Vite
-   **Backend**: Node.js, Express.js
-   **Database**: Google Sheets API (v4)
-   **Tools**: Concurrently, Dotenv

## 📋 Prerequisites

-   Node.js (v14 or higher)
-   A Google Cloud Project with Sheets API enabled.
-   A Service Account with a generated JSON key (`credentials.json`).

## ⚙️ Setup & Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd Mini-Healthcare-Support-Web
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Backend Configuration**
    You need to set up Google Sheets access for the backend to work:

    *   **Step A: Credentials**
        1.  Get your Service Account key from Google Cloud Console.
        2.  Rename the file to `credentials.json`.
        3.  Move it into the `backend/` folder.

    *   **Step B: Google Sheet**
        1.  Create a new Google Sheet.
        2.  Click **Share** and give **Editor** access to the `client_email` found in your `credentials.json`.
        3.  Note the **Spreadsheet ID** from the URL:
            `https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit`

    *   **Step C: Environment Variables**
        1.  Create a `.env` file in the `backend/` folder.
        2.  Add your Spreadsheet ID:
            ```env
            SPREADSHEET_ID=your_copied_spreadsheet_id
            ```

## ▶️ Running the Application

Start both the frontend and backend servers with one command:

```bash
npm run dev
```

-   **Frontend**: `http://localhost:5173`
-   **Backend**: `http://localhost:3000`

## 📁 Project Structure

```
Mini-Healthcare-Support-Web/
├── backend/
│   ├── credentials.json   # (You must create this)
│   ├── .env               # (You must create this)
│   ├── server.js          # Express server entry point
│   ├── sheets.js          # Google Sheets API logic
│   └── README.md          # Backend-specific guide
├── frontend/
│   ├── src/
│   │   ├── main.js        # Frontend logic & API calls
│   │   ├── chatbot.js     # Chatbot component
│   │   └── style.css      # Global styles
│   └── index.html         # Main HTML file
├── package.json           # Scripts and dependencies
└── README.md              # Project documentation
```

## 🐛 Troubleshooting

-   **"The caller does not have permission"**: You forgot to Share the Google Sheet with your Service Account email (Editor access).
-   **"Spreadsheet Not Found"**: The `SPREADSHEET_ID` in `backend/.env` is incorrect.
-   **"Google Sheets credentials not found"**: `credentials.json` is missing from the `backend/` folder.
