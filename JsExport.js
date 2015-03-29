        (function ($) {

            $.fn.jsExport = function (options) {

                // This is the easiest way to have default options.
                var settings = $.extend({
                    // These are the defaults.
                    type: "excel",
                    data: "",
                    paging: false
                }, options);

                switch (settings.type) {

                    case "excel":
                        if (settings.paging) {
                            var table = makeTable(settings.data);
                            
                            window.open("data:application/vnd.ms-excel," + encodeURIComponent(table));
                        }
                        else {
                            window.open("data:application/vnd.ms-excel," + encodeURIComponent(settings.data));
                        }
                        
                        break;
                    case "doc":
                        if (settings.paging) {
                            var table = makeTable(settings.data);
                            window.open("data:application/msword," + encodeURIComponent(table));
                        }
                        else {
                            window.open("data:application/msword," + encodeURIComponent(settings.data));
                        }
                        
                        break;
                  
                    case "xml":
                        if (settings.paging) {
                            var table = makeTable(settings.data);
                            window.open("data:application/xml," + encodeURIComponent(table));
                        }
                        else {
                            window.open("data:application/xml," + encodeURIComponent(settings.data));
                        }
                        
                        break;
                    
                }
                function makeTable(data) {
                    var table = '<div id=tempdiv><table id="tempid">';
                    var tbl_body = "";

                    var HeadKeys = "";

                    $.each($.parseJSON(data), function () {
                        var tbl_row = "";
                        HeadKeys = '';
                        $.each(this, function (k, v) {
                            tbl_row += "<td>" + v + "</td>";
                            HeadKeys += '<td><b>' + k + '</b></td>';
                        })
                        tbl_body += "<tr>" + tbl_row + "</tr>";
                    });
                    table += HeadKeys + "</tr>" + tbl_body + '</table></div>';
                    return table;
                }
                
                return true;
            };
        }(jQuery));
    };
}(jQuery));
