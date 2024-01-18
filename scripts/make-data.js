const fs = require('fs');
const path = require('path');

const parse = require('csv-parse/lib/sync');
const PublicGoogleSheetsParser = require('public-google-sheets-parser');

const basePath = path.resolve(__dirname, '..');
const csvPath = path.resolve(basePath, 'data', 'dealers.csv');
const dataJsPath = path.resolve(basePath, 'src', 'data.js');


function writeData(dealers) {
  const dataStr = `export default ${JSON.stringify(dealers)};`;

  fs.writeFileSync(dataJsPath, dataStr);

  console.log(`Writing ${dataJsPath} complete`);
}

function tagsStrToArray(tagsStr) {
 if (tagsStr) {
   return tagsStr.split('||').map(sp => sp.trim()).filter(sp => sp.length > 0);
 }

 return [];
}


function handleDealers(dealers) {
  dealers.forEach(item => {
    item.tags = tagsStrToArray(item.tags);
  });

  writeData(dealers);
}


function processCsv() {
  console.log(`Making src/data.js via csv file: ${csvPath}`);
  const dealers_csv = fs.readFileSync(csvPath, {encoding: 'utf8'});

  const dealers = parse(dealers_csv, {columns: true, skip_empty_lines: true});

  handleDealers(dealers);
}

function processGoogleSheet(spreadsheetId) {
  console.log(`Making src/data.js via Google Sheet Id: ${spreadsheetId}`);
  const parser = new PublicGoogleSheetsParser(spreadsheetId);

  parser.parse().then(handleDealers);

}

if (process.env.SPREADSHEET_ID) {
  processGoogleSheet(process.env.SPREADSHEET_ID);
} else {
  processCsv();
}
