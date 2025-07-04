const assert = require('assert');
const isNumber = require('is-number');

// Helper to create a descriptive string for test values, making failure messages clearer.
function valueToString(val) {
  if (Number.isNaN(val)) {
    return 'NaN';
  }
  if (typeof val === 'function') {
    return val.toString();
  }
  // JSON.stringify(undefined) is undefined, so handle it separately.
  if (val === undefined) {
    return 'undefined';
  }
  return JSON.stringify(val);
}

describe('is-number', () => {
  describe('when the value is a finite number or a string that can be coerced to a finite number', () => {
    it('should return true', () => {
      const truthyValues = [
        // Actual numbers
        5e3,
        0xff,
        -1.1,
        0,
        1,
        1.1,
        10,
        10.10,
        100,
        parseInt('012'),
        parseFloat('012'),
        // Strings that can be coerced
        '-1.1',
        '0',
        '012',
        '0xff',
        '1',
        '1.1',
        '10',
        '10.10',
        '100',
        '5e3',
      ];

      truthyValues.forEach(value => {
        assert.strictEqual(isNumber(value), true, `expected isNumber(${valueToString(value)}) to be true`);
      });
    });
  });

  describe('when the value is not a finite number', () => {
    it('should return false', () => {
      const falsyValues = [
        Infinity,
        NaN,
        null,
        undefined,
        '',
        '   ',
        'foo',
        [1],
        [],
        function() {},
        {},
      ];

      falsyValues.forEach(value => {
        assert.strictEqual(isNumber(value), false, `expected isNumber(${valueToString(value)}) to be false`);
      });
    });
  });
});