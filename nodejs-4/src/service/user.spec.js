const userRepo = require('./user');

describe('UserRepo Service', () => {
  it('should be is not undefined', () => {
    expect(userRepo).toBeDefined();
  });

  it('findAll should be defined', () => {
    expect(userRepo.findAll()).toBeDefined();
  });

  it('findAll should return array', async () => {
    const allUsers = await userRepo.findAll();
    expect(Array.isArray(allUsers)).toBe(true);
  });

  it('findById should be defined', () => {
    expect(userRepo.findById(1)).toBeDefined();
  });

  it('findByName should be defined', () => {
    expect(userRepo.findByName('name')).toBeDefined();
  });

});