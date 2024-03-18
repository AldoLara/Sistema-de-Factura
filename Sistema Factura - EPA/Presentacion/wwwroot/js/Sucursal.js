var tabladata;
$(document).ready(function () {
    $.ajax({
        url: '/Sucursal/Obtener',
        type: 'GET',
        success: function (data) {
            if (data && data.data && data.data.length > 0) {
               
                var sucursal = data.data[0];
                $("#txtid").val(sucursal.iD_Sucursal);
                $("#txtNombre").val(sucursal.nombreEmpresa);
                $("#txtDireccion").val(sucursal.direccion);
                $("#txtMunicipio").val(sucursal.municipio);
                $("#txtDepartamento").val(sucursal.departamento);
                $("#txtTelefono").val(sucursal.numTelefono);
                
                // Deshabilitar los campos
                $("#txtid, #txtNombre, #txtDireccion, #txtMunicipio, #txtDepartamento, #txtTelefono").prop("disabled", true);
                $("#btnEditar").prop("disabled", false);
            } else {
                $("#btnGuardar").show();
                $("#btnEditar").hide();
            }
        },
        error: function (error) {
            // Manejar el error
            Swal.fire("Mensaje", "Error al obtener los datos", "error");
        }
    });


    tabladata = $('#tbdata').DataTable({
        "ajax": {
            "url": "/Sucursal/ObtenerTConsumo",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [/* Campos de la tabla mesa    */
            { "data": "iD_TipoConsumo", "width": "25%" },
            { "data": "tipo", "width": "25%" },
            {
                "data": "estado", "render": function (data) {
                    if (data) {
                        return '<span class="badge badge-success" >Activo</span>'
                    } else {
                        return '<span class="badge badge-warning"  >Inactivo</span>'
                    }
                }, "width": "25%",
            },
            {
                "data": "iD_TipoConsumo", "render": function (data, type, row, meta) {
                    return "<button class='btn btn-primary btn-sm' type='button' onclick='abrirPopUpForm(" + JSON.stringify(row) + ")'><i class='fas fa-pen'></i>Editar</button>" 
                },
                "width": "25%",
                "orderable": false,
                "searchable": false,
                //"width": "90px"
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



var datosOriginales = {}; // Almacenar los datos originales

function editarCampos() {
    // Al abrir la ventana de edición, almacenar los datos originales
    datosOriginales = {
        id: $("#txtid").val(),
        nombre: $("#txtNombre").val(),
        direccion: $("#txtDireccion").val(),
        municipio: $("#txtMunicipio").val(),
        departamento: $("#txtDepartamento").val(),
        telefono: $("#txtTelefono").val()
    };

    // Habilitar campos
    $(".model").prop("disabled", false);
    $("#btnGuardar").show();
    $("#btnCancelar").show();
    $("#btnEditar").hide();
}

function guardarCambios() {
    var request = {
        objeto: {
            iD_Sucursal: parseInt($("#txtid").val()),
            nombreEmpresa: $("#txtNombre").val(),
            direccion: $("#txtDireccion").val(),
            municipio: $("#txtMunicipio").val(),
            departamento: $("#txtDepartamento").val(),
            numTelefono: $("#txtTelefono").val(),
            
        }
    };

   
        realizarSolicitudAjax(request);
    
}

function realizarSolicitudAjax(request) {
    $.ajax({
        url: '/Sucursal/Guardar',
        type: "POST",
        data: request, 
        dataType: 'json',
        success: function (data) {
            if (data.resultado) {
                
                Swal.fire("Mensaje", "Datos guardados exitosamente", "success");
                $(".model").prop("disabled", true);                
                $("#btnEditar").show();
                $("#btnEditar").prop("disabled", false);
                $("#btnGuardar").hide();
                $("#btnCancelar").hide();
            } else {
                Swal.fire("Mensaje", "No se pudo guardar los cambios", "warning");
            }
        },
        error: function (error) {
            console.error('Error al enviar datos al servidor:', error);
        }
    });
}

function cancelarEdicion() {
    $("#txtid").val(datosOriginales.id);
    $("#txtNombre").val(datosOriginales.nombre);
    $("#txtDireccion").val(datosOriginales.direccion);
    $("#txtMunicipio").val(datosOriginales.municipio);
    $("#txtDepartamento").val(datosOriginales.departamento);
    $("#txtTelefono").val(datosOriginales.telefono);

    $(".model").prop("disabled", true);

    $("#btnEditar").show();
    $("#btnGuardar").hide();
    $("#btnCancelar").hide();
}

function abrirPopUpForm(json) {

    $("#txtId").val(0);

    if (json != null) {
      
        
        $("#txtId").val(json.iD_TipoConsumo);
        $("#txtNombreTC").val(json.tipo);
        $("#cboEstado").val(json.estado == true ? 1 : 0);

    } 

    $('#FormModal').modal('show');

}

function Guardar() {

    if ($("#form").valid()) {

        var request = {
            objeto: {
                iD_TipoConsumo: parseInt($("#txtId").val()),
                tipo: $("#txtNombreTC").val(),
                estado: ($("#cboEstado").val() == "1" ? true : false)
            }
        }

        jQuery.ajax({
            url: "/Sucursal/ModificarCosumo",
            type: "POST",
            data: request,
            success: function (data) {

                if (data.resultado) {
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