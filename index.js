import fs from 'fs-extra';
import { load } from 'cheerio';

// Writing the HTML to a file then console logging the h1 text
async function first() {
  const html = await fetch('https://reactnativetutorial.net/css-selectors/');
  const htmlText = await html.text();
  fs.writeFileSync('./index.html', htmlText);
  const $ = load(htmlText);
  const h1 = $('h1');
  console.log(h1.text());
}

// Console logging all of the h2 texts
async function second() {
  const html = await fetch(
    'https://reactnativetutorial.net/css-selectors/lesson2.html'
  );
  const htmlText = await html.text();
  const $ = load(htmlText);
  $('h2').each((i, el) => {
    console.log($(el).text());
  });
}

// Specifying the id of an element and console logging the text
async function third() {
  const html = await fetch(
    'https://reactnativetutorial.net/css-selectors/lesson3.html'
  );
  const htmlText = await html.text();
  const $ = load(htmlText);
  const idText = $('#red').text();
  console.log(idText);
}

// Specifying the class of an element and console logging the text
async function fourth() {
  const html = await fetch(
    'https://reactnativetutorial.net/css-selectors/lesson5.html'
  );
  const htmlText = await html.text();
  const $ = load(htmlText);
  const red = $('.red');
  console.log(red.text());
}

// Specifying the data attribute of an element and console logging the text
async function fifth() {
  const html = await fetch(
    'https://reactnativetutorial.net/css-selectors/lesson6.html'
  );
  const htmlText = await html.text();
  const $ = load(htmlText);
  const dataCustomer = $('[data-customer="22293"]');
  console.log(dataCustomer.text());
}

// first();
// second();
// third();
// fourth();
// fifth();
