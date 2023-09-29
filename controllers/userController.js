// const ApiError = require('../error/apiError')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/models");
// const { where } = require('sequelize');

const generateJwt = (id, tel, name) => {
  return jwt.sign({ id, tel, name }, process.env.SECRET_KEY, { expiresIn: "24h" });
};

const registration = async (req, res) => {
  const { name, tel, password } = req.body;
  if (!name || !tel || !password) {
    return res
      .status(400)
      .json({ message: "Будь ласка, заповніть необхідні поля!" });
  }
  const candidate = await User.findOne({ where: { tel } });
  if (candidate) {
    return res.status(400).json({ message: "Такий користувач вже існує!!" });
  }
  const hashPassword = await bcrypt.hash(password, 5);
  const user = await User.create({ name, tel, password: hashPassword });

  if (user && process.env.SECRET_KEY) {
    const token = generateJwt(user.id, user.tel, user.name);
    return res.status(201).json({ token });
  } else {
    return res
      .status(400)
      .json({ message: "Помилка! Не вдалось створити користувача!!" });
  }
};

const login = async (req, res) => {
  const { tel, password } = req.body;
  if (!tel || !password) {
    return res
      .status(400)
      .json({ message: "Будь ласка, заповніть необхідні поля!" });
  }
  const user = await User.findOne({ where: { tel } });
  if (!user) {
    return res.status(400).json({message: "Такого користувача не існує!!"});
  }
  let comparePassword = bcrypt.compareSync(password, user.password);
  if (comparePassword && process.env.SECRET_KEY) {
    const token = generateJwt(user.id, user.tel, user.name);
    return res.status(200).json({ token });
  }
  return res.status(400).json({ message: "пароль не вірний!!" });
};

const check = async (req, res) => {
  console.log('req = ', req.user.id);
  // return res.status(200).json(req.user);

  // const {id} = req.query
  // if(!id) {
  //   return res.status(400).json({ message: "Користувач не задан!" });
  // }
  const token = generateJwt(req.user.id, req.user.tel, req.user.name);
  return res.status(200).json({ token })

};

const getOne = async (req, res) => {
  const { id } = req.query;
  const {name, tel} = await User.findByPk(id);
  return res.status(200).json({name, tel})
}

const changePass = async (req, res) => {

  const { newPass, oldPass, userId } = req.body;
  const {id, name, tel, password} = await User.findByPk(userId);
  const passwordMatched = bcrypt.compareSync(oldPass, password)
  if (!passwordMatched) {
    console.log('password not matched');
    return res.status(400).json({ message: "Старий пароль не вірний!!" });
  } else {
    const hashPassword = await bcrypt.hash(newPass, 5);
    const user = await User.update(
      {
        password: hashPassword,
      },
      {
        where: {
          id: userId
        }
      }
    )
    if (user && process.env.SECRET_KEY) {
      const token = generateJwt(id, tel, name);
      return res.status(201).json({ token });
    } else {
      return res
        .status(400)
        .json({ message: "Помилка! Не вдалось змінити пароль!!" });
    }
  }
}



module.exports = {
  registration,
  login,
  check,
  getOne,
  changePass
};
// class UserController {

//   async registration (req, res) {

//     console.log(req.body);
//     const {firstName, lastName, email, tel, password} = req.body
//     if (!firstName || !lastName || !email || !tel || !password) {
//       // console.log(firstName, lastName, email, tel, password);
//       return res.json('Перевірте правільність введених данних!')
//     }
//     const candidate = await User.findOne({where: {email}})
//     if (candidate) {
//       return res.json('Такий користувач вже існує!!')
//     }
//     const hashPassword = await bcrypt.hash(password, 5)
//     const user = await User.create({firstName, lastName, email, tel, password: hashPassword})
//     const token = generateJwt(user.id, user.email)
//     return res.json({token})
//   }

//   async login (req, res) {
//     const {email, password} = req.body
//     const user = await User.findOne({where: {email}})
//     if (!user) {
//       return res.json('Такого користувача не існує!!')
//     }
//     let comparePassword = bcrypt.compareSync(password, user.password)
//     if (!comparePassword) {
//       return res.json('пароль не вірний!!')
//     }
//     const token = generateJwt(user.id, user.email)
//     return res.json({token})
//   }

//   async check (req, res, next) {
//     const token = generateJwt(req.user.id, req.user.email)
//     return res.json({token})
//   }
// }

// module.exports = new UserController();
