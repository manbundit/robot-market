const express = require('express');
const cors = require('cors');
const faker = require('faker');

const app = express();
app.use(cors());

const PORT = 8000;
const MAX_ROBOTS = 100;

app.get('/api/robots', (req, res) => {
  let robotList = [];

  for (let i = 0; i < MAX_ROBOTS; i++) {
    const name = faker.name.firstName() + ' ' + faker.name.lastName();
    const image = `https://robohash.org/${name}.png?size=120x120`;
    const price = faker.finance.amount();
    const stock = faker.random.number({ max: 10, min: 0 });
    const createdAt = faker.date.past();
    const material = faker.commerce.productMaterial();

    robotList.push({
      name,
      image,
      price,
      stock,
      createdAt,
      material
    });
  }

  return res.json({
    data: robotList
  });
})


app.get('/', (req, res) => {
  return res.send('Nothing to see here... Just go to `/robots/`');
})

app.listen(PORT, () => console.log(`server is running on PORT: ${PORT}`));
