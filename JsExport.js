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
                        textalign: "center"
                    }
                   
                }, options);

                switch (settings.type) {

                    case "excel":
                        if (settings.paging.paging) {
                            var table = makeTable(settings.data.d);
                            
                            window.open("data:application/vnd.ms-excel," + encodeURIComponent(table));
                        }
                        else {
                            window.open("data:application/vnd.ms-excel," + encodeURIComponent(settings.data));
                        }
                        
                        break;
                    case "doc":
                        if (settings.paging.paging) {
                            var table = makeTable(settings.data);
                            window.open("data:application/msword," + encodeURIComponent(table));
                        }
                        else {
                            window.open("data:application/msword," + encodeURIComponent(settings.data));
                        }
                        
                        break;
                  
                    case "xml":
                        window.open("data:application/xml," + encodeURIComponent(settings.data));
                        break;
                    
                }
                function makeTable(data) {
                    var table = '<div id=tempdiv><table id="tempid" border="1" ;style=width:100%; height:100%; font='+settings.font+">";
                    var tbl_body = "";

                    var HeadKeys = "";
                    var i = 0;
                    $.each($.parseJSON(data), function () {
                        var tbl_row = "";
                        HeadKeys = '';
                        $.each(this, function (k, v) {
                          
                            tbl_row += "<td style=text-align:'" + settings.paging.textalign + "'>" + v + "</td>";
                            HeadKeys += "<td style=background-color:'" + settings.paging.HeaderColor + "';text-align:'" + settings.paging.textalign + "'><h3>" + k + '</h3></td>';
                        })
                        if (i%2==0) {
                            tbl_body += "<tr style=background-color:'" + settings.paging.alternateRowColor + "';text-align:'" + settings.paging.textalign + "'>" + tbl_row + "</tr>";
                        }
                        else {
                            tbl_body += "<tr style=text-align:'" + settings.paging.textalign + "'>" + tbl_row + "</tr>";
                        }
                        i++;
                    });
                    table += HeadKeys + "</tr>" + tbl_body + '</table></div>';
                    return table;
                }
                
                return true;
            };
        }(jQuery));
