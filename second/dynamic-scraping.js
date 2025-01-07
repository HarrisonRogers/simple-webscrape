import { load } from 'cheerio';
import fs from 'fs-extra';

async function main() {
  const html = await fetch('https://www.codingwithstefan.com/table-example/');
  const htmlText = await html.text();
  const $ = load(htmlText);

  const scrapedData = [];
  const tableHeaders = [];
  const tableRows = $('body > table > tbody > tr');
  tableRows.each((i, el) => {
    if (i === 0) {
      const ths = $(el).find('th');
      ths.each((i, el) => {
        tableHeaders.push($(el).text().toLowerCase());
      });
      return;
    }

    const tds = $(el).find('td');
    const rowData = {};
    tds.each((i, el) => {
      rowData[tableHeaders[i]] = $(el).text();
    });
    scrapedData.push(rowData);
  });

  // Convert the data to JSON string with proper formatting
  const jsonData = JSON.stringify(scrapedData, null, 2);

  // Write the JSON data to a file
  try {
    await fs.writeFileSync('dynamic-output.json', jsonData);
    console.log('Data has been saved to dynamic-output.json');
  } catch (error) {
    console.error('Error writing to file:', error);
  }
}

main();
