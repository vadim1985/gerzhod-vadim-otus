const VisualJSON = require('../VisualJSON');
const VisualDirectory = require('../VisualDirectory');
const mock = require('mock-fs');
let visualJSON = '';
jest.mock('../VisualDirectory.js', () => {
  return {
    directoryJSON: jest.fn().mockImplementation(() => {
      return {
        name: 'test_dir',
        items: [{ name: 'file_0' },
        {
          name: 'folder_0',
          items: [
            { name: 'file_1' },
            { name: 'folder_1', items: [{ name: 'file_2' }] },
            { name: 'folder_2', items: [{ name: 'file_3' }] }]
        }]
      };
    })
  };
});

describe('VisualJSON', () => {
  beforeEach(() => {
    visualJSON = new VisualJSON(VisualDirectory.directoryJSON());
  });
  afterEach(mock.restore);

  it('should be defined', () => {
    expect(visualJSON.prepare()).toBeDefined();
  });

  it('should return an string', () => {
    expect(typeof visualJSON.prepare()).toBe('string');
  });

  it('should return an prefix', () => {
    expect(visualJSON.prefix('array')).toBe('├── ');
    expect(visualJSON.prefix('object')).toBe('└── ');
    expect(visualJSON.prefix('space')).toBe('   ');
    expect(visualJSON.prefix()).toBe('');
  });

  it('should return void', () => {
    console.log = jest.fn();
    visualJSON.show();
    expect(console.log.mock.calls[0][0])
      .toBe(
        `test_dir\n├── file_0\n└── folder_0\n    ├── file_1\n    ├── folder_1\n    │   └── file_2\n    └── folder_2\n        └── file_3\n`
      );
  });
});