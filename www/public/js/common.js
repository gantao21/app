  $(".resource_delete").click(function (e) {
        var selRow = $("#exampleTableEvents").bootstrapTable('getSelections');
        parent.layer.msg(selRow, {shift: 6});

});