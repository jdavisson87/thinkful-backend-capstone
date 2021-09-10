const reviewsService = require('./reviews.service');

function list(req, res, next) {
  reviewsService
    .list()
    .then((data) => res.json({ data }))
    .catch(next);
}

module.exports = {
  list,
};
