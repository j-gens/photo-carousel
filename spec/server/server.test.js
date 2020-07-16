const app = require('../../server/app.js');
const supertest = require('supertest');
const request = supertest(app);




describe('server responses', () => {

  const movieIds = ['detective pikachu', 'lion king', 'frozen', 'brave', 'the rescuers', 'sleeping beauty', 'robin hood', 'shrek', 'lego batman', 'hercules', 'mulan'];


  test('should respond with status 200 for movies in db', async () => {
    for (let i = 0; i < 11; i++) {
      let movieId = '2121' + i.toString();
      let data = await request.get('/api/imgsmall/?movietitle=' + movieIds[movieId]);

      expect(data.statusCode).toBe(200);
    }
  });

  test('should respond with an array length 1 - 20', async () => {
    for (let i = 0; i < 11; i++) {
      let movieId = '2121' + i.toString();
      let data = await request.get(`/api/imgsmall/?movietitle=${movieIds[movieId]}`);

      console.log('========= i: ', i, 'data', data);

      expect(Array.isArray(data.body)).toBeTruthy();
      expect(data.body.length).toBeGreaterThanOrEqual(1);
      expect(data.body.length).toBeLessThanOrEqual(25);
    }
  });

  test('should respond with status 200 for movies in db', async () => {
    for (let i = 0; i < 11; i++) {
      let movieId = '2121' + i.toString();
      let data = await request.get('/api/imglarge/?movietitle=' + movieIds[movieId]);

      expect(data.statusCode).toBe(200);
    }
  });

  test('should respond with an array length 1 - 20', async () => {
    for (let i = 0; i < 11; i++) {
      let movieId = '2121' + i.toString();
      let data = await request.get('/api/imglarge/?movietitle=' + movieIds[movieId]);

      expect(Array.isArray(data.body)).toBeTruthy();
      expect(data.body.length).toBeGreaterThanOrEqual(1);
      expect(data.body.length).toBeLessThanOrEqual(20);
    }
  });

  test('routes should return the same length array', async () => {
    for (let i = 0; i < 11; i++) {
      let movieId = '2121' + i.toString();
      let data = await request.get('/api/imgsmall/?movietitle=' + movieIds[movieId]);
      let dataTwo = await request(app).get('/api/imglarge/?movietitle=' + movieIds[movieId]);

      expect(data.body.length).toEqual(dataTwo.body.length);
    }
  });

});
