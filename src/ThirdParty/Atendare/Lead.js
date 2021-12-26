const Axios = require('axios');

const Request = Axios.create({
  baseURL: 'https://api.atendare.com/v1/lead',
  timeout: 1500,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Token: process.env.API_TOKEN,
  },
});

module.exports = {
  async get(id) {
    return (await Request.get(`/${id}`)).data;
  },

  async list(pageIndex = 0, pageSize = 15) {
    return (await Request.get('/', {
      params: { pageIndex, pageSize },
    })).data;
  },

  async create(data) {
    try {
      return (await Request.post('/', data)).data;
    } catch (ex) {
      console.error(ex);
      return null;
    }
  },

  async delete(id) {
    try {
      return (await Request.delete(`/${id}`)).data;
    } catch (ex) {
      console.error(ex);
      return null;
    }
  },

  async update(id, data) {
    try {
      return (await Request.put(`/${id}`, data)).data;
    } catch (ex) {
      console.error(ex.response.data);
      return null;
    }
  },
};
