

var tablaproductobebida;
var tablaproductoplatillo;
var tablapromocion;
var tablamesa;
var abierto = 0;
var idPromocionSeleccionada;
var tablaProductosP;
var tablaProductos;
var tablaRptIngre;
var user;
var descuento = 0;
var promocionesAgregar = {} ;
var ProductosCantidadesAgre = {};


$(document).ready(function () {

    $("#txtproductocantidad").val("0");
    $("#txtfechaventa").val(ObtenerFechas());


    //OBTENER sucursal
    jQuery.ajax({
        url: '/Sucursal/Obtener',
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",


        success: function (data) {
            var sucursal = data.data[0];
            $("#txtIdTienda").val(sucursal.iD_Sucursal).prop("disabled", true);
            $("#txtCodigoTienda").val(sucursal.iD_Sucursal).prop("disabled", true);
            $("#txtNombreTienda").val(sucursal.nombreEmpresa).prop("disabled", true);
            $("#txtTiendaDireccion").val(sucursal.direccion).prop("disabled", true);
        }

    });

    jQuery.ajax({
        url: "/Usuario/ObtenerUsuarioActual",
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",


        success: function (data) {
            //USUARIO
            user = data.id;
            $("#txtIdUsuario").val(data.id);
            $("#lblempleadonombre").text(data.nombre);
            $("#TxtNombreUsuario").text(data.nombre);
            
            $("#TxtEmpleadoApellido").text(data.apellido);
            $("#lblempleadocorreo").text(data.correo);
   

        }

    });

    //OBTENER TIPOS DE CONSUMO
 
    jQuery.ajax({
        url: "/Sucursal/ObtenerTConsumo",
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
           
;            $("#opciones").html("");

            if (data.data != null) {
                $.each(data.data, function (i, item) {

                    if (item.estado == true) {
                        $("<option>").attr({ "value": item.iD_TipoConsumo }).text(item.tipo).appendTo("#opciones");
                    }
                })
                $("#opciones").val($("#opciones option:first").val());

                miFuncion();
            }

        },

        error: function (error) {
            console.log(error)
        },
        beforeSend: function () {

        },
    });

    //MESAS
    tablamesa = $('#tbmesa').DataTable({
        "ajax": {
            "url": "/Mesa/Obtener",
            "type": "GET",
            "datatype": "json", "dataSrc": function (json) {
                return json.data.filter(function (item) {
                    
                    return item.estado === true;
                });
            }
        },
        "columns": [
            {
                "data": "id", "render": function (data, type, row, meta) {
                    return "<button class='btn btn-sm btn-primary ml-2' type='button' onclick='clienteSelect(" + JSON.stringify(row) + ")'><i class='fas fa-check'></i></button>"
                },
                "orderable": false,
                "searchable": false,
                "width": "90px"
            },
            { "data": "nombre" },
            { "data": "capacidad" },
            {
                "data": "estado", "render": function (data) {
                    if (data) {
                        return '<span class="badge badge-success" >Activo</span>'
                    } else {
                        return '<span class="badge badge-warning"  >Inactivo</span>'
                    }
                }, "width": "10%",
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

    
    //OBTENER BEBIDAS
    tablaproductobebida = $('#tbBebida').DataTable({
        "ajax": {
            "url": "/Bebida/Obtener" + "?inventario=" + 1,
            "type": "GET",
            "datatype": "json",
            "dataSrc": function (json) {
                return json.data.filter(function (item) {
                    return item.objSuministro.estado === true;
                });
            }
        },

        "columns": [
            {
                "data": "iD_Bebida", "render": function (data, type, row, meta) {
                    return "<button class='btn btn-sm btn-primary ml-2' type='button' onclick='productoBebidaSelect(" + JSON.stringify(row) + ")'><i class='fa fa-check'></i></button>"
                },
                "orderable": false,
                "searchable": false,
                "width": "90px"
            },
            {
                "data": "objInventario", render: function (data) {
                    return data.cantidad
                }
            },
            { "data": "iD_Bebida", "visible": false, "width": "10%" },
            { "data": "iD_Producto", "visible": false,  "width": "10%" },
            {
                "data": "objSuministro", render: function (data) {
                    return data.nombre
                }
            },
            {
                "data": "objSuministro", render: function (data) {
                    return data.descripcion
                }
            },
            { "data": "iD_Suministro", "visible": false, "width": "10%" }
        ],
        "language": {
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

    //OBTENER PLATILLOS
    tablaproductoplatillo = $('#tbPlatillo').DataTable({
        "ajax": {
            "url": "/Comida/Obtener",
            "type": "GET",
            "datatype": "json",
            "dataSrc": function (json) {
                return json.data.filter(function (item) {
                    return item.objProducto.estado === true;
                });
            }

        },
        "columns": [
            //{ "data": "iD_Comida", "width": "10%" },
            {
                "data": "iD_Comida", "render": function (data, type, row, meta) {
                    return "<button class='btn btn-sm btn-primary ml-2' type='button' onclick='productoPlatilloSelect(" + JSON.stringify(row) + ")'><i class='fa fa-check'></i></button>"
                },
                "orderable": false,
                "searchable": false,
                "width": "90px"
            },
            { "data": "iD_Producto", "visible": false, "width": "10%" },
            {
                "data": "objProducto", render: function (data) {
                    return data.nombre
                }
            },
            { "data": "descripcion", "width": "20%" },
            
            
        ],

        "responsive": true,
        "language": {
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
    });


    //OBTENER PROMOCIONES
    tablapromocion = $('#tbPromocion').DataTable({
        "ajax": {
            "url": "/Promocion/Obtener",
            "type": "GET",
            "datatype": "json",
            "dataSrc": function (json) {
                return json.data.filter(function (item) {
                    return item.estado === true;
                });
            }
        },

        "columns": [
            {
                "data": "iD_Promocion", "render": function (data, type, row, meta) {
                    return "<button class='btn btn-sm btn-primary ml-2' type='button' onclick='productoPromocionSelect(" + JSON.stringify(row) + ")'><i class='fa fa-check'></i></button>"
                },
                "orderable": false,
                "searchable": false,
                "width": "90px"
            },
            {
                "data": "nombre", "width": "10%"
            },
            {
                "data": "precio", "width": "10%",
                "render": function (data) {
                    return "C$./ " + parseFloat(data).toFixed(2).replace(/\B(?=(\d{3})+(\.|$))/g, ",");
                }
            },

            {
                "data": "dias", "width": "10%"
            },
          
            {
                "data": "iD_Promocion", "render": function (data, type, row, meta) {
                    return  "<button id='openMenuBtn' class='btn btn-primary btn-sm' onclick='MostrarDatos(" + data + ", 0)'>Productos</button>";
                },
                "orderable": false,
                "searchable": false,
                "width": "90px"
            },
        ],
        responsive: true,
        "language": {
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
    });


   
})


$('#btnBuscarMesa').on('click', function () {

    tablamesa.ajax.reload();

    $('#modalMesa').modal('show');
})

function clienteSelect(json) {

    //$("#cboclientetipodocumento").val(json.TipoDocumento);
    $("#txtidmesa").val(json.id);
    $("#TxtNombreMesa").val(json.nombre);
    $("#TxtCapacidad").val(json.capacidad);
    //$("#txtReservada").val(json.reservada);
    $("#TxtEstado").val(json.estado);
    $('#modalMesa').modal('hide');
}

function buscarBebida() {
    
    
    tablaproductobebida.ajax.reload();
    abierto = 0;
    $('#modalPlatillo').modal('hide');
    $('#modalBebida').modal('show');
    $('#modalPromocion').modal('hide');

    $("#txtproductocodigo").val("");
    $("#txtproductonombre").val("");
    $("#txtproductodescripcion").val("");
    
    $("#txtproductoprecio").val("");
    $("#txtproductoprecioventa").val("");
    $("#txtproductocantidad").val("0");
    $("#txtIdSuministro").val("0");
}



function buscarPlatillo() {
    
    tablaproductoplatillo.ajax.reload();
    abierto = 1;
    $('#modalBebida').modal('hide');
    $('#modalPlatillo').modal('show');
    $('#modalPromocion').modal('hide');
    $("#txtIdSuministro").val("0");
    $("#txtStock").val("");
}


function buscarPromocion() {
    
    tablapromocion.ajax.reload();
    abierto = 2;
    $('#modalBebida').modal('hide');
    $('#modalPlatillo').modal('hide');
    $('#modalPromocion').modal('show');
    $("#txtIdSuministro").val("0");
}


function productoBebidaSelect(json) {
    $("#PromocionInicio").hide();
    $("#BebidasInicio").show();
   
    $("#txtStock").val(json.objInventario.cantidad);
    if ($("#txtStock").val() == 0) {
        swal.fire("Mensaje", "Stock en cero profavor realice una compra de este producto", "warning");
        $("#txtStock").val("");
        return;
    }
    $("#txtproductocodigo").val(json.iD_Producto);
    $("#txtproductonombre").val(json.objSuministro.nombre);
    $("#txtproductodescripcion").val(json.objSuministro.descripcion);
    $("#txtproductoprecioventa").val(json.objProducto.precio);
    $("#txtproductocantidad").val("0");
    $("#txtIdSuministro").val(json.iD_Suministro);

   
    $('#modalBebida').modal('hide');
    $("#txtproductocantidad").focus();
}

function productoPlatilloSelect(json) {

    $("#PromocionInicio").hide();
    $("#BebidasInicio").show();

    $("#txtproductocodigo").val(json.iD_Producto);
    $("#txtproductonombre").val(json.objProducto.nombre);
    $("#txtproductodescripcion").val(json.descripcion);
    $("#txtproductoprecioventa").val(json.objProducto.precio);
    $("#txtproductocantidad").val("0");

    $('#modalPlatillo').modal('hide');
    $("#txtproductocantidad").focus();
}



function productoPromocionSelect(json) {
    $("#PromocionInicio").show();
    $("#BebidasInicio").hide();
    $("#PlatillosInicio").hide();
    $("#txtproductopromocioncodigo").val(json.iD_Promocion);
    $("#txtIdPromocion").val(json.iD_Promocion);
    idPromocionSeleccionada = (json.iD_Promocion);
    $("#txtproductopromocionnombre").val(json.nombre);
    $("#txtproductopromociondescripcion").val(json.dias);
    $("#txtproductopromocionprecioventa").val(json.precio);
    $("#txtproductopromocioncantidad").val("0");
    $('#modalPromocion').modal('hide');

    $("#txtproductopromocioncantidad").focus();

}

function abrirPopUpForm(json) {

    if (abierto == 0) {
        $('#modalPlatillo').modal('hide');
        $('#modalBebida').modal('show');
    } else if (abierto == 1) {
        $('#modalBebida').modal('hide');
        $('#modalPlatillo').modal('show');
    } else if (abierto == 2) {
        $('#modalPromocion').modal('show');
    }
}


//AGREGANDO PRODUCTO
$('#btnAgregar').on('click', function () {


    $("#txtproductocantidad").val($("#txtproductocantidad").val() == "" ? "0" : $("#txtproductocantidad").val());

    var existe_codigo = false;
    if (
        parseInt($("#txtproductocodigo").val()) == 0 ||
        /*json.idInventario == 0 ||*/
        parseFloat($("#txtproductocantidad").val()) == 0
    ) {
        Swal.fire("Mensaje", "Debe completar todos los campos del producto", "warning")
        //swal("Mensaje", "Debe completar todos los campos del producto", "warning")
        return;
    }

    $('#tbVenta > tbody  > tr').each(function (index, tr) {
        var fila = tr;
        var idproducto = $(fila).find("td.producto").text();

        if (idproducto == $("#txtproductonombre").val()) {
            existe_codigo = true;
            return false;
        }
        
    });

    if (!existe_codigo) {
        var idpr = $("#txtproductocodigo").val();
        if (idpr !== "") {
      
            var cantidadpr = $("#txtproductocantidad").val();
        }

        verificarStockBebida(idpr, cantidadpr,function (stockSuficiente) {
            if (stockSuficiente) {
                var importetotal = parseFloat($("#txtproductoprecioventa").val()) * parseFloat($("#txtproductocantidad").val());
               


                $("<tr>").append(
                    $("<td>").append(
                        $("<button>").addClass("btn btn-danger btn-sm").text("Eliminar").data("idproducto", parseInt($("#txtproductocodigo").val())).data("cantidadproducto", parseInt($("#txtproductocantidad").val()))
                    ),
                    $("<td>").addClass("productocantidad").text($("#txtproductocantidad").val()),
                    $("<td>").addClass("producto").data("idproducto", $("#txtproductocodigo").val()).text($("#txtproductonombre").val()),
                    $("<td>").text($("#txtproductodescripcion").val()),
                    $("<td>").addClass("productoprecio").text($("#txtproductoprecioventa").val()),
                    $("<td>").addClass("importetotal").text(importetotal),
                    $("<td>").addClass("IDBEB").text($("#txtproductocodigo").val()),
                    $("<td>").addClass("idSuministro").text($("#txtIdSuministro").val())
                ).appendTo("#tbVenta tbody");
                calcularPrecios();

                $("#txtIdProducto").val("0");
                $("#txtproductocodigo").val("0");
                $("#txtproductonombre").val("");
                $("#txtproductodescripcion").val("");
                $("#txtproductostock").val("");
                $("#txtproductoprecioventa").val("");
                $("#txtproductocantidad").val("0");
                $("#txtStock").val("");
                $("#txtIdPromocion").val(0);
                $("#txtIdSuministro").val(0);

                $("#txtproductocodigo").focus();

            }
        });

       
    } else {
        swal.fire("Mensaje", "El producto ya existe en la venta", "warning")
    }
 
})



//AGREGANDO PROMOCION
$('#btnAgregarPromocion').on('click', function () {
    
    $("#txtproductopromocioncantidad").val($("#txtproductopromocioncantidad").val() == "" ? "0" : $("#txtproductopromocioncantidad").val());

    var existe_promocion = false;
    if (
        parseInt($("#txtproductopromocioncodigo").val()) == 0 ||
     
        parseFloat($("#txtproductopromocioncantidad").val()) == 0
    ) {
        Swal.fire("Mensaje", "Debe completar todos los campos de la promocion", "warning")
        return;
    }

    $('#tbVenta > tbody  > tr').each(function (index, tr) {
        var fila = tr;
        var idproducto = $(fila).find("td.productopromo").text();

        if (idproducto == $("#txtproductopromocionnombre").val()) {
            existe_promocion = true;
            return false;
        }

    });

    if (!existe_promocion) {
        var idpr = $("#txtIdPromocion").val();
        if (idpr !== "") {
            var nombrepr = $("#txtproductopromocionnombre").val();
            var cantidadpr = $("#txtproductopromocioncantidad").val();
        }
       
        promocionesAgregar[idpr] = { nombre: nombrepr, cantidad: cantidadpr };
        verificarStockPromocion(function (stockDisponible) {
            if (stockDisponible) {
              
                var importetotal = parseFloat($("#txtproductopromocionprecioventa").val()) * parseFloat($("#txtproductopromocioncantidad").val());
                $("<tr>").append(
                    $("<td>").append(
                        $("<button>").addClass("btn btn-danger btn-sm").text("Eliminar").data("idpromocion", parseInt($("#txtproductopromocioncodigo").val())).data("cantidadproducto", parseInt($("#txtproductopromocioncantidad").val()))
                    ),
                    $("<td>").addClass("productocantidad").text($("#txtproductopromocioncantidad").val()),
                    $("<td>").addClass("productopromo").data("idpromocion", $("#txtproductopromocioncodigo").val()).text($("#txtproductopromocionnombre").val()),
                    $("<td>").text($("#txtproductopromociondescripcion").val()),
                    $("<td>").addClass("productoprecio").text($("#txtproductopromocionprecioventa").val()),
                    $("<td>").addClass("importetotal").text(importetotal),
                    $("<td>").addClass("oculto").text($("#txtproductopromocioncodigo").val()) // Cambié "Promocion" a "oculto"
                ).appendTo("#tbVenta tbody");

                $("#txtIdProducto").val("0");
                $("#txtproductopromocioncodigo").val("0");
                $("#txtproductopromocionnombre").val("");
                $("#txtproductopromociondescripcion").val("");
                $("#txtproductopromocionprecioventa").val("");
                $("#txtproductopromocioncantidad").val("0");
                $("#txtIdPromocion").val(0);
                $("#txtproductopromocioncodigo").focus();

                calcularPrecios();
            }
        });
        
     
    } else {
        swal.fire("Mensaje", "La promcion ya existe en la venta", "warning")
    }
   
})



$('#tbVenta tbody').on('click', 'button[class="btn btn-danger btn-sm"]', function () {
    var nombrepr = $(this).closest("tr").find("td.productopromo").text();

    
    if (Object.keys(promocionesAgregar).length !== 0) {
        for (var clave in promocionesAgregar) {
            if (promocionesAgregar[clave].nombre === nombrepr) {
                delete promocionesAgregar[clave];
                break; 
            }
        }
    }

    // Eliminar la fila de la tabla
    $(this).parents("tr").remove();
    calcularPrecios();
    console.log("length " + Object.keys(promocionesAgregar).length);
});

$('#btnTerminarGuardarVenta').on('click', function () {
    var montoPago = 0;
    var cambio = 0;
  
    var tipoPago = $("#cboTipoPago").val();
    var totalimportes = $("#txttotal").val();

    if (parseInt($("#opciones").val()) == 1) {
        //VALIDACIONES DE MESA
        if ($("#TxtNombreMesa").val().trim() == "" || $("#TxtCapacidad").val().trim() == "") {
            swal.fire("Mensaje", "Complete los datos de la mesa", "warning");
            return;
        }
    }

    //VALIDACIONES DE CLIENTE
    if ($("#TxtNombreCliente").val().trim() == "") {
        swal.fire("Mensaje", "Complete el nombre del cliente", "warning");
        return;
    }
    //VALIDACIONES DE PRODUCTOS
    if ($('#tbVenta tbody tr').length == 0) {
        swal.fire("Mensaje", "Debe registrar minimo un producto en la venta", "warning");
        return;
    }   
    
    //VALIDACIONES DE MONTO PAGO
    if ($("#cboTipoPago").val() === "Efectivo") {
        if ($("#txtmontopago").val().trim() == "") {
             swal.fire("Mensaje", "Ingrese el monto de pago", "warning");
            return;
        }
        montoPago = $("#txtmontopago").val();
        cambio = $("#txtcambio").val();
    } else {

    }

    

    var $totalproductos = 0;
    var $totalimportes = 0;

    var DETALLE = "";
    var VENTA = "";
    var DETALLE_CLIENTE = "";
    var DETALLE_VENTA = "";
    var DATOS_VENTA = "";

    if ($("#cboTipoPago").val() === "Efectivo") {
        calcularCambio();
    }

    $('#tbVenta > tbody  > tr').each(function (index, tr) {
     
        var fila = tr;
        var productocantidad = parseInt($(fila).find("td.productocantidad").text());
        var idproducto = $(fila).find("td.producto").data("idproducto");
        var productoprecio = parseFloat($(fila).find("td.productoprecio").text());
        var importetotal = parseFloat($(fila).find("td.importetotal").text());
        var idPromo = parseFloat($(fila).find("td.oculto").text());
        var idSuministro = parseFloat($(fila).find("td.idSuministro").text());


        $totalproductos = $totalproductos + productocantidad;
     

       
        //PARA LA TABLA DETALLEVENTA
        var datosVenta = "<DATOS>" +
            "<IdVenta>0</IdVenta>";

        if (!isNaN(idPromo)) {
            datosVenta += "<IdPromocion>" + idPromo + "</IdPromocion>";
        } else {
            datosVenta += "<IdProducto>" + idproducto + "</IdProducto>";
        }


        datosVenta += "<Cantidad>" + productocantidad + "</Cantidad>" +
            "<PrecioUnidad>" + productoprecio + "</PrecioUnidad>" +
            "<ImporteTotal>" + importetotal + "</ImporteTotal>" +
            "<Fecha>" + $("#txtfechaventa").val() + "</Fecha>" +
            "<IdSuministro>" + idSuministro + "</IdSuministro>" +
            "</DATOS>";

        DATOS_VENTA += datosVenta;
    });
    
    //PARA LA TABLA VENTA
    var idMesa = $("#txtidmesa").val();
    var idMesaTag = idMesa ? "<IdMesa>" + idMesa + "</IdMesa>" : "";

    VENTA = "<VENTA>" +
        "<IdSucursal>" + $("#txtIdTienda").val() + "</IdSucursal>" +
        idMesaTag +
        "<NombreCliente>" + $("#TxtNombreCliente").val() + "</NombreCliente>" +
        "<Usuario>" + user + "</Usuario>" +
        "<CantidadProducto>" + $('#tbVenta tbody tr').length + "</CantidadProducto>" +
        "<CantidadTotal>" + $totalproductos + "</CantidadTotal>" +
        "<TotalCosto>" + totalimportes + "</TotalCosto>" +
        "<ImporteRecibido>" + montoPago + "</ImporteRecibido>" +
        "<ImporteCambio>" + cambio + "</ImporteCambio>" +
        "<Descuento>" + descuento + "</Descuento>" +
        "<TipoPago>" + tipoPago + "</TipoPago>" +
        "<Fecha>" + $("#txtfechaventa").val() + "</Fecha>" +
        "<TipoVenta>" + $("#opciones").val() + "</TipoVenta>" +
        "</VENTA>";


    DETALLE_VENTA = "<DETALLE_VENTA>" + DATOS_VENTA + "</DETALLE_VENTA>";

    DETALLE = "<DETALLE>" + VENTA + DETALLE_CLIENTE + DETALLE_VENTA + "</DETALLE>"


    var request = { xml: DETALLE };

 
        jQuery.ajax({
            url: "/Venta/Guardar",
            type: "POST",
            data: { xml: DETALLE },
            dataType: "json",
            traditional: true,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success: function (data) {


                if (data.resultado) {
                    //MESA
                    $("#opciones").val("1");
                    $("#txtidmesa").val("");
                    $("#TxtNombreMesa").val("");
                    $("#TxtCapacidad").val("");
                    $("#TxtNombreCliente").val("");
                    $("#TxtNombreUsuario").val("");
                    $('#mesaformulario').show();
                    $('#btnBuscarMesa').show();
                    //PRODUCTO
                    $("#txtStock").val("");
                    $("#txtIdProducto").val("");
                    $("#txtproductocodigo").val("");
                    $("#txtproductonombre").val("");
                    $("#txtproductodescripcion").val("");
                    $("#txtproductoprecioventa").val("");
                    $("#txtproductocantidad").val("");

                    //PROMOCIONES
                    $("#txtIdProducto").val("");
                    $("#txtproductopromocioncodigo").val("");
                    $("#txtproductopromocionnombre").val("");
                    $("#txtproductopromociondescripcion").val("");
                    $("#txtproductopromocionprecioventa").val("");
                    $("#txtproductopromocioncantidad").val("");

                    //VENTA
                    $("#txtmontopago").val("");
                    $("#txtcambio").val("");
                    $("#txtsubtotal").val(0);
                    $("#txttotal").val(0);
                    $("#txtdescuento").val("");
                    $("#txtIdPromocion").val(0);
                    for (idPr in promocionesAgregar) {
                        can = promocionesAgregar[idPr].cantidad;
                        controlarStokPromo(idPr, can)
                    }

                    $("#tbVenta tbody tr").each(function () {
                        var idProducto = parseInt($(this).find(".idSuministro").text());
                        var cantidadEnTabla = parseInt($(this).find(".productocantidad").text());

                        // Verificar si idProducto no es cero y es un número válido
                        if (idProducto !== 0 && !isNaN(idProducto)) {
                            controlarStock(idProducto, cantidadEnTabla, true);
                        }

                    });
                  

                    tablaproductobebida.ajax.reload();
                    $("#tbVenta tbody").html("");
                    Swal.fire("Mensaje", "Se registro la Venta", "success")

                    Imprimir(data.resultado);
                } else {
                    Swal.fire("Mensaje", "No se pudo registrar la Venta", "warning")
                   
                }
            },
            error: function (error) {
                console.log(error)
            },
            beforeSend: function () {

            },
        });
    
})

function Imprimir(id) {

    var url = "/Venta/Detalle" + "?IdVenta=" + id;
    window.open(url);
}


function calcularCambio() {
    var montopago = $("#txtmontopago").val().trim() == "" ? 0 : parseFloat($("#txtmontopago").val().trim());
    var totalcosto = parseFloat($("#txttotal").val().trim());
    var cambio = 0;
    if (montopago == "") {
        Swal.fire("Mensaje", "Ingrese el monto de pago", "warning")
        return;
    } else if (montopago < totalcosto) {
        Swal.fire("Mensaje", "El monto a pagar debe ser mayor al coste total", "warning");
        return;
    }
    else {
        cambio = (montopago <= totalcosto ? totalcosto : montopago) - totalcosto;
        $("#txtcambio").val(cambio.toFixed(2));
    }
   
   
}

$('#btncalcular').on('click', function () {
    calcularCambio();
})




function controlarStock($idproducto, $cantidad, $restar) {
    var request = {
        idproducto: $idproducto,
        cantidad: $cantidad,
        restar: $restar
      
    }
    

    jQuery.ajax({
        url: "/Venta/ControlarStock",
        type: "POST",
        data: request,
        dataType: "json",
        //contentType: "application/json; charset=utf-8",
        success: function (data) {
            
            
        },
        error: function (error) {
           
           
        }
    });

    tablaproductobebida.ajax.reload();

}
function controlarStokPromo($idPromo, $cantidad) {
    var TotalesCantidadesPromociones = {};
    var stockDisponible = {};

    var url = "/Promocion/ObtenerPP" + "?id=" + $idPromo;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: function (response) {
            var productosPromocion = response.data;
            var stockDisponiblePromocion = true;
            var cantidadTotalPromocion = {};
            var can = 0;
            productosPromocion.forEach(function (producto) {
                var idProducto = producto.objMenuPromocion.iD_Producto;
                id = productosPromocion[0].iD_Promocion;
                can = $cantidad;
                var cantidadProducto = producto.objMenuPromocion.cantidad * can;
                cantidadTotalPromocion[idProducto] = cantidadProducto;
                if (TotalesCantidadesPromociones[idProducto] !== undefined) {
                    TotalesCantidadesPromociones[idProducto] += cantidadProducto;
                } else {
                    TotalesCantidadesPromociones[idProducto] = cantidadProducto;
                }
            });

            // Sumar las cantidades a verificar con las cantidades totales en la tabla
            var cantidadTotal = {};
            for (var idProd in cantidadTotalPromocion) {
                cantidadTotal[idProd] = TotalesCantidadesPromociones[idProd];
            }

            // Realizar la eliminacion de stock
            for (var idProd in cantidadTotal) {
                var cantidadAEvaluar = cantidadTotal[idProd];
                var stockDisponibleProducto = stockDisponible[idProd];

                controlarStock(idProd, cantidadAEvaluar, true);
            }
        }

    });
}


function verificarStockPromocion( callback) {

    var stockDisponible = {};

    // Crear una promesa para la primera solicitud AJAX (obtener bebidas)
    var obtenerBebidas = new Promise(function (resolve, reject) {
        $.ajax({
            url: "/Bebida/Obtener" + "?inventario=" + 1,
            type: "GET",
            dataType: "json",
            success: function (response) {
                var stock = response.data;
                stock.forEach(function (stock) {
                    var idBebida = stock.iD_Bebida;
                    var cantidadBebida = stock.objInventario.cantidad;
                    stockDisponible[idBebida] = cantidadBebida;
                });
                resolve(); // Resolver la promesa cuando la solicitud AJAX se complete con éxito
            },
            error: function (xhr, status, error) {
                reject(error); // Rechazar la promesa si hay un error en la solicitud AJAX
            }
        });
    });
    obtenerBebidas.then(function () {
        
        if (Object.keys(promocionesAgregar).length !== 0) {
            var promocionesCompletadas = 0;
            var totalPromociones = Object.keys(promocionesAgregar).length;
            var TotalesCantidadesPromociones = {};
            var TodasPromocionesDisponibles = true;

            for (var idpromo in promocionesAgregar) {
                var id = idpromo;
                var url = "/Promocion/ObtenerPP" + "?id=" + id;
                $.ajax({
                    url: url,
                    type: "GET",
                    dataType: "json",
                    success: function (response) {
                        var productosPromocion = response.data;
                        var stockDisponiblePromocion = true;
                        var cantidadTotalPromocion = {};
                        var can = 0;
                        productosPromocion.forEach(function (producto) {
                            var idProducto = producto.objMenuPromocion.iD_Producto;
                           
                                id = productosPromocion[0].iD_Promocion;
                                can = promocionesAgregar[id].cantidad;

                            var cantidadProducto = producto.objMenuPromocion.cantidad * can;


                            cantidadTotalPromocion[idProducto] = cantidadProducto;

                            if (TotalesCantidadesPromociones[idProducto] !== undefined) {

                                TotalesCantidadesPromociones[idProducto] += cantidadProducto;
                            } else {

                                TotalesCantidadesPromociones[idProducto] = cantidadProducto;
                            }
                        });

                        // Calcular cantidad total en la tabla
                        var cantidadTotalEnTabla = {};
                        $("#tbVenta tbody tr").each(function () {
                            var idProducto = parseInt($(this).find(".producto").data("idproducto"));
                            var cantidadEnTabla = parseInt($(this).find(".productocantidad").text());
                            if (!isNaN(idProducto)) {
                                cantidadTotalEnTabla[idProducto] = cantidadEnTabla
                            }
                        });

                        // Sumar las cantidades a verificar con las cantidades totales en la tabla
                        var cantidadTotal = {};
                        for (var idProd in cantidadTotalPromocion) {
                            cantidadTotal[idProd] = (cantidadTotalEnTabla[idProd] || 0) + TotalesCantidadesPromociones[idProd];
                        }

                        // Realizar la verificación de stock
                        for (var idProd in cantidadTotal) {
                            var cantidadAEvaluar = cantidadTotal[idProd];
                            var stockDisponibleProducto = stockDisponible[idProd];
                            
                            // Comparar las cantidades
                            if (cantidadAEvaluar > stockDisponibleProducto) {
                                stockDisponiblePromocion = false;
                                Swal.fire("Mensaje", "No hay suficiente stock disponible para la promoción", "warning");
                                break;
                            }
                            
                        }

                        promocionesCompletadas++;
                        if (!stockDisponiblePromocion) {
                            TodasPromocionesDisponibles = false;
                        }

                        if (promocionesCompletadas === totalPromociones) {
                            callback(TodasPromocionesDisponibles);
                        }

                    }
                    
                });
            }
        }
     
     });
}



function verificarStockBebida(idProducto, cantidad, callback) {
    var stockDisponible = {};
    var cantidadIngresar = {};
    cantidad2 = parseInt(cantidad);
    cantidadIngresar[idProducto] = cantidad2;
    var obtenerStockBebida = new Promise(function (resolve, reject) {
        $.ajax({
            url: "/Bebida/Obtener" + "?inventario=" + 1,
            type: "GET",
            dataType: "json",
            success: function (response) {
                var stock = response.data;
                stock.forEach(function (stock) {
                    var idBebida = stock.iD_Bebida;
                    var cantidadBebida = stock.objInventario.cantidad;
                    stockDisponible[idBebida] = cantidadBebida;
                });
                resolve();
            },
            error: function (xhr, status, error) {
                reject(error);
            }
        });
    });
    obtenerStockBebida.then(function () {
        if (Object.keys(promocionesAgregar).length !== 0) {
            var promocionesCompletadas = 0; 
            var totalPromociones = Object.keys(promocionesAgregar).length; 
            var TotalesCantidadesPromociones = {};
            var TodasPromocionesDisponibles = true;

            for (var idpromo in promocionesAgregar) {
                var id = idpromo;
                var url = "/Promocion/ObtenerPP" + "?id=" + id;
                $.ajax({
                    url: url,
                    type: "GET",
                    dataType: "json",
                    success: function (response) {
                        var productosPromocion = response.data;
                        var stockDisponiblePromocion = true;
                        var promocion = promocionesAgregar[id].cantidad;
                        var cantidadPromocion = promocion;
                        var cantidadTotalPromocion = {};

                        productosPromocion.forEach(function (producto) {
                            var idProducto = producto.objMenuPromocion.iD_Producto;


                            id = productosPromocion[0].iD_Promocion;
                            can = promocionesAgregar[id].cantidad;



                            var cantidadProducto = producto.objMenuPromocion.cantidad * can;


                            cantidadTotalPromocion[idProducto] = cantidadProducto;

                            if (TotalesCantidadesPromociones[idProducto] !== undefined) {

                                TotalesCantidadesPromociones[idProducto] += cantidadProducto;
                            } else {

                                TotalesCantidadesPromociones[idProducto] = cantidadProducto;
                            }
                        });
                        // Calcular cantidad total en la tabla
                        var cantidadTotalEnTabla = {};
                        $("#tbVenta tbody tr").each(function () {
                            var idProducto = parseInt($(this).find(".producto").data("idproducto"));
                            var cantidadEnTabla = parseInt($(this).find(".productocantidad").text());
                            if (!isNaN(idProducto)) {
                                cantidadTotalEnTabla[idProducto] = cantidadEnTabla
                            }
                        });

                        // Sumar las cantidades a verificar con las cantidades totales en la tabla
                        var cantidadTotal = {};
                        for (var idProd in cantidadTotalPromocion) {
                           
                            var cantidadEnTabla = cantidadTotalEnTabla[idProd];
                            if (!cantidadEnTabla && idProd === idProducto) {
                                cantidadTotal[idProd] = parseInt(cantidad) + TotalesCantidadesPromociones[idProd];
                            } else {
                                cantidadTotal[idProd] = (cantidadTotalEnTabla[idProd] || 0) + TotalesCantidadesPromociones[idProd];
                            }
                        }
                        
                        
                        // Realizar la verificación de stock
                        for (var idProd in cantidadTotal) {
                            var cantidadAEvaluar = cantidadTotal[idProd];
                            var stockDisponibleProducto = stockDisponible[idProd];

                            // Comparar las cantidades
                            if (cantidadAEvaluar > stockDisponibleProducto) {
                                stockDisponiblePromocion = false;
                                Swal.fire("Mensaje", "No hay suficiente stock para este producto", "warning")
                                break;
                            }
                            
                        }
                        
                        promocionesCompletadas++;
                        if (!stockDisponiblePromocion) {
                            TodasPromocionesDisponibles = false; 
                        }

                        if (promocionesCompletadas === totalPromociones) {
                            callback(TodasPromocionesDisponibles);
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error al obtener los productos de la promoción:", error);
                    }
                });

            }
           

        } else {
            var stockSuficiente = true;
            var tablaDatos = [];


            $('#tbVenta > tbody  > tr').each(function (index, tr) {
                var fila = tr;
                var idBebidaTabla = $(this).find("td.producto").data("idproducto");
                var cantidadBebidaTabla = parseInt($(this).find(".productocantidad").text());
                if (!isNaN(idBebidaTabla)) {
                    tablaDatos[idBebidaTabla] = cantidadBebidaTabla;
                }

            });

            for (var idBebida in stockDisponible) {
                var cantidadEnTabla = tablaDatos[idBebida] || 0;
                var cantidadDisponible = stockDisponible[idBebida] || 0;

                if (cantidadEnTabla === 0) {
                    cantidadEnTabla = cantidadIngresar[idBebida];
                }

                if (cantidadEnTabla > cantidadDisponible) {

                    stockSuficiente = false;
                    Swal.fire("Mensaje", "No hay suficiente stock para este producto", "warning")
                    break;
                }
            }

            callback(stockSuficiente);
        }
    }).catch(function (error) {
        console.error("Error al obtener el stock de las bebidas:", error);
        // Llamar al callback con un valor indicando que ocurrió un error
        callback(false);
    });
}


window.onbeforeunload = function () {
    if ($('#tbVenta tbody tr').length > 0) {

        $('#tbVenta > tbody  > tr').each(function (index, tr) {
            var fila = tr;
            var productocantidad = parseInt($(fila).find("td.cantidadproducto").text());
            var idproducto = $(fila).find("td.producto").data("idproducto");

            controlarStock(parseInt(idproducto), parseInt(productocantidad), false);
        });
    }
};


function calcularPrecios() {
    var subtotal = 0;
    var igv = 0;
    var sumatotal = 0;
    $('#tbVenta > tbody  > tr').each(function (index, tr) {
        var fila = tr;
        var importetotal = parseFloat($(fila).find("td.importetotal").text());
        sumatotal = sumatotal + importetotal;
    });
    igv = sumatotal * 0.18;
    subtotal = sumatotal - igv;


    $("#txtsubtotal").val(sumatotal.toFixed(2));
    $("#txtigv").val(igv.toFixed(2));
    $("#txttotal").val(sumatotal.toFixed(2));
}


function MostrarDatos($id, $editar,$cantidad) {


    if ($editar == 0) {


        if ($.fn.DataTable.isDataTable('#tbProductosP')) {

            $('#tbProductosP').DataTable().destroy();
        }

        tablaProductosP = $('#tbProductosP').DataTable({
            "ajax": {
                "url": "/Promocion/ObtenerPP" + "?id=" + $id,
                "type": "GET",
                "datatype": "json"
            },
            "columns": [
                {
                    "data": "objMenuPromocion", render: function (data) {
                        return data.iD_Producto
                    }
                },
                {
                    "data": "objProductos", render: function (data) {
                        return data.nombre
                    }
                },
                {
                    "data": "objMenuPromocion", render: function (data) {
                        return data.cantidad
                    }
                },
            ],
            responsive: true
        });

        $('#tbPromocion tbody').on('click', 'tr', function () {

            var contenidoNombre = $(this).find('td:eq(1)').text();
            $('#lblPromo').text('Promocion: ' + contenidoNombre);
        });

    } 
}

function ObtenerFechas() {

    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = (('' + day).length < 2 ? '0' : '') + day + '/' + (('' + month).length < 2 ? '0' : '') + month + '/' + d.getFullYear();

    return output;
}

    
//PARA MOSTRAR LOS PRODUCTOS DE CADA PROMOCION
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('tbPromocion').addEventListener('click', function (event) {
        if (event.target && event.target.id === 'openMenuBtn') {
            var offcanvasMenu = document.getElementById('offcanvasMenu');

            offcanvasMenu.style.bottom = '0';
            offcanvasMenu.style.boxShadow = '0px -100px 10px 1000px rgba(124, 124, 125, 0.4)';
        }
    });

    var closeMenuBtn = document.getElementById('closeMenuBtn');
    closeMenuBtn.onclick = function () {
        var offcanvasMenu = document.getElementById('offcanvasMenu');
        offcanvasMenu.style.bottom = '-100%';
        offcanvasMenu.style.boxShadow = 'none';
       
    };

    // Cerrar offcanvasMenu al hacer clic fuera de él
    document.addEventListener('click', function (event) {
        if (!offcanvasMenu.contains(event.target) && event.target.id !== 'openMenuBtn') {
            // Verificar si el clic no ocurrió dentro del offcanvasMenu ni en el botón de abrir
            offcanvasMenu.style.bottom = '-100%';
            offcanvasMenu.style.boxShadow = 'none';
        }
    });
});



function miFuncion() {

    $("#txtidmesa").val("");
    $("#TxtNombreMesa").val("");
    $("#TxtCapacidad").val("");

    if (parseInt($("#opciones").val()) == 2 || parseInt($("#opciones").val()) == 3) {
      
        $('#btnBuscarMesa').hide();
        $('#mesaformulario').hide();
      
    }
    else if (parseInt($("#opciones").val()) == 1) {
        $('#mesaformulario').show();
        $('#btnBuscarMesa').show();
    }
   
   

}

function TipoPagoSelect() {
    if ($("#cboTipoPago").val() == "Tarjeta") {
        $("#txtmontopago").prop('disabled', true);
        $("#btncalcular").prop('disabled', true);
    } else {
        $("#txtmontopago").prop('disabled', false);
        $("#btncalcular").prop('disabled', false);
    }
}

/*========== FUNCIONES PARA VALIDAR NUMEROS ENTEROS ======= */
$.fn.inputFilter = function (inputFilter) {
    return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function () {
        if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
            this.value = "";
        }
    });
};

$("#txtproductocantidad").inputFilter(function (value) {
    return /^\d*$/.test(value);
});

$("#txtproductopromocioncantidad").inputFilter(function (value) {
    return /^\d*$/.test(value);
});
$("#txtdescuento").inputFilter(function (value) {
    return /^\d*$/.test(value);
});



/*========== FUNCIONES PARA EL CERO DEL INICIO ======= */
function filtrarInput(selector) {


    $(selector).change(function () {
        var value = $(this).val();
        var newValue = value.replace(/^0+(?!\.|$)/, '');
        $(this).val(newValue);


    });
}
// Llamar la función para cada campo de texto
filtrarInput("#txtproductocantidad");
filtrarInput("#txtproductopromocioncantidad");
filtrarInput(".txtCant");




//CALCULAR EL DESCUENTO
function calcularDescuento() {
    var porcentajeDescuento = parseFloat($("#txtdescuento").val());
    var subtotal = parseFloat($("#txtsubtotal").val());

    if (isNaN(porcentajeDescuento) || isNaN(subtotal)) {
        $("#txttotal").val(subtotal.toFixed(2));
    } else {
        descuento = (porcentajeDescuento / 100) * subtotal;
        var total = subtotal - descuento;
        $("#txttotal").val(total.toFixed(2)); 
    }
}

$("#txtdescuento").on("input", function () {
    calcularDescuento();
});



$('#btnCierreVenta').on('click', function () {
   
    Swal.fire({
        title: 'Mensaje',
        text: "Esta seguro de hacer cierre del dia",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#01579B',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Cerrar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed){

            $('#modalCierre').modal('show');
            openTab('Atras');
            

            jQuery.ajax({
                url: "/Reporte/Cierre",
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


            var datos;

            function obtenerDatos() {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        url: "/Reporte/CierreIngredienteVerificar" + "?cierre=" + 0,
                        type: "GET",
                        dataType: "json",
                        contentType: "application/x-www-form-urlencoded; charset=utf-8",
                        success: function (response) {
                            if (response != null) {

                                $("#tRptIngrediente").show();
                                $("#tbl").hide();

                                if (response != undefined && response != null) {
                                    $("#tRptIngrediente tbody").html("");
                                    $.each(response, function (i, row) {
                                        // Verifica si cantidadUsada es diferente de 0 antes de agregar la fila
                                        if (row["cantidadUsada"] != '0,00') {
                                            $("<tr>").append(
                                                $("<td>").text(row["idInventario"]),
                                                $("<td>").text(row["nombreIngrediente"]),
                                                $("<td>").text(row["cantidadUsada"])
                                            ).appendTo("#tRptIngrediente tbody");
                                        }
                                    });
                                    resolve(response);
                                }
                            } else {
                                console.log("No se han devuelto datos.");
                            }
                        },
                        error: function (xhr, status, error) {
                            reject(error);
                        }
                    });
                });
            }

            obtenerDatos().then(datos => {
                if (datos.length === 0) {

                    $("#tRptIngrediente").hide();
                    $("#tbl").show();

                    if (!$.fn.DataTable.isDataTable('#tRptIngre')) {
                        tablaRptIngre = $('#tRptIngre').DataTable({
                            "ajax": {
                                "url": "/InventarioIngredientes/Obtener",
                                "type": "GET",
                                "datatype": "json"
                            },

                            "columns": [
                                { "data": "idInventario", "width": "25%" },
                                {
                                    "data": "objSuministro", "width": "25%", render: function (data) {
                                        return data.nombre
                                    }
                                },
                                { "data": "cantidad", "width": "25%" },
                                {
                                    "data": null, "width": "25%",
                                    "render": function (data, type, row) {
                                        if (type === 'display') {
                                            return '<input type="text" id="cantidad" class="txtCant">';
                                        }
                                        return data;
                                    }
                                }
                            ],

                            "responsive": true,
                            "searchable": false,
                            "language": {
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
                            "initComplete": function () {
                                $(".txtCant").inputFilter(function (value) {
                                    return /^\d*\.?\d*$/.test(value); // Permite números enteros o decimales con punto
                                });

                                filtrarInput(".txtCant");
                            }

                        });
                    }

                }
            }).catch(error => {
                console.error(error);
            });


         
       
        }
    },
    );
})


$("#btnSubmit").on('click', function (e) {
    e.preventDefault();

    // Obtener el valor del campo de entrada
    var cantidadValue = $('#cantidad').val();

    // Obtener los datos de todas las filas de la tabla
    var tableData = [];
    tablaRptIngre.rows().every(function () {
        var rowData = this.data();
        var rowValues = {};
        $(this.node()).find('td').each(function (index) {
            rowValues[index] = $(this).text();
        });
        tableData.push(rowValues);
    });

    var inputValues = [];
    tablaRptIngre.rows().every(function () {
        var rowData = this.data();
        var inputValue = $(this.node()).find('input[type="text"]').val();
        inputValues.push(inputValue);
    });

    // Construir los datos que deseas enviar al servidor
    var data = {
        inputValues: inputValues,
        tableData: tableData
    };

    var mayor = true;
    for (var i = 0; i < inputValues.length; i++) {
        var cantidadTabla = parseInt(tableData[i]['2']);
        var cantidadInput = parseInt(inputValues[i]);

        if (cantidadInput > cantidadTabla) {
            Swal.fire("Mensaje", "La cantidad ingresada para " + tableData[i]['1'] + " es mayor que la cantidad en la tabla.", "error");
            mayor = false;
            break;
        } else {
            if (inputValues[i] !== '') {
                tableData[i]['3'] = inputValues[i];
            } else {
                tableData[i]['3'] = tableData[i]['2'];
            }
        }

        // Calcular la cantidad vendida
        var stock = parseFloat(tableData[i]['2']);
        var queda = parseFloat(tableData[i]['3']);
        var vendio = 0;
        if (queda === stock) {
            vendio = 0;
            tableData[i]['vendio'] = vendio;
        } else {
            vendio = stock - queda;
            tableData[i]['vendio'] = vendio;
        }
      
        
    }

   

    if (mayor) {
        

        Swal.fire({
            title: 'Mensaje',
            text: "Los datos son correctos, esta acción no se puede revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#01579B',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                var xmlData = '<data>';
                for (var i = 0; i < inputValues.length; i++) {
                    xmlData += '<row>';
                    xmlData += '<tableData>';
                    xmlData += '<ID>' + tableData[i]['0'] + '</ID>';
                    xmlData += '<Nombre>' + tableData[i]['1'] + '</Nombre>';
                    xmlData += '<Stock>' + tableData[i]['2'] + '</Stock>';
                    xmlData += '<Queda>' + tableData[i]['3'] + '</Queda>';
                    xmlData += '<Uso>' + tableData[i]['vendio'] + '</Uso>';
                    xmlData += '<FechaInicio>' + $("#txtFechaInicio").val() + '</FechaInicio>';
                    xmlData += '</tableData>';
                    xmlData += '</row>';
                }
                xmlData += '</data>';
               
                $.ajax({
                    url: "/Reporte/CierreIngrediente",
                    type: "POST",
                    data: { xml: xmlData },
                    dataType: "json",
                    traditional: true,
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    success: function (response) {
                        $("#tRptIngrediente").show();
                        $("#tbl").hide();

                        if (response != undefined && response != null) {
                            $("#tRptIngrediente tbody").html("");
                            $.each(response, function (i, row) {
                                // Verifica si cantidadUsada es diferente de 0 antes de agregar la fila
                                if (row["cantidadUsada"] != 0) {
                                    $("<tr>").append(
                                        $("<td>").text(row["idInventario"]),
                                        $("<td>").text(row["nombreIngrediente"]),
                                        $("<td>").text(row["cantidadUsada"])
                                    ).appendTo("#tRptIngrediente tbody");
                                }
                            });
                        }


                        tablaRptIngre.ajax.reload();
                    },
                    error: function (xhr, status, error) {
                        // Manejar cualquier error de la solicitud
                        console.error(xhr.responseText);
                    }
                });

               
            }
        });
    }
});



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



