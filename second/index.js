import { load } from 'cheerio';
import fs from 'fs-extra';

async function main() {
  const html = await fetch('https://www.codingwithstefan.com/table-example/');
  const htmlText = await html.text();
  const $ = load(htmlText);

  const scrapedData = [];
  const tableRows = $('body > table > tbody > tr');
  tableRows.each((i, el) => {
    if (i === 0) return;
    const tds = $(el).find('td');
    const company = $(tds[0]).text();
    const contact = $(tds[1]).text();
    const country = $(tds[2]).text();
    scrapedData.push({ company, contact, country });
  });

  // Convert the data to JSON string with proper formatting
  const jsonData = JSON.stringify(scrapedData, null, 2);

  // Write the JSON data to a file
  try {
    await fs.writeFileSync('output.json', jsonData);
    console.log('Data has been saved to output.json');
  } catch (error) {
    console.error('Error writing to file:', error);
  }
}

main();
