module.exports = new class {
  async index(req, res) {
    res.render('home', {});
  }
}();
