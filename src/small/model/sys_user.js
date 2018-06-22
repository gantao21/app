module.exports = class extends think.Model {
	 async userInfoByUserName(username) {
	 	  let data = await this.where({username: username}).find();
	    return data;
  	}
};
