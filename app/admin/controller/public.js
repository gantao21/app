function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = class extends think.Controller {
  __before() {
    this.assign('_PUBLIC_', 'http://127.0.0.1:1234/public');
  }
  loginAction() {
    var _this = this;

    return _asyncToGenerator(function* () {
      const method = _this.method; // 获取当前请求类型
      if (method === 'POST') {
        let username = _this.post('username');
        let password = _this.post('password');
        let member = _this.model('ucenter_member');
        password = encryptPassword(password);
        const res = yield member.login(username, password, _this.ip, 1, 1);
        if (res.uid > 0) {
          yield _this.session('userInfo', res);

          return _this.success({ name: '登陆成功!', url: '/admin/index' });
        } else {
          let fail;
          switch (res) {
            case -1:
              fail = '用户不存在或被禁用';
              break; // 系统级别禁用
            case -2:
              fail = '密码错误';
              break;
            case -3:
              fail = '您无权登陆后台！';
              break;
            default:
              fail = '未知错误'; // 0-接口参数错误（调试阶段使用）
          }
          return _this.fail(fail);
        }
      } else {
        const is_login = yield _this.islogin();
        if (is_login) {
          return _this.redirect('/admin/index');
        } else {
          return _this.display();
        }
      }
      return _this.display();
    })();
  }
  logoutAction() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      yield _this2.session(null);
      return _this2.redirect('login', 'admin');
    })();
  }
  islogin() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const user = yield _this3.session('userInfo');
      const res = !think.isEmpty(user);
      return res;
    })();
  }
};
//# sourceMappingURL=public.js.map