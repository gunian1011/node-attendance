let CheckModel = require('../model/checks');

let createApply = (req, res, next) => {
  CheckModel.insertMany([req.body]).then((ret)=>{
    res.send({"errcode": 0, "errmsg": "ok"});
  }).catch((err)=>{
    res.send({"errcode": -2, "errmsg": "error"});
  })
}

let getApply = (req, res, next) => {
  CheckModel.find(req.query).sort({ _id: -1 }).then((rets)=>{
    res.send({"errcode": 0, "errmsg": "ok", "rets": rets})
  }).catch((err)=>{
    res.send({"errcode": -2, "errmsg": "error"});
  })
}

let putApply = (req, res, next) => {
  if( !['已通过', '未通过'].includes(req.body.state) ){
    res.send({"errcode": -2, "errmsg": "error"});
    return;
  }
  CheckModel.updateOne({_id: req.body._id}, {$set: { state: req.body.state }}).then((ret)=>{
    res.send({"errcode": 0, "errmsg": "ok"});
  }).catch((err)=>{
    res.send({"errcode": -2, "errmsg": "error"});
  })
}

module.exports = {
  createApply,
  getApply,
  putApply
};