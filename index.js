const isNumber = require('is-number');
const wrap = require('word-wrap');

// --- Demonstrate is-number ---
console.log('--- Testing is-number ---');
const valuesToTest = [5, '10', 'hello', null, Infinity, '5e3'];

valuesToTest.forEach(val => {
  // Using JSON.stringify to better represent null and strings in the output
  console.log(`Is ${JSON.stringify(val)} a number? \t${isNumber(val)}`);
});

console.log('\n'); // Add a newline for better separation

// --- Demonstrate word-wrap ---
console.log('--- Testing word-wrap ---');
const longText = 'This is a very long string of text that needs to be wrapped to a certain width to make it more readable in a console or a text file. Let\'s see how word-wrap handles it.';

const wrappedText = wrap(longText, { width: 50, indent: '  ' });

console.log('Original text:\n' + longText);
console.log('\nWrapped text (width: 50, indented):');
console.log(wrappedText);