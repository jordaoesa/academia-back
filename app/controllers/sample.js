const sanitize = require('mongo-sanitize');
const mongoose = require('mongoose');
const Sample = mongoose.model('Sample');

class SampleController {

  list(req, res) {
    let query = sanitize(req.query);

    Sample.find(query).lean(true).exec(function (err, resultQuery) {
      if (err) {
        console.log("err: " + err);
        return res.status(500).json(err);
      } else {
        return res.status(200).json(resultQuery);
      }
    });
  }

  post(req, res) {
    new Sample(req.body)
        .save()
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err));
  }

}

module.exports = new SampleController();
