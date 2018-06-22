const Base = require('./base.js');

module.exports = class extends Base {
  async userInfoAction() {
  	  let userModel = this.model('sys_user');
      const data = await userModel.userInfoByUserName("黄总");
  	  return this.success(data);
  }
};
