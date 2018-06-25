const Base = require('./base.js');

module.exports = class extends Base {
  async hyShoppingInfoAction() {
  	  let shoppingModel = this.model('shoppingmodel');//加载模型，从db.js数据库中读取表
      const data = await shoppingModel.getShoppingData();
  	  return this.success(data);
  }
};
