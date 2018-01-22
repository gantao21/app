const Base = require('./base.js');

module.exports = class extends Base {
  operate_logAction() {
    return this.display();
  }
};
