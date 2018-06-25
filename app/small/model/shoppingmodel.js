function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = class extends think.Model {
	getShoppingData() {
		return _asyncToGenerator(function* () {
			let data = {
				"shoppingCategory": [{ "title": "特色市场", "hasActivity": "1", "list": [{
						"imgUrl": "images/markets/list/xihu.jpg",
						"shopName": "心水好货",
						"shopDesc": "新款春装上阵"
					}, {
						"imgUrl": "images/markets/list/dama.jpg",
						"shopName": "运动",
						"shopDesc": "轻松购出好身材"
					}, {
						"imgUrl": "images/markets/list/likeme.jpg",
						"shopName": "设计师",
						"shopDesc": "设计师新款来袭"
					}, {
						"imgUrl": "images/markets/list/trade.png",
						"shopName": "充值",
						"shopDesc": "话费全国通用"
					}] }, { "title": "全部商品", "hasActivity": "0", "list": [{
						"imgUrl": "images/goods/list/jacket.png",
						"shopName": "上衣",
						"shopDesc": "低价新品壁咚"
					}, {
						"imgUrl": "images/goods/list/trousers.jpg",
						"shopName": "裤子",
						"shopDesc": "春季最热卖"
					}, {
						"imgUrl": "images/goods/list/skirt.jpg",
						"shopName": "裙子",
						"shopDesc": "焕新你的衣橱"
					}, {
						"imgUrl": "images/goods/list/underwear.jpg",
						"shopName": "内衣",
						"shopDesc": "焕新由内而外"
					}, {
						"imgUrl": "images/goods/list/shoes.png",
						"shopName": "女鞋",
						"shopDesc": "好鞋不将旧"
					}] }],
				"shoplist": [{
					"imgUrl": "http://s18.mogucdn.com/p1/160506/upload_ifqtszldmmzdczjvhazdambqgyyde_315x315.png",
					"shopName": "长不大的少女心",
					"shopDesc": "我不想 我不想 不想长大"
				}, {
					"imgUrl": "http://s17.mogucdn.com/p1/160506/upload_ifrggndfmezdczjvhazdambqmeyde_315x315.png",
					"shopName": "长不大的少女心",
					"shopDesc": "我不想 我不想 不想长大"
				}, {
					"imgUrl": "http://s18.mogucdn.com/p1/160307/upload_ie4wgmdfmfqtaojsg4zdambqgqyde_315x315.jpg",
					"shopName": "创意生活",
					"shopDesc": "生活里，总需要小创意"
				}, {
					"imgUrl": "http://s17.mogucdn.com/p1/160325/upload_ie4gen3eguzdmnbyg4zdambqgiyde_315x315.png",
					"shopName": "创意生活",
					"shopDesc": "生活里，总需要小创意"
				}]
			};
			return data;
		})();
	}
};
//# sourceMappingURL=shoppingmodel.js.map