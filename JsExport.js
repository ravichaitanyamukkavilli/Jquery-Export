(function ($) {

    $.fn.jsExport = function (options) {

        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            type: "excel",
            data: ""
        }, options);

        switch (settings.type) {

            case "excel":
                window.open("data:application/vnd.ms-excel," + encodeURIComponent(settings.data));
                break;
            case "doc":
                window.open("data:application/msword," + encodeURIComponent(settings.data));
                break;
            case "ppt":
                window.open("data:application/vnd.ms-powerpoint," + encodeURIComponent(settings.data));
                break;
            case "xml":
                window.open("data:application/xml," + encodeURIComponent(settings.data));
                break;
        }
        return true;
    };
}(jQuery));
