Using JsExport Plugin you can export your html table,Gridview,WebGrid to excel,doc,xml.
along with header color,Alternate Row Color,txtalign,font.
Eg:

<html>
<head>
//This Plugin will work only on new browsers that support html5.
//Don't forget to add jquery reference,without it the plugin will not work.
   $("#btn_export").click(function () {
                var status = false;
                var data = "";
                
                var table = $.ajax({
                    type: "POST",
                    context: document.body,
                    global: false,
                    async: false,
                    dataType: "json",
                  
                    contentType: "application/json; charset=utf-8",
                    url: "WebForm1.aspx/getDataq",
                    success: function (data) {
                        return data;
                    },
                    dataFilter: function (data) {
                        // This boils the response string down 
                        //  into a proper JavaScript Object().
                        var msg = eval('(' + data + ')');

                        // If the response has a ".d" top-level property,
                        //  return what's below that instead.
                        if (msg.hasOwnProperty('d'))
                            return msg.d;
                        else
                            return msg;
                    },

                }).responseText;
             table=$.parseJSON(table);
               //For asp.net 3.5 above application make sure that you send only d property value as the parameter.
                  $.jsExport({
                 type: 'excel',
                 paging: {
                     paging: true,
                     alternateRowColor: "#f6eded",
                     HeaderColor: "lightblue",
                     textalign: "left",
                     font: "bold 12px arial"
                 },
                 data: table,
                
             });
                     
</head>
<body>
<form id="form1" runat="server">

// you must place the gridview or html table inside a div inorder to work properly.
    <div id="gridview">

        <asp:GridView runat="server" ID="grdview"></asp:GridView>
        </div>
        <asp:Button Text="export" runat="server" ID="btn_export" />
    </form>
</body>
</html>
