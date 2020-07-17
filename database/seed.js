const db = require('./index.js');


const randomNumber = (maxInt) => {
  return Math.floor(Math.random() * maxInt)
}

const movieIds = ['detective pikachu', 'lion king', 'frozen', 'brave', 'the rescuers', 'sleeping beauty', 'robin hood', 'shrek', 'lego batman', 'hercules', 'mulan']

const generateDataArray = (entries) => {
  const fakeData = [];
  for (let i = 0; i < entries; i++) {
    let imgUrl = randomNumber(21);
    let movieInt;
    i < 11 ? movieInt = i : movieInt = randomNumber(11);
    let fakeImageData = {
      _id: Number('3131' + i.toString()),
      small_url:`/images/small${imgUrl}.jpg`,
      large_url:`/images/large${imgUrl}.jpg`,
      movie: {
        id: Number('2121' + movieInt.toString()),
        title: movieIds[movieInt]
      }
    }
    fakeData.push(fakeImageData);
  }

  return fakeData;
}


db.save(generateDataArray(150), console.log);
