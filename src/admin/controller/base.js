module.exports = class extends think.Controller {
  async __before() {
    console.log('request.host'+this.ctx.request.host);
    this.assign('_PUBLIC_',  'http://'+this.ctx.request.host+'/public');

    this.user =await this.session('userInfo');
  	 if(!this.user){
  	 	  	return this.redirect('public/login','admin');
  	}
    /** 菜单当前状态
     *  权限验证超级管理员
     */
    const url = this.ctx.controller+'/'+this.ctx.action;
    console.log(url);
    
    this.is_admin = this.isadmin(this.user);
     if (!this.is_admin) {

    let requestPublic = await this.config('request_public');
    console.log(requestPublic);
    if(!requestPublic.includes( 'admin/'+url)){
      console.log('不存在');
      const auth = this.service('rbac', 'admin',this.user.uid);
      const res = await auth.check(url);
      if (!res) {
        if ( this.isAjax('post')) {
          return this.fail('没有权限');
        }else{
          return this.errorAction('没有权限');
       }
      }
    }else{
      console.log('存在哟');
    }
  }
    this.sidebar = await this.session('sidebar');

    if(!this.sidebar){
       const ids = await this.getRuleIds();
       const menus = await this.getSideBar(ids);
       console.log(menus);
       await this.session('sidebar', menus);
       this.sidebar = menus;
    }
    this.assign('description', await this.session('description'));
    this.assign('sidebar',  this.sidebar);
    this.assign('userInfo', this.user);


	}
  /**
     * 检查当前用户是否为管理员
     * @param uid
     * @returns {*|boolean}
     */
  async isadmin(uid) {
    uid = uid || null;
    return uid &&  this.config('user_administrator');
  }
  async getRuleIds(){
     let  data= await think.model('auth_user_role').alias('a').join({
      table: 'auth_role',
      as: 'b',
      on: ['role_id', 'id']
    }).where({
      'a.user_id': this.user.uid,
      'b.status': 1
    }).select();
    let ids = [];
    data.forEach(item => {
      const ruleIds = (item.rule_ids || '').split(',');
      ids = ids.concat(ruleIds);
      this.session('description',item.description);
    });

    return ids;
  }
  async getSideBar(ids){
      const ruleModel = think.model('auth_rule');
      let rules = await ruleModel.field('id,pid,path,name,desc,icon,type,sort').where({id: ['IN', ids], status: 1,is_show:1}).order('pid,sort ASC').select();
      let group = [];
      if (rules) {
            rules.forEach(item => {
            var path=(item.path).split("-");
            console.log('---------------'+path.length);
            switch(path.length){
              case 1:
                    group[item['id']] = item;
                    group[item['id']]['child'] = [];
                    break;
              case 2:
                    let index= path[1];
                    let  child2 = item;
                    child2['child'] = [];
                    group[index]['child'][item['id']]= child2;
                    break;
              case 3:
                  console.log(group[path[1]]['child'][path[2]]['child']);
                  group[path[1]]['child'][path[2]]['child'].push(item);
                   break;
             }
          });
      }
        group.forEach(item => {
            console.log(item['child']);
        });
      return group;
  }
  async successAction(message = '成功信息！', status = 0) {
    if (this.isJsonp()) {
      return this.jsonp({
        [this.config('errnoField')]: status,
        [this.config('errmsgField ')]: message
      });
    } else if (this.isAjax()) {
      return this.fail(status, message);
    }
    this.assign({
      status: status,
      message: message
    });

    return this.display('admin/success');
  }
  async errorAction(message = '错误信息！', status = 1000) {
    if (this.isJsonp()) {
      return this.jsonp({
        [this.config('errnoField')]: status,
        [this.config('errmsgField ')]: message
      });
    } else if (this.isAjax()) {
      return this.fail(status, message);
    }
    this.assign({
      status: status,
      message: message
    });

    return this.display('admin/error');
  }
};
