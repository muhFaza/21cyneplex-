const {Rent} = require('../models')

async function Authorization (req, res, next) {
  try {
    const { id } = req.params;
    const rentData = await Rent.findByPk(id);
    if (!rentData) throw { name: "RentNotFound" };
    if (rentData.UserId != req.user.id) throw { name: "Unauthorized" };
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = Authorization