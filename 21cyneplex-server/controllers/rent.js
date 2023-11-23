const { User, Rent } = require("../models");

const getUserRent = async (req, res, next) => {
  try {
    const rentData = await Rent.findAll({ where: { UserId: req.user.id } });

    // Check for expiration
    const expire = []
    rentData.map((el) => {
      if (el.paid == true && el.expired == false) {
        const diff = (new Date() - new Date(el.updatedAt)) / 1000;
        console.log(diff);

        if (
          (el.duration == "24 hours" && diff > 86400) ||
          (el.duration == "3 days" && diff > 259200) ||
          (el.duration == "5 days" && diff > 432000) ||
          (el.duration == "7 days" && diff > 604800)
        ) {
          // await Rent.findByPk(el.id)
          expire.push(el.id)
        }
      }
    });
    if (expire.length != 0) {
      for (let i = 0; i < expire.length; i++) {
        const element = expire[i];
        await Rent.update({expired: true},{where: {id: element}})
      }
    }
    res.status(200).json(rentData);
  } catch (err) {
    next(err);
  }
};

const deleteRent = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Rent.destroy({ where: { id } });
    res.status(200).json({ message: "Rent deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = { getUserRent, deleteRent };
