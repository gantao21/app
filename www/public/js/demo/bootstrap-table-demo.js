/*!
 * Remark (http://getbootstrapadmin.com/remark)
 * Copyright 2015 amazingsurge
 * Licensed under the Themeforest Standard Licenses
 */
function cellStyle(value, row, index) {
  var classes = ['active', 'success', 'info', 'warning', 'danger'];

  if (index % 2 === 0 && index / 2 < classes.length) {
    return {
      classes: classes[index / 2]
    };
  }
  return {};
}

function rowStyle(row, index) {
  var classes = ['active', 'success', 'info', 'warning', 'danger'];

  if (index % 2 === 0 && index / 2 < classes.length) {
    return {
      classes: classes[index / 2]
    };
  }
  return {};
}

function scoreSorter(a, b) {
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
}

function nameFormatter(value) {
  return value + '<i class="icon wb-book" aria-hidden="true"></i> ';
}

function starsFormatter(value) {
  return '<i class="icon wb-star" aria-hidden="true"></i> ' + value;
}

function queryParams() {
  return {
    type: 'owner',
    sort: 'updated',
    direction: 'desc',
    per_page: 100,
    page: 1
  };
}

function buildTable($el, cells, rows) {
  var i, j, row,
    columns = [],
    data = [];

  for (i = 0; i < cells; i++) {
    columns.push({
      field: '字段' + i,
      title: '单元' + i
    });
  }
  for (i = 0; i < rows; i++) {
    row = {};
    for (j = 0; j < cells; j++) {
      row['字段' + j] = 'Row-' + i + '-' + j;
    }
    data.push(row);
  }
  $el.bootstrapTable('destroy').bootstrapTable({
    columns: columns,
    data: data,
    iconSize: 'outline',
    icons: {
      columns: 'glyphicon-list'
    }
  });
}

(function(document, window, $) {
  'use strict';

  // Example Bootstrap Table From Data
  // ---------------------------------
  // (function() {
  //   var bt_data = [{
  //     "Tid": "1",
  //     "First": "奔波儿灞",
  //     "sex": "男",
  //     "Score": "50"
  //   }, {
  //     "Tid": "2",
  //     "First": "灞波儿奔",
  //     "sex": "男",
  //     "Score": "94"
  //   }, {
  //     "Tid": "3",
  //     "First": "作家崔成浩",
  //     "sex": "男",
  //     "Score": "80"
  //   }, {
  //     "Tid": "4",
  //     "First": "韩寒",
  //     "sex": "男",
  //     "Score": "67"
  //   }, {
  //     "Tid": "5",
  //     "First": "郭敬明",
  //     "sex": "男",
  //     "Score": "100"
  //   }, {
  //     "Tid": "6",
  //     "First": "马云",
  //     "sex": "男",
  //     "Score": "77"
  //   }, {
  //     "Tid": "7",
  //     "First": "范爷",
  //     "sex": "女",
  //     "Score": "87"
  //   }];


  //   $('#exampleTableFromData').bootstrapTable({
  //     data: bt_data,
  //     // mobileResponsive: true,
  //     height: "250"
  //   });
  // })();

  // Example Bootstrap Table Columns
  // -------------------------------
  // (function() {
  //   $('#exampleTableColumns').bootstrapTable({
  //     url: "http://127.0.0.1:1234/public/js/demo/bootstrap_table_test.json",
  //     height: "400",
  //     iconSize: 'outline',
  //     showColumns: true,
  //     icons: {
  //       refresh: 'glyphicon-repeat',
  //       toggle: 'glyphicon-list-alt',
  //       columns: 'glyphicon-list'
  //     }
  //   });
  // })();


  // Example Bootstrap Table Large Columns
  // -------------------------------------
  buildTable($('#exampleTableLargeColumns'), 50, 50);


  // Example Bootstrap Table Toolbar
  // -------------------------------
  // (function() {
  //   $('#exampleTableToolbar').bootstrapTable({
  //     url: "http://127.0.0.1:1234/public/js/demo/bootstrap_table_test2.json",
  //     search: true,
  //     showRefresh: true,
  //     showToggle: true,
  //     showColumns: true,
  //     toolbar: '#exampleToolbar',
  //     iconSize: 'outline',
  //     icons: {
  //       refresh: 'glyphicon-repeat',
  //       toggle: 'glyphicon-list-alt',
  //       columns: 'glyphicon-list'
  //     }
  //   });
  // })();


  // Example Bootstrap Table Events
  // ------------------------------
  (function() {
    $('#exampleTableEvents').bootstrapTable({
      url: "getUserList",
      search: true,
      sidePagination: "server",
      pagination: true,
      sortable: true, 
      showRefresh: true,
      showToggle: true,
      showColumns: true,
      iconSize: 'outline',
      toolbar: '#exampleTableEventsToolbar',
      // icons: {
      //   refresh: 'glyphicon-repeat',
      //   toggle: 'glyphicon-list-alt',
      //   columns: 'glyphicon-list'
      // }

    });

    var $result = $('#examplebtTableEventsResult');

    $('#exampleTableEvents').on('all.bs.table', function(e, name, args) {
        console.log('Event:', name, ', data:', args);
      })
      .on('click-row.bs.table', function(e, row, $element) {
        $result.text('点击行事件'+JSON.stringify(row));
      })
      .on('dbl-click-row.bs.table', function(e, row, $element) {
        $result.text('双击行事件'+JSON.stringify(row));
      })
      .on('sort.bs.table', function(e, name, order) {
        $result.text('排序事件 当前' + name + '列，以' + order + '排列');
      })
      .on('check.bs.table', function(e, row) {
        $result.text('checkbox选中事件'+JSON.stringify(row));
      })
      .on('uncheck.bs.table', function(e, row) {
        $result.text('checkbox取消选中事件'+JSON.stringify(row));
      })
      .on('check-all.bs.table', function(e) {
        $result.text('全选');
      })
      .on('uncheck-all.bs.table', function(e) {
        $result.text('取消全选');
      })
      .on('load-success.bs.table', function(e, data) {
        $result.text('加载完成事件');
      })
      .on('load-error.bs.table', function(e, status) {
        $result.text('加载错误事件');
      })
      .on('column-switch.bs.table', function(e, field, checked) {
        $result.text('筛选列事件 ');
      })
      .on('page-change.bs.table', function(e, size, number) {
        $result.text('切换页事件 当前页数：第' + number + "页，每页显示数量" + size + "条");
      })
      .on('search.bs.table', function(e, text) {
        $result.text('搜索事件');
      });
  })();
  
})(document, window, jQuery);
