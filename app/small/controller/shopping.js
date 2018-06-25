function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');

module.exports = class extends Base {
  hyShoppingInfoAction() {
    var _this = this;

    return _asyncToGenerator(function* () {
      let shoppingModel = _this.model('shoppingmodel'); //加载模型，从db.js数据库中读取表
      const data = yield shoppingModel.getShoppingData();
      return _this.success(data);
    })();
  }
};
//# sourceMappingURL=shopping.js.map