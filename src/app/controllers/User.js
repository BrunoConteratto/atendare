const { User } = require('../../ThirdParty/Atendare');

module.exports = new class {
  async index(req, res) {
    const data = await User.list();
    console.log(data);
    res.json(data);

    // const { pageIndex, page } = req.params;

    // res.render('lead', {

    // });
  }
}();
