var jsonData = '';
var addTmp = {
    "Rural": 0,
    "Urban": 0,
    "Year": 0
};
$.getJSON("./../dataFiles/json/stacked.json", function(json) {
    $(function() {
        jsonData = json;
        var htmlData = [];
        $.each(json, function(i, item) {
            htmlData.push("<tr><td>" + item.Year + "</td>");
            htmlData.push("<td>" + item.Rural + "</td>");
            htmlData.push("<td>" + item.Urban + "</td>");
            htmlData.push("<td><button class='del'> Delete </button></td></tr>")
        });
        $('#records_table').html(htmlData.join(""));
    });
});


$('#records_table').on('click', 'button', function() {
    var yr2remove = $(this).parent().parent().children().eq(0).text();
    $(this).parent().parent().remove();
    jsonData = $.grep(jsonData, function(e) {
        return e.Year != yr2remove
    });
    makeChart(jsonData);
});

$('#add_records').on('click', 'button', function() {
    var htmlData = [];
    htmlData.push("<tr><td>" + $('#x').val() + "</td>");
    htmlData.push("<td>" + $('#y').val() + "</td>");
    htmlData.push("<td>" + $('#z').val() + "</td>");
    htmlData.push("<td><button class='del'> Delete </button></td></tr>");

    $('#records_table').append(htmlData.join(""));
    addTmp["Rural"] = $('#x').val();
    addTmp["Urban"] = $('#y').val();
    addTmp["Year"] = $('#z').val();
    jsonData.push(addTmp);
    makeChart(jsonData);
});
