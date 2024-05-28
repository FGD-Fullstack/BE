const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

module.exports = {
  register: async (req, res, next) => {
    try {
      const { fullName, email, password } = req.body;
      const cekEmail = await User.findOne({ where: { email } });
      if (cekEmail) {
        return res.status(400).json({ message: "Email sudah ada" });
      }

      const cekPassword = password.length < 6;
      if (cekPassword) {
        return res.status(400).json({ message: "Password minimal 6 karakter" });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        fullName,
        email,
        password: hashPassword,
      });

      return res
        .status(201)
        .json({ message: "User berhasil registrasi", data: user });
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: "Email tidak ditemukan" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ message: "Password salah" });
      }

      const payload = {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

      return res
        .status(200)
        .json({ message: "Berhasil login", data: { payload }, token });
    } catch (error) {
      next(error);
    }
  },
};
