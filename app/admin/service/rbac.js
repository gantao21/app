function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// +----------------------------------------------------------------------
// | gantao
// +----------------------------------------------------------------------
/**
 * Role-Based Access Control

 DROP TABLE IF EXISTS `cmswing_auth_role`;
 CREATE TABLE `cmswing_auth_role` (
 `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
 `desc` varchar(255) NOT NULL DEFAULT '',
 `status` tinyint(11) NOT NULL DEFAULT '1',
 `rule_ids` varchar(255) DEFAULT '' COMMENT '',
 PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=utf8;

 DROP TABLE IF EXISTS `cmswing_auth_rule`;
 CREATE TABLE `cmswing_auth_rule` (
 `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
 `name` varchar(255) NOT NULL DEFAULT '' COMMENT '',
 `desc` varchar(255) NOT NULL DEFAULT '' COMMENT '',
 `pid` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '',
 `status` tinyint(11) NOT NULL DEFAULT '1',
 `condition` varchar(255) DEFAULT '' COMMENT '',
 PRIMARY KEY (`id`),
 UNIQUE KEY `name` (`name`),
 KEY `status` (`status`)
 ) ENGINE=MyISAM DEFAULT CHARSET=utf8;

 DROP TABLE IF EXISTS `cmswing_auth_user_role`;
 CREATE TABLE `cmswing_auth_user_role` (
 `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
 `user_id` int(11) NOT NULL,
 `role_id` int(11) NOT NULL,
 PRIMARY KEY (`id`),
 UNIQUE KEY `user_role` (`user_id`,`role_id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=utf8;

 * @type {Class}
 */
module.exports = class extends think.Service {
  /**
   * init
   * @param  {Number} userId []
   * @param  {Object} config []
   * @param  {Object} http   []
   * @return {}        []
   */
  constructor(userId, config, http) {
    super(http);
    if (think.isObject(userId)) {
      config = userId;
      userId = config.id;
    }
    this.userId = userId;
    this.config = think.extend({
      type: 1, // auth type, 2 is session auth
      user: 'ucenter_member', // user info table
      role: 'auth_role', // role table
      rule: 'auth_rule', // rule table
      user_role: 'auth_user_role', // user - role relation table
      userInfo: null
    }, config);
    this.http = http;
  }
  /**
   * check auth
   * @param  {String} name [auth type]
   * @param  {Boolean} and  [condition]
   * @return {Promise}      []
   */
  check(name, and) {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (think.isString(name)) {
        name = name.split(',');
      }
      const authList = yield _this.getAuthList();

      if (name.length === 1) {
        return authList.indexOf(name[0]) > -1;
      }

      const logic = and ? 'every' : 'some';

      return name[logic](function (item) {
        return authList.indexOf(item) > -1;
      });
    })();
  }
  _getAuthList() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      let data;
      if (_this2.config.type === 1) {
        data = yield _this2.flushAuthList();
      } else {
        const http = _this2.http;
        const key = _this2.config('auth_key');
        think.session(_this2.http);
        let data = yield http.session.get(key);
        if (think.isEmpty(data)) {
          data = yield _this2.flushAuthList();
          yield http.session.set(key, data);
        }
      }
      return data;
    })();
  }
  /**
   * get auth list
   * @return {Promise} []
   */
  getAuthList() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const data = yield Promise.all([_this3._getAuthList(), _this3.getUserInfo()]);

      const authList = data[0];
      const userInfo = data[1];
      const result = [];

      authList.forEach(function (item) {
        if (!item.condition) {
          result.push(item.name);
        } else {
          const condition = item.condition.replace(/\w+/, function (a) {
            return `userInfo.${a}`;
          });
          /* jslint evil: true */
          const fn = new Function('userInfo', `return ${condition}`);
          const flag = fn(userInfo);
          if (flag) {
            result.push(item.name);
          }
        }
      });
      return result;
    })();
  }
  /**
   * flush auth list
   * @return {Promise} []
   */
  flushAuthList() {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      const ids = yield _this4.getRuleIds();
      const model = think.model(_this4.config.rule);
      return model.field('name,condition').where({ id: ['IN', ids], status: 1 }).select();
    })();
  }
  /**
   * get user info
   * @return {Promise} []
   */
  getUserInfo() {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      if (!think.isEmpty(_this5.config.userInfo)) {
        return _this5.config.userInfo;
      }
      const data = yield think.model(_this5.config.user).where({ id: _this5.userId }).find();
      _this5.config.userInfo = data;
      return data;
    })();
  }
  /**
   * get rule ids
   * @return {Promise} []
   */
  getRuleIds() {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      const data = yield _this6.getRoles();
      // console.log(data);
      let ids = [];
      data.forEach(function (item) {
        const ruleIds = (item.rule_ids || '').split(',');
        ids = ids.concat(ruleIds);
      });
      return ids;
    })();
  }
  /**
   * get roles
   * @return {Promise} []
   */
  getRoles() {
    return think.model(this.config.user_role).alias('a').join({
      table: this.config.role,
      as: 'b',
      on: ['role_id', 'id']
    }).where({
      'a.user_id': this.userId,
      'b.status': 1
    }).select();
  }
};
//# sourceMappingURL=rbac.js.map