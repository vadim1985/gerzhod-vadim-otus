const coursesRepo = require('./courses');

describe('CoursesRepo Service', () => {
it('should be is not undefined', () => {
    expect(coursesRepo).toBeDefined();
  });

it('method findAll should be is not undefined', () => {
    expect(coursesRepo.findAll()).toBeDefined();
  });

it('method findAll should return array', async() => {
    expect(Array.isArray(await coursesRepo.findAll())).toBe(true);
  });

it('method getCourseById should be is not undefined', () => {
    expect(coursesRepo.getCourseById(1)).toBeDefined();
  });

it('method getCourseById should return object', () => {
    expect(typeof coursesRepo.getCourseById(1)).toBe('object');
  });

  it('method getLessonById should be is not undefined', () => {
    expect(coursesRepo.getLessonById(1, 1)).toBeDefined();
  });

  it('method getLessonById should return object', () => {
    expect(typeof coursesRepo.getLessonById(1, 1)).toBe('object');
  });

});