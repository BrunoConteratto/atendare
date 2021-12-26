const { Lead } = require('../../ThirdParty/Atendare');

module.exports = new class {
  async list(req, res) {
    const pageIndex = req.params.pageIndex || 0;
    const pageSize = req.params.pageSize || 15;
    const data = await Lead.list(pageIndex, pageSize);
    res.json(data);
  }

  async create(req, res) {
    const data = req.body;
    delete data.company_id;
    data.birthdate = new Date(data.birthdate);
    const response = await Lead.create(data);
    if (response && response.success) {
      res.status(201).json({
        success: { status: 201, message: 'created', data: response },
      });
    } else {
      res.status(503).json({
        error: { status: 400, message: 'service unavailable', fields: [] },
      });
    }
  }

  async delete(req, res) {
    const { id } = req.body;
    const response = await Lead.delete(id);
    if (response && response.success) {
      res.status(200).json({
        success: { status: 200, message: 'OK', data: response },
      });
    } else {
      res.status(503).json({
        error: { status: 400, message: 'service unavailable', fields: [] },
      });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;
    data.birthdate = new Date(data.birthdate);
    const response = await Lead.update(id, { ...{ emails: [], phones: [] }, ...data });
    if (response && response.success) {
      res.status(200).json({
        success: { status: 200, message: 'OK', data: response },
      });
    } else {
      res.status(503).json({
        error: { status: 400, message: 'service unavailable', fields: [] },
      });
    }
  }
}();
