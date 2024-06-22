import formatDate from './date';

describe('formatDate', () => {
    it('formats timestamp 1719067120477 to "4:38 PM | June 22, 2024"', () => {
      const timestamp = 1719067120477;
      const expected = '4:38 PM | June 22, 2024';
      expect(formatDate(timestamp)).toEqual(expected);
    });
});
