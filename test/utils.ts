import pool from '../db';

export const setupDB = () => {
    // Connect to Postrgres
    beforeAll(async () => {
        await pool.connect();
    });
  
    // beforeEach(async () => {
    //   await seed();
    // });
  
    // // Cleans up database between each test
    // afterEach(async () => {
    //   await pool
    // });
  
    // // Disconnect Postrgres
    afterAll(() => {
      pool.end();
    });
  };
