import { useState } from 'react'
import './App.css'
import { google } from 'googleapis';

const serviceAccountKeyFile = './buraco-note-8c6c45f0b31d.json';
const sheetId = '11F_IdN_wc-GGCsj2u3DdrgEx6575jzcAJAxBx9oJDVE';
const tabName = 'test';
const range = 'A:E';

async function _getGoogleSheetClient() {
  const auth = new google.auth.GoogleAuth({
    keyFile: serviceAccountKeyFile,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const authClient = await auth.getClient();
  return google.sheets({
    version: 'v4',
    auth: authClient,
  });
}

async function _readGoogleSheet(googleSheetClient, sheetId, tabName, range) {
  const res = await googleSheetClient.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${tabName}!${range}`,
  });

  return res.data.values;
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      </div>
    </>
  )
}

export default App
