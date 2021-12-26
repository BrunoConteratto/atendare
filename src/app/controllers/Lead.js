const { Lead, Organization } = require('../../ThirdParty/Atendare');

module.exports = new class {
  async index(req, res) {
    const pageIndex = req.params.pageIndex || 0;
    const pageSize = req.params.pageSize || 15;
    const data = await Lead.list(pageIndex, pageSize);
    res.render('lead/list', {
      data,
      pageIndex,
      pageSize,
    });
  }

  async create(req, res) {
    const organizations = await Organization.list();
    res.render('lead/create', {
      organizations,
    });
  }

  async edit(req, res) {
    const { id } = req.params;
    const data = await Lead.get(id);
    const organizations = await Organization.list();
    if (data) {
      res.render('lead/edit', {
        ...data,
        organizations,
      });
    } else {
      res.redirect('/leads');
    }
  }
}();
