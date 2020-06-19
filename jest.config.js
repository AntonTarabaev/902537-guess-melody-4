module.exports = {
  setupFiles: ['./jest.setup.js'],
  testURL: 'http://localhost/',
  verbose: true,
  testRegex: '(/tests/.|(.|/)(test|spec)).(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@root(.*)$': '<rootDir>/src$1'
  },
};
