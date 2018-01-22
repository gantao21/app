function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = class extends think.Model {
  /**
   * 自动登录用户
   * @param  integer $user 用户信息数组
   */
  autoLogin(user, ip) {
    var _this = this;

    return _asyncToGenerator(function* () {
      /* 更新登录信息 */
      const data = {
        'last_login_time': new Date().valueOf(),
        'last_login_ip': _ip2int(ip)
      };
      const use = yield _this.where({ id: user.id }).update(data);
      yield _this.where({ id: user.id }).increment('login');
    })();
  }
  /**
    * 用户登录认证
    * @param  string  $username 用户名
    * @param  string  $password 用户密码
    * @param  integer $type     用户名类型 （1-用户名，2-邮箱，3-手机，4-UID）
    * @param  {int} login 登陆方式 0-前台登陆 ， 1-后台登陆
    * @return integer           登录成功-用户ID，登录失败-错误编号
    */
  login(username, password, ip, type = 1, login = 0) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      console.log('tableName--ucenter_member');
      let map = {};
      switch (type) {
        case 1:
          map.username = username;
          break;
        case 2:
          map.email = username;
          break;
        case 3:
          map.mobile = username;
          break;
        case 4:
          map.id = username;
          break;
        case 5:
          map = {
            username: username,
            email: username,
            mobile: username,
            _logic: 'OR'
          };
          break;
        default:
          return 0; // 参数错误
      }
      const user = yield _this2.where(map).find();
      if (!think.isEmpty(user) && user.status == 1) {
        // 验证是否是管理用户
        if (login == 1) {
          if (user.is_admin == 0) {
            return -3; // 不是管理用户，不能登陆后台
          }
        }
        /* 验证用户密码 */
        if (password === user.password) {
          yield _this2.autoLogin(user, ip); // 更新用户登录信息，自动登陆
          /* 记录登录SESSION和COOKIES */
          const userInfo = {
            'uid': user.id,
            'username': user.username,
            'last_login_time': user.last_login_time
          };
          console.log('userInfo');

          console.log(userInfo);
          return userInfo; // 登录成功，返回用户信息
        } else {
          return -2; // 密码错误
        }
      } else {
        return -1; // 用户不存在或被禁用
      }
    })();
  }

};
//# sourceMappingURL=ucenter_member.js.map