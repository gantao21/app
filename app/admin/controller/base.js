function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = class extends think.Controller {
  __before() {
    var _this = this;

    return _asyncToGenerator(function* () {
      _this.user = yield _this.session('userInfo');
      if (!_this.user) {
        return _this.redirect('public/login', 'admin');
      }
      /** 菜单当前状态
       *  权限验证超级管理员
       */
      const url = _this.ctx.controller + '/' + _this.ctx.action;
      console.log(url);

      _this.is_admin = _this.isadmin(_this.user);
      // if (!this.is_admin) {
      const auth = _this.service('rbac', 'admin', _this.user.uid);
      const res = yield auth.check(url);
      console.log(res);
      if (!res) {
        return _this.fail('没有权限');
      }
      // }
      _this.sidebar = yield _this.session('sidebar');

      if (!_this.sidebar) {
        const ids = yield _this.getRuleIds();
        const menus = yield _this.getSideBar(ids);
        console.log(menus);
        yield _this.session('sidebar', menus);
        _this.sidebar = menus;
      }
      _this.assign('description', (yield _this.session('description')));
      _this.assign('sidebar', _this.sidebar);
      _this.assign('userInfo', _this.user);
    })();
  }
  /**
     * 检查当前用户是否为管理员
     * @param uid
     * @returns {*|boolean}
     */
  isadmin(uid) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      uid = uid || null;
      return uid && in_array(parseInt(uid), _this2.config('user_administrator'));
    })();
  }
  getRuleIds() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      let data = yield think.model('auth_user_role').alias('a').join({
        table: 'auth_role',
        as: 'b',
        on: ['role_id', 'id']
      }).where({
        'a.user_id': _this3.user.uid,
        'b.status': 1
      }).select();
      let ids = [];
      data.forEach(function (item) {
        const ruleIds = (item.rule_ids || '').split(',');
        ids = ids.concat(ruleIds);
        _this3.session('description', item.description);
      });

      return ids;
    })();
  }
  getSideBar(ids) {
    return _asyncToGenerator(function* () {
      const ruleModel = think.model('auth_rule');
      let rules = yield ruleModel.field('id,pid,path,name,desc,icon,type,sort').where({ id: ['IN', ids], status: 1, is_show: 1 }).order('pid,sort ASC').select();
      let group = [];
      // if (rules) {
      //     // for (var i = 0; i < rules.length; i++) {
      //       // let item = rules[i];
      //       rules.forEach(item => {
      //       if(item.pid == 0){
      //             group[item.id] = item;
      //             group[item.id]['child'] = [];
      //       }else{
      //             group[item.pid]['child'].push(item);

      //       }
      //     });
      //     // }

      // }
      if (rules) {
        rules.forEach(function (item) {
          var path = item.path.split("-");
          console.log('---------------' + path.length);
          switch (path.length) {
            case 1:
              group[item['id']] = item;
              group[item['id']]['child'] = [];
              break;
            case 2:
              let index = path[1];
              let child2 = item;
              child2['child'] = [];
              group[index]['child'][item['id']] = child2;
              break;
            case 3:
              console.log(group[path[1]]['child'][path[2]]['child']);
              group[path[1]]['child'][path[2]]['child'].push(item);
              break;
          }
        });
      }
      group.forEach(function (item) {
        console.log(item['child']);
      });
      return group;
    })();
  }
};
//# sourceMappingURL=base.js.map