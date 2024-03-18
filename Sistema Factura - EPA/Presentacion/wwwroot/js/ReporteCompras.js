var table;

$(document).ready(function () {

    ObtenerFecha();
   

});

//Buscar Compras
$('#btnBuscar').on('click', function () {
    var fechaInicio = $("#txtFechaInicio").val();
    var fechaFin = $("#txtFechaFin").val();

    jQuery.ajax({
        url: "/Reporte/ObtenerCompra" + "?fechainicio=" + fechaInicio + "&fechafin=" + fechaFin,
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            if (data != undefined && data != null) {

                $("#tbReporte tbody").html("");
                $.each(data, function (i, row) {

                    $("<tr>").append(
                        $("<td>").text(row["codigo"]),
                        $("<td>").text(row["fecha"]),
                        $("<td>").text(row["proveedor"]),
                        $("<td>").text(row["total"])
                    ).appendTo("#tbReporte tbody");

                })

            }

        },
        error: function (error) {
            console.log(error)
        },
        beforeSend: function () {
        },

    });
})


function ObtenerFecha() {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    document.getElementById('txtFechaFin').value = today;
    document.getElementById('txtFechaInicio').value = today;
}



//function printData() {

  

//    if ($('#tbReporte tbody tr').length == 0 ) {
//        Swal.fire("Mensaje", "No existen datos para imprimir", "warning")
//        return;
//    } 

//        var divToPrint = document.getElementById("tbReporte");

//        var style = "<style>";
//        style = style + "table {width: 100%;font: 17px Calibri;}";
//        style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
//        style = style + "padding: 2px 3px;text-align: center;}";
//        style = style + "</style>";

//        newWin = window.open("");


//        newWin.document.write(style);
//        newWin.document.write("<h3>Reporte de Compras</h3>");
//        newWin.document.write(divToPrint.outerHTML);
//        newWin.print();
//        newWin.close();

//}

function printData() {
    var fechas = "";
    // Verificar si hay datos en la tabla
    if ($('#tbReporte tbody tr').length === 0) {
        Swal.fire("Mensaje", "No existen datos para imprimir", "warning");
        return;
    }
    var fechaInicio = $("#txtFechaInicio").val();
    var fechaFin = $("#txtFechaFin").val();


    // Calcular la suma de la columna "Total Compra"
    var totalCompra = 0;
    $('#tbReporte tbody tr').each(function () {
        var totalCompraStr = $(this).find('td:last').text();
        var totalCompraValue = parseFloat(totalCompraStr.replace(',', '')) || 0;
        totalCompra += totalCompraValue;
    });

    if ($("#txtFechaInicio").val() === $("#txtFechaFin").val()) {
        fechas = "<h4 style='text-align: center; font: 17px Calibri;'> Fecha: " + fechaInicio +"</h4>";
    } else {
        fechas = " <h4 style='text-align: center; font: 17px Calibri;'>Fecha Desde: " + fechaInicio + " Hasta: " + fechaFin +" </h4>";
    }
     
    // Crear una fila adicional con la suma al lado derecho
    var sumaRow = "<h4 style='text-align: right; border: 1px solid black; font: 17px Calibri;'> Total: " + totalCompra.toFixed(2) + "</h4>";

    var divToPrint = document.getElementById("tbReporte");
    var style = "<style>table {width: 100%;font: 17px Calibri;} table, th, td {border: solid 1px #DDD; border-collapse: collapse;padding: 2px 3px;text-align: center;}</style>";
    var contentToPrint = "<h3>Reporte de Compras</h3>" + fechas + divToPrint.outerHTML + sumaRow;

    var newWin = window.open("");
    newWin.document.write(style);
    newWin.document.write(contentToPrint);
    newWin.print();
    newWin.close();
}
