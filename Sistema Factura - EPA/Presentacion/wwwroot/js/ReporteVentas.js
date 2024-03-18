
var table;

$(document).ready(function () {

    ObtenerFecha();
    openTab('Ventas');
    var fechaInicio = $("#txtFechaInicio").val();
    var fechaFin = $("#txtFechaFin").val();

    $("#opcion1s").prop('checked', true);
    $("#opcion1").prop('checked', true);


});

$('#opcion2s').change(function () {
    if (this.checked) {
        $('#txtFechaFins').prop('disabled', true);
    } 
});


$('#opcion1s').change(function () {
    if (this.checked) {
        $('#txtFechaFins').prop('disabled', false);
    } 
});



$('#opcion2').change(function () {
    if (this.checked) {
        $('#txtFechaFin').prop('disabled', true);
    }
});


$('#opcion1').change(function () {
    if (this.checked) {
        $('#txtFechaFin').prop('disabled', false);
    }
});


//Buscar Ventas
$('#btnBuscar').on('click', function () {
    var fechaInicio = $("#txtFechaInicio").val();
    var fechaFin = $("#txtFechaFin").val();

    

    if ($('#opcion1').is(':checked')) {

        jQuery.ajax({
            url: "/Reporte/ObtenerVenta" + "?fechainicio=" + fechaInicio + "&fechafin=" + fechaFin + "&idtienda=" + 1 + "&cierre="+ 0,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                if (data != undefined && data != null) {

                    $("#tbReporte tbody").html("");
                    $.each(data, function (i, row) {

                        $("<tr>").append(
                            $("<td>").text(row["fechaVenta"]),
                            $("<td>").text(row["numeroDocumento"]),
                            $("<td>").text(row["nombreEmpleado"]),
                            $("<td>").text(row["cantidadUnidadesVendidas"]),
                            $("<td>").text(row["cantidadProductos"]),
                            $("<td>").text(row["totalVenta"])

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
    }

    if ($('#opcion2').is(':checked')) {
        
       
        jQuery.ajax({
            url: "/Reporte/ObtenerVenta" + "?fechainicio=" + fechaInicio + "&fechafin=" + fechaFin + "&idtienda=" + 1 + "&cierre=" + 1,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                if (data != undefined && data != null) {

                    $("#tbReporte tbody").html("");
                    $.each(data, function (i, row) {

                        $("<tr>").append(
                            $("<td>").text(row["fechaVenta"]),
                            $("<td>").text(row["numeroDocumento"]),
                            $("<td>").text(row["nombreEmpleado"]),
                            $("<td>").text(row["cantidadUnidadesVendidas"]),
                            $("<td>").text(row["cantidadProductos"]),
                            $("<td>").text(row["totalVenta"])

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


    }

})


//Buscar Productos
$('#btnBuscarProducto').on('click', function () {
    var fechaInicios = $("#txtFechaInicios").val();
    var fechaFins = $("#txtFechaFins").val();

    if ($('#opcion1s').is(':checked')) {
        jQuery.ajax({
            url: "/Reporte/ObtenerVentaProducto" + "?fechainicio=" + fechaInicios + "&fechafin=" + fechaFins + "&cierre=" + 0,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                if (data != undefined && data != null) {

                    $("#tbReporteProducto tbody").html("");
                    $.each(data, function (i, row) {

                        $("<tr>").append(
                            $("<td>").text(row["producto"]),
                            $("<td>").text(row["cantidadVendida"]),
                            $("<td>").text(row["total"])

                        ).appendTo("#tbReporteProducto tbody");

                    })

                }

            },
            error: function (error) {
                console.log(error)
            },
            beforeSend: function () {
            },

        });
    }

    if ($('#opcion2s').is(':checked')) {

        jQuery.ajax({
            url: "/Reporte/ObtenerVentaProducto" + "?fechainicio=" + fechaInicios + "&fechafin=" + fechaFins + "&cierre=" + 1,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                if (data != undefined && data != null) {

                    $("#tbReporteProducto tbody").html("");
                    $.each(data, function (i, row) {

                        $("<tr>").append(
                            $("<td>").text(row["producto"]),
                            $("<td>").text(row["cantidadVendida"]),
                            $("<td>").text(row["total"])

                        ).appendTo("#tbReporteProducto tbody");

                    })

                }

            },
            error: function (error) {
                console.log(error)
            },
            beforeSend: function () {
            },

        });

    }

   
})


$('#btnBuscarIngrediente').on('click', function () {

    var fecha = $("#txtFechaCierre").val();

    $.ajax({
        url: "/Reporte/CierreIngredienteVerificar" + "?cierre=" + 1 + "&fecha=" + fecha,
        type: "GET",
        dataType: "json",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (response) {
            if (response != null) {
                
                if (response != undefined && response != null) {
                    $("#tbReporteIngrediente tbody").html("");
                    $.each(response, function (i, row) {
                        // Verifica si cantidadUsada es diferente de 0 antes de agregar la fila
                        if (row["cantidadUsada"] != 0) {
                            $("<tr>").append(
                                $("<td>").text(row["nombreIngrediente"]),
                                $("<td>").text(row["cantidadUsada"])
                            ).appendTo("#tbReporteIngrediente tbody");
                        }
                    });
                    
                }
            } else {
                console.log("No se han devuelto datos.");
            }
        },
        error: function (xhr, status, error) {
           
        }
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
    document.getElementById('txtFechaFins').value = today;
    document.getElementById('txtFechaInicios').value = today;
    document.getElementById('txtFechaCierre').value = today;
}



function printData() {

    var tabActivo = obtenerTabActivo();
    var fechas = "";

    if ($('#tbReporte tbody tr').length == 0 && $('#tbReporteProducto tbody tr').length == 0 && $('#tbReporteIngrediente tbody tr').length == 0) {
        Swal.fire("Mensaje", "No existen datos para imprimir", "warning")
        return;
    } else if ($('#tbReporte tbody tr').length !== 0 && tabActivo ==="Ventas") {

        var divToPrint = document.getElementById("tbReporte");

        var fechaInicio = $("#txtFechaInicio").val();
        var fechaFin = $("#txtFechaFin").val();


        if ($("#txtFechaInicio").val() === $("#txtFechaFin").val()) {
            fechas = "<h4 style='text-align: center; font: 17px Calibri;'> Fecha: " + fechaInicio + "</h4>";
        } else {
            fechas = " <h4 style='text-align: center; font: 17px Calibri;'>Fecha Desde: " + fechaInicio + " Hasta: " + fechaFin + " </h4>";
        }

        var totalVenta = 0;
        $('#tbReporte tbody tr').each(function () {
            var totalVentaStr = $(this).find('td:last').text();
            var totalVentaValue = parseFloat(totalVentaStr.replace(',', '')) || 0;
            totalVenta += totalVentaValue;
        });

        var sumaRow = "<h4 style='text-align: right; font: 17px Calibri; border: 1px solid black; padding: 5px;'>Total: " + totalVenta.toFixed(2) + "</h4>";

        var style = "<style>table {width: 100%;font: 17px Calibri;} table, th, td {border: solid 1px #DDD; border-collapse: collapse;padding: 2px 3px;text-align: center;} td { text-align: center; }</style>";

        var newWin = window.open("");

        newWin.document.write(style);
        newWin.document.write("<h3>Reporte de Venta</h3>");
        newWin.document.write(fechas);
        newWin.document.write(divToPrint.outerHTML);
        newWin.document.write(sumaRow);
        newWin.print();
        newWin.close();


    } else if ($('#tbReporteProducto tbody tr').length !== 0 && tabActivo === "Productos") {

        var divToPrint = document.getElementById("tbReporteProducto");

        var fechaInicio = $("#txtFechaInicios").val();
        var fechaFin = $("#txtFechaFins").val();


        if ($("#txtFechaInicios").val() === $("#txtFechaFins").val()) {
            fechas = "<h4 style='text-align: center; font: 17px Calibri;'> Fecha: " + fechaInicio + "</h4>";
        } else {
            fechas = " <h4 style='text-align: center; font: 17px Calibri;'>Fecha Desde: " + fechaInicio + " Hasta: " + fechaFin + " </h4>";
        }

        var totalVenta = 0;
        $('#tbReporteProducto tbody tr').each(function () {
            var totalStr = $(this).find('td:last').text();
            var totalValue = parseFloat(totalStr.replace(',', '')) || 0;
            totalVenta += totalValue;
        });

        var sumaRow = "<h4 style='text-align: right; font: 17px Calibri; border: 1px solid black; padding: 5px;'>Total: " + totalVenta.toFixed(2) + "</h4>";

        var style = "<style>";
        style = style + "table {width: 100%;font: 17px Calibri;}";
        style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
        style = style + "padding: 2px 3px;text-align: center;}";
        style = style + "</style>";

        newWin = window.open("");


        newWin.document.write(style);
        newWin.document.write("<h3>Reporte de productos Vendidos</h3>");
        newWin.document.write(fechas);
        newWin.document.write(divToPrint.outerHTML);
        newWin.document.write(sumaRow);
        newWin.print();
        newWin.close();

    } else if ($('#tbReporteIngrediente tbody tr').length !== 0 && tabActivo === "Ingredientes") {

        var divToPrint = document.getElementById("tbReporteIngrediente");

        var fechaInicio = $("#txtFechaCierre").val();
        
        fechas = "<h4 style='text-align: center; font: 17px Calibri;'> Fecha: " + fechaInicio + "</h4>";

        var style = "<style>";
        style = style + "table {width: 100%;font: 17px Calibri;}";
        style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
        style = style + "padding: 2px 3px;text-align: center;}";
        style = style + "</style>";

        newWin = window.open("");


        newWin.document.write(style);
        newWin.document.write("<h3>Reporte de Ingredientes</h3>");
        newWin.document.write(fechas);
        newWin.document.write(divToPrint.outerHTML);
        newWin.print();
        newWin.close();
    }

 
}

function obtenerTabActivo() {
    var tabActivo = $('.tabs .tablink.active');
    if (tabActivo.length > 0) {
        return tabActivo.text();
    } else {
        return "Ninguna pestaña activa";
    }
}



function openTab(tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";

    for (i = 0; i < tablinks.length; i++) {
        if (tablinks[i].textContent.trim() === tabName) {
            tablinks[i].className += " active";
        }
    }
}

