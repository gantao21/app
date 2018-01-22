
/**
 * ip转数字
 * @param ip
 * @returns {number}
 * @private
 */
global._ip2int = function(ip) {
  var num = 0;
  ip = ip.split('.');
  num = Number(ip[0]) * 256 * 256 * 256 + Number(ip[1]) * 256 * 256 + Number(ip[2]) * 256 + Number(ip[3]);
  num = num >>> 0;
  return num;
};
/**
 * 数字转ip
 * @param num
 * @returns {string|*}
 * @private
 */
global._int2iP = function(num) {
  var str;
  var tt = new Array();
  tt[0] = (num >>> 24) >>> 0;
  tt[1] = ((num << 8) >>> 24) >>> 0;
  tt[2] = (num << 16) >>> 24;
  tt[3] = (num << 24) >>> 24;
  str = String(tt[0]) + '.' + String(tt[1]) + '.' + String(tt[2]) + '.' + String(tt[3]);
  return str;
};

/**
 * 密码加密
 * @param password 加密的密码
 * @param md5encoded true-密码不加密，默认加密
 * @returns {*}
 */
global.encryptPassword = function(password, md5encoded) {
  md5encoded = md5encoded || false;
  password = md5encoded ? password : think.md5(password);
  //think.md5('www.cmswing.com') + 
  // think.md5('Arterli')
  // console.log('password:'+think.md5(password));
  return think.md5(password);
};
/**
 * 数组去重
 * @param arr
 * @returns {Array}
 */
global.unique = function(arr) {
  // var result = [], hash = {};
  // for (var i = 0, elem; (elem = arr[i]) != null; i++) {
  //     if (!hash[elem]) {
  //         result.push(elem);
  //         hash[elem] = true;
  //     }
  // }
  // return result;
  return Array.from(new Set(arr));
};
/**
 * in_array
 * @param stringToSearch
 * @param arrayToSearch
 * @returns {boolean}
 */
global.in_array = function(stringToSearch, arrayToSearch) {
  for (let s = 0; s < arrayToSearch.length; s++) {
    const thisEntry = arrayToSearch[s].toString();
    if (thisEntry == stringToSearch) {
      return true;
    }
  }
  return false;
};
/**
 * global times
 * 时间格式化
 * @param d
 * @returns {string}
 */
global.times = function(d, sec) {
  var time;
  var date = new Date(d);
  var y = date.getFullYear();
  var M = date.getMonth() + 1;
  M = M < 10 ? '0' + M : M;
  var d = date.getDate();
  d = d < 10 ? '0' + d : d;
  var h = date.getHours();
  h = h < 10 ? '0' + h : h;
  var m = date.getMinutes();
  m = m < 10 ? '0' + m : m;
  var s = date.getSeconds();
  s = s < 10 ? '0' + s : s;
  if (sec) {
    time = y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
  } else {
    time = y + '-' + M + '-' + d + ' ' + h + ':' + m;
  }

  return time;
};

