const Axios = require('axios');

const Request = Axios.create({
  baseURL: 'https://api.atendare.com/v1/user',
  timeout: 1500,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Token: process.env.API_TOKEN,
  },
});

module.exports = new class {
  async get(id) {
    return (await Request.get(`/${id}`)).data;
  }

  async list(pageIndex = 0, pageSize = 15) {
    return (await Request.get('/', {
      params: { pageIndex, pageSize },
    })).data;
  }
}();
