const VisualJSON = require('../VisualJSON');
const VisualDirectory = require('../VisualDirectory');
const mock = require('mock-fs');
let visualJSON = '';

describe('VisualJSON', () => {
  beforeEach(() => {
    mock({
      'test_dir': {
        'file_0': 'file_0 contents',
        'folder_0': {
          file_1: 'file_1 contents',
          folder_1: {
            file_2: 'file_4 contents',
          },
          folder_2: {
            file_3: 'file_7 contents',
          },
        }
      }
    });
    const directoryJSON = new VisualDirectory('./test_dir').directoryJSON();
    visualJSON = new VisualJSON(directoryJSON);
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