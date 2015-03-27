# Jquery-Export
Using JsExport Plugin you can export your html table,Gridview,WebGrid to excel,doc,xml,ppt.

Eg:

<html>
<head>
//This Plugin will work only on new browsers that support html5.
//Don't forget to add jquery reference,without it the plugin will not work.
  $("#btn_export").click(function (e) {
               
                $("#gridview").jsExport({
                    type: "doc",
                    data: $("#gridview").html()
                });
                //window.open('data:application/pdf,' + encodeURIComponent(grid));
                e.preventDefault();
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
