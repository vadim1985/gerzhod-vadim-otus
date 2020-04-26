const VisualDirectory = require('../VisualDirectory');
const mock = require('mock-fs');
let visualDirectory = null;

describe('VisualDirectory', () => {
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
    visualDirectory = new VisualDirectory('./test_dir', 2);
  });
  afterEach(mock.restore);

  it('should be defined', () => {
    expect(visualDirectory.directoryJSON()).toBeDefined();
  });

  it('should return an object', () => {
    expect(typeof visualDirectory.directoryJSON()).toBe('object');
  });

  it('should return null', () => {
    expect(visualDirectory.directoryJSON('./test_dir/foler/foler/')).toBeNull();
  });

  it('should return an object', () => {
    console.log = jest.fn();
    visualDirectory.directoryTree()
    expect(console.log.mock.calls[0][0])
    .toBe(
      `test_dir\n├── file_0\n└── folder_0\n    ├── file_1\n    ├── folder_1\n    └── folder_2\n`
      );
  });

  it('should have property', () => {
    expect(visualDirectory.directoryJSON()).toHaveProperty('name', 'test_dir');
    expect(visualDirectory.directoryJSON()).toHaveProperty('items', [
      { name: 'file_0' },
      {
        items: [
          { name: 'file_1' },
          { name: 'folder_1' },
          { name: 'folder_2' }
        ],
        name: 'folder_0'
      }
    ]);
  });
});