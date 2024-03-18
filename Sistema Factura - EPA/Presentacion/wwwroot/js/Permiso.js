

var tabladata;
$(document).ready(function () {

    //OBTENER Roles PARA LLENAR LA LISTA DESPLEGABLE
    jQuery.ajax({
        "url": "/Role/Obtener",
        "type": "GET",
        "datatype": "json",
        contentType: "application/json; charset=utf-8",
        "dataSrc": "",
        success: function (data) {

            $("#cboRol").html("");

            if (data != null) {
                $.each(data, function (i, item) {

                    if (item.estado == true) {

                        $("<option>").attr({ "value": item.id }).text(item.name).appendTo("#cboRol");
                    }
                })
                $("#cboRol").val($("#cboRol option:first").val());
            }


        },
        error: function (error) {
            console.log(error)
        },
        beforeSend: function () {
        },
    });

})


function buscar() {
    if ($("#cboRol").val() == 0) {
        swal("Mensaje", "Seleccione un rol", "warning")
        return;
    }
    //OBTENER PERMISOS
    jQuery.ajax({
        url: "/Permiso/Obtener" + "?id=" + $("#cboRol").val(),
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
           
            $("#tbpermiso tbody").html("");

            if (data != undefined) {
                $.each(data, function (i, row) {
                    $("<tr>").append(
                        $("<td>").text(i + 1),
                        $("<td>").append(
                            $("<input>").attr({ "type": "checkbox" }).data("IdPermiso", row.idPermisos).prop('checked', row.activo)
                        ),
                        $("<td>").text(row.menu),
                        $("<td>").text(row.subMenu)
                    ).appendTo("#tbpermiso tbody");

                })

            }
        },
        error: function (error) {

        },
        beforeSend: function () {

           
        },
    });


}


function Guardar() {

    if ($("#cboRol").val() == 0) {
        Swal.fire("Mensaje", "Seleccione un rol", "warning")
        return;
    }
    if ($("#tbpermiso tbody tr").length == 0) {
        Swal.fire("Mensaje", "No hay datos", "warning")
        return;
    }


    var $xml = "<DETALLE>"
    var permiso = "";
    $('input[type="checkbox"]').each(function () {
        var idpermiso = $(this).data("IdPermiso").toString();
        var activo = $(this).prop("checked") == true ? "1" : "0";


        permiso = permiso + "<PERMISO><IdPermisos>" + idpermiso + "</IdPermisos><Activo>" + activo + "</Activo></PERMISO>";

    });
    $xml = $xml + permiso;
    $xml = $xml + "</DETALLE>"

    var request = { xml: $xml };

    jQuery.ajax({
        url: "/Permiso/Guardar",
        type: "POST",
        data: { xml: $xml },
        dataType: "json",
        traditional: true,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (data) {

            if (data.resultado) {
                $("#cboRol").val();
                $("#tbpermiso tbody").html("");
                Swal.fire("Mensaje", "Asignado correctamente", "success")
            } else {

                Swal.fire("Mensaje", "No se pudo guardar los cambios", "warning")
            }
        },
        error: function (error) {
            console.log(error)
        },
        beforeSend: function () {

        },
    });
}

