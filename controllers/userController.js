const { User } = require("../models");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { fullName, email, password } = req.body;
      const user = await User.create({ fullName, email, password });
      return res.status(201).json({
        status: true,
        message: "User ditambahkan",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const users = await User.findAll();
      return res.status(200).json({
        status: true,
        message: "User ditemukan semua",
        data: users,
      });
    } catch (error) {
      next(error);
    }
  },
  getOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          status: false,
          message: "User tidak ditemukan",
          data: null,
        });
      }
      return res.status(200).json({
        status: true,
        message: "User ditemukan",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { fullName, email, password } = req.body;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          status: false,
          message: "User tidak ditemukan",
          data: null,
        });
      }
      await user.update({ fullName, email, password });
      return res.status(200).json({
        status: true,
        message: "User berhasil diupdate",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          status: false,
          message: "User not found",
          data: null,
        });
      }
      await user.destroy();
      return res.status(200).json({
        status: true,
        message: "User berhasil dihapus",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },
};
