(function ($) {

    $.jsExport = function (options) {

        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            type: "excel",
            data: "",
            paging: {
                paging: false,
                alternateRowColor: "white",
                HeaderColor: "white",
                font: "bold 10px arial",
                textalign: "center",
                headerFontColor: "black",
                rowfontColor: "black"
            },
            filename: "download"

        }, options);

        switch (settings.type) {

            case "excel":
                if (settings.paging.paging) {
                    // var table = makeTable(settings.data);
                    if (settings.data.d != undefined) {
                        var table = makeTable(settings.data.d);
                        downloadFile(settings.filename + '.xls', 'data:application/vnd.ms-excel,' + encodeURIComponent(table));

                    }
                    else {
                        var table = makeTable(settings.data);
                        downloadFile(settings.filename + '.xls', 'data:application/vnd.ms-excel,' + encodeURIComponent(table));

                    }

                }
                else {
                    downloadFile(settings.filename + '.xls', 'data:application/vnd.ms-excel,' + encodeURIComponent(settings.data));

                }

                break;
            case "doc":
                if (settings.paging.paging) {
                    if (settings.data.d != undefined) {
                        var table = makeTable(settings.data.d);
                          downloadFile(settings.filename + '.doc', 'data:application/msword,' + encodeURIComponent(table));
                    }
                    else {
                        var table = makeTable(settings.data);
                        downloadFile(settings.filename + '.doc', 'data:application/msword,' + encodeURIComponent(table));

                    }

                }
                else {
                    downloadFile(settings.filename + '.doc', 'data:application/msword,' + encodeURIComponent(settings.data));
                }

                break;

            case "csv":
                 if (settings.paging.paging) {
                if (settings.data.d != undefined) {
                    var csv = convertCSV(settings.data.d);
                    downloadFile(settings.filename + '.csv', 'data:text/csv;charset=UTF-8,' + encodeURIComponent(csv));

                }
                else {
                    var csv = convertCSV(settings.data);
                    downloadFile(settings.filename + '.csv', 'data:text/csv;charset=UTF-8,' + encodeURIComponent(csv));

                }
            }
             else {
                    downloadFile(settings.filename + '.csv', 'data:text/csv;charset=UTF-8,' + encodeURIComponent(settings.data));
                }
                break;

        }
        function downloadFile(fileName, urlData) {

            var aLink = document.createElement('a');
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("click");
            aLink.download = fileName;
            aLink.href = urlData;
            aLink.dispatchEvent(evt);
        }



        function convertCSV(data) {

            var array = typeof objArray != 'object' ? JSON.parse(data) : objArray;
            if (settings.data.d != undefined) {
                data = $.parseJSON(data);
            }

            var str = '';

            for (var index in array[0]) {

                //Now convert each value to string and comma-seprated
                str += index + ',';
            }

            str = str.slice(0, -1);

            //append Label row with line break
            str += '\r\n';
            for (var i = 0; i < array.length; i++) {
                var line = '';
                for (var index in array[i]) {
                    if (line != '') line += ','

                    line += array[i][index];
                }

                str += line + '\r\n';
            }

            return str;
        }
        function makeTable(data) {
            var table = '<div id=tempdiv><table id="tempid" border="1" ;style=width:100%; height:100%; font=' + settings.paging.font + "'>";
            var tbl_body = "";

            var HeadKeys = "";
            var i = 0;
            if (settings.data.d != undefined) {
                data = $.parseJSON(data);
            }
            $.each(data, function () {
                var tbl_row = "";
                HeadKeys = '';
                $.each(this, function (k, v) {

                    tbl_row += "<td style=text-align:'" + settings.paging.textalign + "';color:'" + settings.paging.rowfontColor + "'>" + v + "</td>";
                    HeadKeys += "<td style=background-color:'" + settings.paging.HeaderColor + "';text-align:'" + settings.paging.textalign + "';color:'" + settings.paging.headerFontColor + "'><h3>" + k + '</h3></td>';
                })
                if (i % 2 == 0) {
                    tbl_body += "<tr style=background-color:'" + settings.paging.alternateRowColor + "';text-align:'" + settings.paging.textalign + "';color:'" + settings.paging.rowfontColor + "'>" + tbl_row + "</tr>";
                }
                else {
                    tbl_body += "<tr style=text-align:'" + settings.paging.textalign + "';color:'" + settings.paging.rowfontColor + "'>" + tbl_row + "</tr>";
                }
                i++;
            });

            table += HeadKeys + "</tr>" + tbl_body + '</table></div>';
            return table;
        }

        return true;
    };
}(jQuery));
