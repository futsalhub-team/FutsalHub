require('dotenv').config(); // .env 파일 로드
const express = require('express');
const app = express();

const PORT = process.env.SERVER_PORT;

const { sequelize } = require('./models');

/**
 * 시퀄라이저 연결
 */
sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });


app.use(express.json()); // JSON 요청을 처리
app.use(express.urlencoded({ extended: true })); // URL-encoded 데이터 처리

app.get('/', (req, res) => {
    res.send('Futsal Recruitment API is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
