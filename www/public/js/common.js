(function (win, undefined) {
    /*
     封装ajax
     author: gantao
     */
    //BW.对一些方法封装为了统一调到其他插件方法，方便随时修改
    var BW = {};
 	    // $.post('getUserList',{aaa:'1111'}).success(function(data){
      //       if (data.errno==0) {
      //       	console.log('----');
      //       }else{
      //       	console.log('-2---');
      //       }
      //   });
     BW.ajaxGet = function(opts,callback){
            $.ajax({
            url: opts.sendHref,
            data:opts.data ? opts.data: '',
            global: false,
            type: "get",
            dataType: "html",
        }).done(function (ajaxData, status, xhr) {
           callback && callback(1, ajaxData);

        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            callback && callback(-1, '');
        });
  	};

 	$(".resource_delete").click(function (e) {
       	var selRow = $("#exampleTableEvents").bootstrapTable('getSelections');
       	var getOptions = $("#exampleTableEvents").bootstrapTable("getOptions");

       	console.log(getOptions.idField);
       	parent.layer.msg(getOptions.idField, {shift: 6});
        parent.layer.msg('aaaa', {shift: 6});
	});
 	var option = {sendHref:'add',data:'sssssss'}
   
      // ajax modal
    $(document).on('click', '[data-toggle="ajaxModal"]',
      function(e) {
        $('#ajaxModal').remove();
        e.preventDefault();
        var $this = $(this)
          , $remote = $this.data('remote') || $this.attr('href')
          , $modal = $('<div class="modal fade" id="ajaxModal"><div class="modal-body"></div></div>');
        $('body').append($modal);
        $modal.modal();
        $modal.load($remote);
      //    BW.ajaxGet(option, function (state, data) {
      //    // parent.layer.msg(state, {shift: 6});    
      //    parent.layer.open({
      //     type: 1,
      //     title: false,
      //     area: ['700px', '450px'],
      //     fixed: false, //不固定
      //     content: data
      //     });
      // }
    // );                
        });
        // console.log($modal);
        
    //页面层-自定义

  win.BW = BW;
}(window));