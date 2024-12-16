require('dotenv').config(); // .env 파일 로드
const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.SERVER_PORT;

const { sequelize } = require('./models');

const registerRouter = require('./api/register/route.register')
const teamRouter = require('./api/team/route.team')
const userRouter = require('./api/user/route.user')

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


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/register", registerRouter);
app.use("/team", teamRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
