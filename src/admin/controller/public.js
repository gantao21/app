module.exports = class extends think.Controller {
  __before() {
    this.assign('_PUBLIC_',  'http://'+this.ctx.request.host+'/public');
  };
  async loginAction() {
    const method = this.method; // 获取当前请求类型
    if(method === 'POST') {
      let username =  this.post('username');
      let password =  this.post('password');
      let member = this.model('ucenter_member');
      password =  encryptPassword(password);
      const res = await member.login(username, password, this.ip, 1, 1);
      if(res.uid>0){
        await this.session('userInfo', res);
      
        return this.success({name: '登陆成功!', url: '/admin/index'});
      }else{
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
        return this.fail(fail);
      }

    }else{
      const is_login = await this.islogin();
        if (is_login) {
        return this.redirect('/admin/index');
      } else {
        return this.display();
      }
    }
    return this.display();
  }
  async logoutAction(){
      await this.session(null);
      return this.redirect('login','admin');

  }
  async islogin() {
    const user = await this.session('userInfo');
    const res = !think.isEmpty(user);
    return res;
  }
};
