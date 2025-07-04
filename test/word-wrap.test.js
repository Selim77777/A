const assert = require('assert');
const wrap = require('word-wrap');

describe('word-wrap', () => {
  const longString = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
  const longWord = 'supercalifragilisticexpialidocious';
  const textWithWhitespace = 'some text with trailing whitespace   ';

  const testCases = [
    {
      description: 'should wrap text using default options (width: 50, newline: \\n, indent: \'\')',
      input: longString,
      options: undefined,
      expected: 'Lorem ipsum dolor sit amet, consectetur\nadipiscing elit, sed do eiusmod tempor incididunt\nut labore et dolore magna aliqua. Ut enim ad minim\nveniam, quis nostrud exercitation ullamco laboris\nnisi ut aliquip ex ea commodo consequat.',
    },
    {
      description: 'should wrap text to a specified width',
      input: longString,
      options: { width: 60 },
      expected: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do\neiusmod tempor incididunt ut labore et dolore magna aliqua. Ut\nenim ad minim veniam, quis nostrud exercitation ullamco laboris\nnisi ut aliquip ex ea commodo consequat.',
    },
    {
      description: 'should indent each line with the specified string',
      input: longString,
      options: { indent: '    ', width: 35 },
      expected: '    Lorem ipsum dolor sit amet,\n    consectetur adipiscing elit, sed\n    do eiusmod tempor incididunt ut\n    labore et dolore magna aliqua. Ut\n    enim ad minim veniam, quis\n    nostrud exercitation ullamco\n    laboris nisi ut aliquip ex ea\n    commodo consequat.',
    },
    {
      description: 'should use a custom newline character',
      input: longString,
      options: { newline: '<br>' },
      expected: 'Lorem ipsum dolor sit amet, consectetur<br>adipiscing elit, sed do eiusmod tempor incididunt<br>ut labore et dolore magna aliqua. Ut enim ad minim<br>veniam, quis nostrud exercitation ullamco laboris<br>nisi ut aliquip ex ea commodo consequat.',
    },
    {
      description: 'should break long words when cut is true',
      input: longWord,
      options: { width: 20, cut: true },
      expected: 'supercalifragilisti\ncicexpialidocious',
    },
    {
      description: 'should not break long words when cut is false (default)',
      input: longWord,
      options: { width: 20 },
      expected: 'supercalifragilisticexpialidocious',
    },
    {
      description: 'should trim trailing whitespace from the result string when trim is true',
      input: textWithWhitespace,
      options: { width: 10, trim: true },
      expected: 'some text\nwith\ntrailing\nwhitespace',
    },
    {
      description: 'should preserve leading indentation on the first line when trim is true',
      input: textWithWhitespace,
      options: { width: 10, indent: '  ', trim: true },
      expected: '  some text\n  with\n  trailing\n  whitespace',
    },
  ];

  testCases.forEach(({ description, input, options, expected }) => {
    it(description, () => {
      assert.strictEqual(wrap(input, options), expected);
    });
  });
});