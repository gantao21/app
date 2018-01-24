$(function () {
    /*
     封装ajax
     author: gantao
     */
    //BW.对一些方法封装为了统一调到其他插件方法，方便随时修改
    var BW = {};
 	    $.post('getUserList',{aaa:'1111'}).success(function(data){
            if (data.errno==0) {
            	console.log('----');
            }else{
            	console.log('-2---');
            }
        });
 	$(".resource_delete").click(function (e) {
       	var selRow = $("#exampleTableEvents").bootstrapTable('getSelections');
       	var getOptions = $("#exampleTableEvents").bootstrapTable("getOptions");

       	console.log(getOptions.idField);
       	parent.layer.msg(getOptions.idField, {shift: 6});
        parent.layer.msg('aaaa', {shift: 6});


	});
});   