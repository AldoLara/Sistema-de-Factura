﻿var tabladata;

$(document).ready(function () {

    //validamos el formulario
    $("#form").validate({
        rules: {
            Nombres: "required",
            Apellidos: "required",
            Correo: "required",
            Clave: "required"
        },
        messages: {
             Nombres: "(Este campo obligatorio)",
            Apellidos: "(Este campo obligatorio)",
            Correo: "(Este campo obligatorio)",
            Clave: "(Este campo obligatorio)"

        },
        errorElement: 'span'
    });


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


    //OBTENER USUARIO ACTUAL
    jQuery.ajax({
        "url": "/Usuario/ObtenerUsuarioActual",
        "type": "GET",
        "datatype": "json",
        contentType: "application/json; charset=utf-8",
        "dataSrc": "",
        success: function (data) {

            $("#txtIdUsuario").val(data.id);
            $("#lblempleadonombre").text(data.nombre);
            $("#lblempleadoapellido").text(data.apellido);
            $("#lblempleadocorreo").text(data.correo);
            $("#lblempleadorol").text(data.rol);
        },
        error: function (error) {
            console.log(error)
        }
    });



    tabladata = $('#tbdata').DataTable({
        "ajax": {
            "url": "/Usuario/Obtener",
            "type": "GET",
            "datatype": "json",
            contentType: "application/json; charset=utf-8"
        },
        "columns": [
            {
                "data": null, "render": function (data, type, row, meta) {
                    return meta.row + 1;
                }
            },
            { "data": "idUser", "visible": false },
            { "data": "clave", "visible": false },
            { "data": "correo", "visible": false },

            { "data": "rol" },
            { "data": "nombre" },
            { "data": "apellido" },
            {
                "data": "estado",
                "render": function (data) {
                    if (data) {
                        return '<span class="badge badge-success">Activo</span>';
                    } else {
                        return '<span class="badge badge-warning">Inactivo</span>';
                    }
                },
            },
            {
                "data": "idUser",
                "render": function (data, type, row, meta) {
                    return "<button class='btn btn-info btn-sm' type='button' onclick='abrirPopUpForm(" + JSON.stringify(row) + ")'> <i class='fas fa-pen'></i>Editar</button>" 
                },
                "orderable": true,
                "searchable": true,
                "width":"90px"
            }
        ], "language": {
            "processing": "Procesando...",
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "emptyTable": "Ningun dato disponible en esta tabla",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "search": "Buscar:",
            "infoThousands": ",",
            "loadingRecords": "Cargando...",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "aria": {
                "sortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sortDescending": ": Activar para ordenar la columna de manera descendente"
            },
            "buttons": {
                "copy": "Copiar",
                "colvis": "Visibilidad",
                "collection": "Colección",
                "colvisRestore": "Restaurar visibilidad",
                "copyKeys": "Presione ctrl o u2318 + C para copiar los datos de la tabla al portapapeles del sistema. <br \/> <br \/> Para cancelar, haga clic en este mensaje o presione escape.",
                "copySuccess": {
                    "1": "Copiada 1 fila al portapapeles",
                    "_": "Copiadas %d fila al portapapeles"
                },
                "copyTitle": "Copiar al portapapeles",
                "csv": "CSV",
                "excel": "Excel",
                "pageLength": {
                    "-1": "Mostrar todas las filas",
                    "1": "Mostrar 1 fila",
                    "_": "Mostrar %d filas"
                },
                "pdf": "PDF",
                "print": "Imprimir"
            },
            "autoFill": {
                "cancel": "Cancelar",
                "fill": "Rellene todas las celdas con <i>%d<\/i>",
                "fillHorizontal": "Rellenar celdas horizontalmente",
                "fillVertical": "Rellenar celdas verticalmentemente"
            },
            "decimal": ",",
            "searchBuilder": {
                "add": "Añadir condición",
                "button": {
                    "0": "Constructor de búsqueda",
                    "_": "Constructor de búsqueda (%d)"
                },
                "clearAll": "Borrar todo",
                "condition": "Condición",
                "conditions": {
                    "date": {
                        "after": "Despues",
                        "before": "Antes",
                        "between": "Entre",
                        "empty": "Vacío",
                        "equals": "Igual a",
                        "notBetween": "No entre",
                        "notEmpty": "No Vacio",
                        "not": "Diferente de"
                    },
                    "number": {
                        "between": "Entre",
                        "empty": "Vacio",
                        "equals": "Igual a",
                        "gt": "Mayor a",
                        "gte": "Mayor o igual a",
                        "lt": "Menor que",
                        "lte": "Menor o igual que",
                        "notBetween": "No entre",
                        "notEmpty": "No vacío",
                        "not": "Diferente de"
                    },
                    "string": {
                        "contains": "Contiene",
                        "empty": "Vacío",
                        "endsWith": "Termina en",
                        "equals": "Igual a",
                        "notEmpty": "No Vacio",
                        "startsWith": "Empieza con",
                        "not": "Diferente de"
                    },
                    "array": {
                        "not": "Diferente de",
                        "equals": "Igual",
                        "empty": "Vacío",
                        "contains": "Contiene",
                        "notEmpty": "No Vacío",
                        "without": "Sin"
                    }
                },
                "data": "Data",
                "deleteTitle": "Eliminar regla de filtrado",
                "leftTitle": "Criterios anulados",
                "logicAnd": "Y",
                "logicOr": "O",
                "rightTitle": "Criterios de sangría",
                "title": {
                    "0": "Constructor de búsqueda",
                    "_": "Constructor de búsqueda (%d)"
                },
                "value": "Valor"
            },
            "searchPanes": {
                "clearMessage": "Borrar todo",
                "collapse": {
                    "0": "Paneles de búsqueda",
                    "_": "Paneles de búsqueda (%d)"
                },
                "count": "{total}",
                "countFiltered": "{shown} ({total})",
                "emptyPanes": "Sin paneles de búsqueda",
                "loadMessage": "Cargando paneles de búsqueda",
                "title": "Filtros Activos - %d"
            },
            "select": {
                "1": "%d fila seleccionada",
                "_": "%d filas seleccionadas",
                "cells": {
                    "1": "1 celda seleccionada",
                    "_": "$d celdas seleccionadas"
                },
                "columns": {
                    "1": "1 columna seleccionada",
                    "_": "%d columnas seleccionadas"
                }
            },
            "thousands": ".",
            "datetime": {
                "previous": "Anterior",
                "next": "Proximo",
                "hours": "Horas",
                "minutes": "Minutos",
                "seconds": "Segundos",
                "unknown": "-",
                "amPm": [
                    "am",
                    "pm"
                ]
            },
            "editor": {
                "close": "Cerrar",
                "create": {
                    "button": "Nuevo",
                    "title": "Crear Nuevo Registro",
                    "submit": "Crear"
                },
                "edit": {
                    "button": "Editar",
                    "title": "Editar Registro",
                    "submit": "Actualizar"
                },
                "remove": {
                    "button": "Eliminar",
                    "title": "Eliminar Registro",
                    "submit": "Eliminar",
                    "confirm": {
                        "_": "¿Está seguro que desea eliminar %d filas?",
                        "1": "¿Está seguro que desea eliminar 1 fila?"
                    }
                },
                "error": {
                    "system": "Ha ocurrido un error en el sistema (<a target=\"\\\" rel=\"\\ nofollow\" href=\"\\\">Más información&lt;\\\/a&gt;).<\/a>"
                },
                "multi": {
                    "title": "Múltiples Valores",
                    "info": "Los elementos seleccionados contienen diferentes valores para este registro. Para editar y establecer todos los elementos de este registro con el mismo valor, hacer click o tap aquí, de lo contrario conservarán sus valores individuales.",
                    "restore": "Deshacer Cambios",
                    "noMulti": "Este registro puede ser editado individualmente, pero no como parte de un grupo."
                }
            }
        },
        responsive: true

    });

   
})


function abrirPopUpForm(json) {

    $("#txtid").val(0);

    if (json != null) {

        $("#txtid").val(json.idUser);
        $("#txtNombres").val(json.nombre);
        $("#txtApellidos").val(json.apellido);
        $("#txtCorreo").val(json.correo);
        $("#txtClave").val(json.clave);
        $("#cboRol").val(json.rolId);
        $("#cboEstado").val(json.estado == true ? 1 : 0);
       

        $("#txtNombres").prop("disabled", true);
        $("#txtApellidos").prop("disabled", true);
        $("#txtCorreo").prop("disabled", true);
        $("#txtClave").prop("disabled", true);
    } else {
        $("#txtNombres").val("");
        $("#txtApellidos").val("");
        $("#txtCorreo").val("");
        $("#txtClave").val("");
        $("#cboRol").val($("#cboRol option:first").val());
        $("#cboEstado").val(1);

        $("#txtNombres").prop("disabled", false);
        $("#txtApellidos").prop("disabled", false);
        $("#txtCorreo").prop("disabled", false);
        $("#txtClave").prop("disabled", false);
    }

    $('#FormModal').modal('show');

}


function Guardar() {

    if ($("#form").valid()) {

        var request = {
            users: {
                id: $("#txtid").val(),
                nombre: $("#txtNombres").val(),
                apellido: $("#txtApellidos").val(),
                email: $("#txtCorreo").val(),
                passwordHash: $("#txtClave").val(),
                estadoContrato: ($("#cboEstado").val() == "1" ? true : false)
            },
            role: $("#cboRol option:selected").text()
        }
        jQuery.ajax({
            url: "/Usuario/Guardar",
            type: "POST",
            data: request,
            success: function (data) {

                if (data.res) {
                    tabladata.ajax.reload();
                    $('#FormModal').modal('hide');
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

}