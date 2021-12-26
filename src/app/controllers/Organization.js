const { Organization } = require('../../ThirdParty/Atendare');

module.exports = new class {
  async index(req, res) {
    const pageIndex = req.params.pageIndex || 0;
    const pageSize = req.params.pageSize || 15;
    const data = await Organization.list(pageIndex, pageSize);
    res.render('organization/list', {
      data,
      pageIndex,
      pageSize,
    });
  }

  async create(req, res) {
    res.render('organization/create');
  }

  async edit(req, res) {
    const { id } = req.params;
    const data = await Organization.get(id);
    if (data) {
      res.render('organization/edit', data);
    } else {
      res.redirect('/organizations');
    }
  }
}();
