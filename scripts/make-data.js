const fs = require('fs');
const path = require('path');

const parse = require('csv-parse/lib/sync');

const basePath = path.resolve(__dirname, '..');
const csvPath = path.resolve(basePath, 'data', 'dealers.csv');
const dataJsPath = path.resolve(basePath, 'src', 'data.js');

const dealers_csv = fs.readFileSync(csvPath, {encoding: 'utf8'});

const dealers = parse(dealers_csv, {columns: true, skip_empty_lines: true});

const dataStr = `export default ${JSON.stringify(dealers)};`;

fs.writeFileSync(dataJsPath, dataStr);
