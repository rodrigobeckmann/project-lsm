import { google } from 'googleapis';

const serviceAccountKeyFile = './src/buraco-note-8c6c45f0b31d.json';
const sheetId = '11F_IdN_wc-GGCsj2u3DdrgEx6575jzcAJAxBx9oJDVE';
const tabName = 'test';
const range = 'name:names';

let playerName = 'teste';

const dataToBeInserted = [
    ['11', 'rohith', 'Rohith', 'Sharma', 'Active'],
    ['12', 'virat', 'Virat', 'Kohli', 'Active']
]

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

async function _writeGoogleSheet(googleSheetClient, sheetId, tabName, range, data) {
    await googleSheetClient.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: `${tabName}!${range}`,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        resource: {
            "majorDimension": "ROWS",
            "values": data
        },
    })
}

const googleClient = await _getGoogleSheetClient();




await _writeGoogleSheet(googleClient, sheetId, tabName, range, dataToBeInserted);

const data = await _readGoogleSheet(googleClient, sheetId, tabName, range);
console.log(data);

