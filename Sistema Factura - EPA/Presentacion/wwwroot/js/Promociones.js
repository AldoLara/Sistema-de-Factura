var tablabebida;
var tablacomida;
var tabladata;
var tablaProductosP;
var tablaProductos;


var abierto = 0;
var $editar = 0;
var diasSeleccionados = [];
var indice =  0;
$(document).ready(function () {

   

    //OBTENER BEBIDAS
    tablabebida = $('#tbBebida').DataTable({
        "ajax": {
            "url": "/Bebida/Obtener",
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
                    return "<button class='btn btn-sm btn-primary ml-2' type='button' onclick='bebidaSelect(" + JSON.stringify(row) + ")'><i class='fa fa-check'></i></button>"
                },
                "orderable": false,
                "searchable": false,
                "width": "90px"
            },

            { "data": "iD_Bebida", "width": "10%" },
            { "data": "iD_Producto", "visible": false, "width": "10%" },
            {
                "data": "objSuministro", render: function (data) {
                    return data.nombre
                }
            },
            {
                "data": "objSuministro", render: function (data) {
                    return data.descripcion
                }
            }
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


    //OBTENER COMIDAS
    tablacomida = $('#tbComida').DataTable({
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

            {
                "data": "iD_Comida", "render": function (data, type, row, meta) {
                    return "<button class='btn btn-sm btn-primary ml-2' type='button' onclick='comidaSelect(" + JSON.stringify(row) + ")'><i class='fa fa-check'></i></button>"
                }
            },
            { "data": "iD_Comida", "width": "10%" },
            { "data": "iD_Producto", "visible": false, "width": "10%" },
            {
                "data": "objProducto", render: function (data) {
                    return data.nombre
                }
            },
            { "data": "descripcion", "width": "20%" }

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

  
    //OBTENER PROMOCIONES
    tabladata = $('#tbdata').DataTable({
        "ajax": {
            "url": "/Promocion/Obtener",
            "type": "GET",
            "datatype": "json"
        },

        "columns": [

            { "data": "iD_Promocion", "width": "10%" },
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
                "data": "estado", "render": function (data) {
                    if (data) {
                        return '<span class="badge badge-success">Activo</span>'
                    } else {
                        return '<span class="badge badge-warning">Inactivo</span>'
                    }
                }, "width": "10%"
            },
            {
                "data": "iD_Promocion", "render": function (data, type, row, meta) {
                    return "<button class='btn btn-info btn-sm' type='button' onclick='abrirPopUpForm(" + JSON.stringify(row) + ")'> <i class='fas fa-pen'></i>Editar</button> || " +
                        "<button id='openMenuBtn' class='btn btn-primary btn-sm' onclick='MostrarDatos(" + data + ", 0)'>Productos</button>";
                },
                "orderable": false,
                "searchable": false,
                "width": "90px"
            },
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

})
function buscarBebida() {

    tablabebida.ajax.reload();
    abierto = 0;
    $('#modalComida').modal('hide');
    $('#modalBebida').modal('show');
}

function buscarComidas() {

    tablacomida.ajax.reload();
    abierto = 1;
    $('#modalBebida').modal('hide');
    $('#modalComida').modal('show');
}





function abrirPopUpForm(json) {

    if (json != null) {
        
        $("#txtIdPromo").val(json.iD_Promocion);
        $("#txtNombrePromocion").val(json.nombre);
        $("#txtPrecioPromocion").val(json.precio);
        $("#cboEstado").val(json.estado == true ? 1 : 0);

        var diasSeleccionados = json.dias.trim().split(',').map(function (dia) {
            return dia.trim(); 
        });
        $("#cboDias input[type='checkbox'][name]").each(function () {
            var nombreDia = $(this).attr('name');
            var estaSeleccionado = diasSeleccionados.indexOf(nombreDia) !== -1;

            $(this).prop('checked', estaSeleccionado);
        });
        var table = $("#tbproducto").DataTable();
        table.clear().destroy();
        MostrarDatos(json.iD_Promocion,1)

    } else {
        $("#txtIdPromo").val("");
        $("#txtNombrePromocion").val("");
        $("#txtPrecioPromocion").val("");
        $("#cboEstado").val(1);  

        $("#cboDias input[type='checkbox']").prop('checked', false);
        var table = $("#tbproducto").DataTable();
        table.clear().destroy();

    }

    $('#FormModal').modal('show');
}

function abrirPopUpForm2(json) {

    if (abierto == 0) {
        $('#modalComida').modal('hide');
        $('#modalBebida').modal('show');
    } else if (abierto == 1) {
        $('#modalBebida').modal('hide');
        $('#modalComida').modal('show');
    }
}


function bebidaSelect(json) {
    $("#txtIdIngrediente").val("");
    $("#txtid").val(json.iD_Bebida);
    $("#txtIdProducto").val(json.iD_Producto);

    $("#txtCodigoProducto").val(json.iD_Bebida);
    $("#txtNombreProducto").val(json.objSuministro.nombre);
    $('#modalBebida').modal('hide');

    
}
function comidaSelect(json) {
    $("#txtIdIngrediente").val("");
    $("#txtid").val(json.iD_Comida);
    $("#txtIdProducto").val(json.iD_Producto);

    $("#txtCodigoProducto").val(json.iD_Comida);
    $("#txtNombreProducto").val(json.objProducto.nombre);
    $('#modalComida').modal('hide');

    
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

$("#txtCantidadProducto").inputFilter(function (value) {
    return /^\d*$/.test(value);
});

$("#txtPrecioPromocion").inputFilter(function (value) {
    return /^\d*[.]?\d{0,2}$/.test(value);
});



$('#btnAgregar').on('click', function () {

    

    if (indice === 0) {
        var table = $("#tbproducto").DataTable();
        table.clear().destroy();
       
        indice = 1;
    }

    var existe_nombre = false;
    if (
        parseInt($("#txtCodigoProducto").val()) === 0 ||
        parseInt($("#txtNombreProducto").val()) === 0 ||
        $("#txtCantidadProducto").val() === "" 
        
    ) {
        Swal.fire("Mensaje", "Debe completar todos los campos", "warning");
        return;
    }
  

    $('#tbproducto > tbody  > tr').each(function (index, tr) {
        var fila = tr;
        var nombreproducto = $(fila).find("td.nombreproducto").text();

        if (nombreproducto == $("#txtNombreProducto").val()) {
            existe_nombre = true;
            return false;
        }

    });

    if (!existe_nombre) {
        $("<tr>").append(
            $("<td>").append(
                $("<button>").addClass("btn btn-danger btn-sm").text("Eliminar")
            ),

            $("<td>").addClass("idproducto").append($("#txtIdProducto").val()).hide(),
            $("<td>").addClass("codigoproducto").append($("#txtCodigoProducto").val()),
            $("<td>").addClass("nombreproducto").append($("#txtNombreProducto").val()),
            $("<td>").addClass("cantidad").append($("#txtCantidadProducto").val())
           
        ).appendTo("#tbproducto tbody");

        $("#txtIdProducto").val("");
        $("#txtid").val("");
        $("#txtCodigoProducto").val("");
        $("#txtNombreProducto").val("");
        $("#txtCantidadProducto").val("");

    } else {
        Swal.fire("Mensaje", "El producto ya existe", "warning")
    }
})


$('#btnGuardar').on('click', function () {
    if ($('#tbproducto > tbody  > tr').length == 0) {
        Swal.fire("Mensaje", "No existen detalles", "warning")
        return;
    }

    var re = verificarCheckboxes()
    if (re === false) {
        return;
    }

    if (
        $("#txtNombrePromocion").val() === "" ||
        $("#txtPrecioPromocion").val() === ""
    ) {
        Swal.fire("Mensaje", "Debe completar todos los campos", "warning");
        return;
    }

    if ($("#txtIdPromo").val() !== "") {
        //AACTUALIZAR
        var cadenaDias = diasSeleccionados.join(", ");
        var $xml = "<DETALLE>";
        var promocion = "<PROMOCION>" +
            "<Id>" + $("#txtIdPromo").val() + "</Id>" +
            "<Nombre>" + $("#txtNombrePromocion").val() + "</Nombre>" +
            "<Precio>" + $("#txtPrecioPromocion").val() + "</Precio>" +
            "<Dias>" + cadenaDias + "</Dias>" +
            "<Estado>" + $("#cboEstado").val() + "</Estado>" +
            "</PROMOCION>";
        var menupro = "<MENUPROMOCION>";

        $('#tbproducto > tbody  > tr').each(function (index, tr) {
            var fila = tr;
            var idproducto = parseFloat($(fila).find("td.idproducto").text());
            var cantidad = parseFloat($(fila).find("td.cantidad").text());

            menupro += "<DETALLE>" +
                "<IdProducto>" + idproducto + "</IdProducto>" +
                "<IdPromocion>" + $("#txtIdPromo").val() +"</IdPromocion>" +
                "<Cantidad>" + cantidad + "</Cantidad>" +
                "</DETALLE>";
        });

        $xml += promocion + menupro + "</MENUPROMOCION></DETALLE>";

        var request = { xml: $xml };

        jQuery.ajax({
            url: "/Promocion/Actualizar",
            type: "POST",
            data: { xml: $xml },
            dataType: "json",
            traditional: true,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success: function (data) {


                if (data.resultado) {

                    $("#txtNombrePromocion").val("");
                    $("#txtPrecioPromocion").val("");
                    $("#cboEstado").val(1);

                    //PRODUCTO
                    $("#txtIdProducto").val("");
                    $("#txtCodigoProducto").val("");
                    $("#txtNombreProducto").val("");
                    $("#txtCantidadProducto").val("");
                    $("#txtid").val("");

                    $("#tbproducto tbody").html("");

                    tabladata.ajax.reload();
                    Swal.fire("Mensaje", "Se actualizo correctamente ", "success")
                    $('#FormModal').modal('hide');
                } else {

                    Swal.fire("Mensaje", "No se pudo actualizar ", "warning")
                }
            },
            error: function (error) {
                console.log(error)
            },
            beforeSend: function () {

            },
        });

    }
    else {

        //GUARDAR

    var cadenaDias = diasSeleccionados.join(", ");
    var $xml = "<DETALLE>";
    var promocion = "<PROMOCION>" +
        "<Nombre>" + $("#txtNombrePromocion").val() + "</Nombre>" +
        "<Precio>" + $("#txtPrecioPromocion").val() + "</Precio>" +
        "<Dias>" + cadenaDias + "</Dias>" +
        "<Estado>" + $("#cboEstado").val() + "</Estado>" +
        "</PROMOCION>";
    var menupro = "<MENUPROMOCION>";

    $('#tbproducto > tbody  > tr').each(function (index, tr) {
        var fila = tr;
        var idproducto = parseFloat($(fila).find("td.idproducto").text());
        var cantidad = parseFloat($(fila).find("td.cantidad").text());

        menupro += "<DETALLE>" +
            "<IdProducto>" + idproducto + "</IdProducto>" +
            "<IdPromocion>0</IdPromocion>" +
            "<Cantidad>" + cantidad + "</Cantidad>" +
            "</DETALLE>";
    });

    $xml += promocion + menupro + "</MENUPROMOCION></DETALLE>";

    var request = { xml: $xml };

    jQuery.ajax({
        url: "/Promocion/Guardar",
        type: "POST",
        data: { xml: $xml }, 
        dataType: "json",
        traditional: true, 
        contentType: "application/x-www-form-urlencoded; charset=utf-8", 
        success: function (data) {


            if (data.resultado) {
                
                $("#txtNombrePromocion").val("");
                $("#txtPrecioPromocion").val("");
                $("#cboEstado").val(1);
                
                //PRODUCTO
                $("#txtIdProducto").val("");
                $("#txtCodigoProducto").val("");
                $("#txtNombreProducto").val("");
                $("#txtCantidadProducto").val("");
                $("#txtid").val("");

                $("#tbproducto tbody").html("");

                tabladata.ajax.reload();

                $('#FormModal').modal('hide');
                Swal.fire("Mensaje", "Se registro", "success")
               
            } else {

                Swal.fire("Mensaje", "No se pudo registrar ", "warning")
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
function verificarCheckboxes() {
    var hay = true;

    // Obtener todos los elementos checkbox dentro del contenedor
    var checkboxes = document.querySelectorAll('#cboDias input[type="checkbox"]');

    // Iterar sobre los checkboxes para verificar si al menos uno está marcado
    var alMenosUnoMarcado = Array.from(checkboxes).some(function (checkbox) {
        return checkbox.checked;
    });

    // Imprimir el resultado
    if (alMenosUnoMarcado) {
        diasSeleccionados = [];
        $(":checkbox:checked").each(function () {
            diasSeleccionados.push($(this).attr("name"));
        });
    } else {
        hay = false;
        Swal.fire("Mensaje", "Seleccione almenos un dia ", "warning")
        return hay;
    }
}

//PARA MOSTRAR LOS PRODUCTOS DE CADA PROMOCION
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('tbdata').addEventListener('click', function (event) {
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



function MostrarDatos($id, $editar) {
   

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

        $('#tbdata tbody').on('click', 'tr', function () {
          
            var contenidoNombre = $(this).find('td:eq(1)').text();
            $('#lblPromo').text('Promocion: '+ contenidoNombre);
        });
        

    } else {

        tablaProductos = $('#tbproducto').DataTable({
            "ajax": {
                "url": "/Promocion/ObtenerPP" + "?id=" + $id,
                "type": "GET",
                "datatype": "json"
            },
            "columns": [
                {
                    "data": null,
                    "render": function () {
                        return "<button class='btn btn-danger btn-sm' type='button'>Eliminar</button>";
                    }
                },

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
            searching: false,
            paging: false,
            info: false,
            responsive: true,
            "createdRow": function (row, data, index) {
                $('td:eq(1)', row).addClass('idproducto');
                $('td:eq(2)', row).addClass('nombreProducto');
                $('td:eq(3)', row).addClass('cantidad');
            },
            "drawCallback": function (settings) {
                // Verificar si la primera fila no contiene datos disponibles
                var primeraFila = $('#tbproducto tbody tr:first');
                if (primeraFila.find('td').length === 1 && primeraFila.find('td').text() === 'Ningun dato disponible en esta tabla') {
                    indice = 0;
                   
                } else {
                    indice = 1;
                }
            }
        });


    }
}
$('#tbproducto tbody').on('click', 'button[class="btn btn-danger btn-sm"]', function () {
    $(this).parents("tr").remove();
})



function eliminar($id) {

    Swal.fire({
        title: 'Está seguro de eliminar el registro?',
        text: "Esta acción no podrá revertirse!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminarlo',
        cancelButtonText: 'Cancelar eliminación'
    }).then((result) => {
        if (result.isConfirmed) {
            jQuery.ajax({
                url: "/Promocion/Eliminar" + "?id=" + $id,
                type: "GET",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {

                    if (data.resultado) {
                        Swal.fire(
                            'Eliminado!',
                            'Tu archivo ha sido eliminado.',
                            'success'
                        )
                        tabladata.ajax.reload();
                    } else {
                        Swal.fire("Mensaje", "No se pudo eliminar la categoria", "warning")
                    }
                },
                error: function (error) {
                    console.log(error)
                },
                beforeSend: function () {

                },
            });

        }
    },
    );
}

