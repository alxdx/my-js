class_status = {
    'Proceso': 'proceso',
    'Aclaración':'aclaracion',
    'Almacén':'almacen',
    'Cancelado':'cancelado',
    'Cotización':'cotizacion',
    'ETA':'seta',
    'Eta':'seta'
}

$.fn.dataTable.ext.buttons.grouping = {
    class: 'group-button',
    text: 'Activar agrupamiento',
    action: function ( e, dt, node, config ) {
        if(dt.rowGroup().enabled()){
            dt.rowGroup().enable(false).draw();
            this.text('Activar agrupamiento');
        }else{
            dt.rowGroup().enable().draw();
            this.text('Desactivar agrupamiento');
        }
    }
};

$(document).ready(function(){

    //duplica la primera columna 
    $('#datatable thead tr')
        .clone(true)
        .appendTo('#datatable thead');
    //instancia la tabla
	var table = $('#datatable').
        // listener para ejecuta al terminar la construccion de la tabla
        on('init.dt',function(){
            var api = $('#datatable').dataTable().api();
            api.columns().eq(0).each(function (colIdx) {
                // Set the header cell to contain the input element
                var cell = $('#datatable thead td').eq(
                     $(api.column(colIdx).header()).index()
                );
                var title = $(cell).text();
                if(title!='Cant'){
                    $(cell).html('<input type="text" placeholder="' + title + '" class="hidInput" />');
                    // TODO: sinppet for dropdown list!! 
                    //$(cell).html(
                     //'<select name="select">' +
                     //    '<option value="value1">Value 1</option>' +
                     //    '<option value="value2" selected>Value 2</option>' +
                     //    '<option value="value3">Value 3</option>' +
                     //'</select>'
                     //);
                
                }else{
                    $(cell).html('');                    
                }
                if(!api.column(colIdx).responsiveHidden()){
                    cell.addClass('hide');
                }
            });
        })
        //tabla constructor
        .DataTable({
            dom:"<'row'<'col-sm-6'><'col-sm-6'f>>" +
            "<'row'<'col-sm-12'itr>>" +
            "<'row'<'col-sm-5'i><'col-sm-7'p>>",
            columnDefs:[
                {
                    targets:[8,9],
                    searchable:false
                }
            ],
            buttons: [
                    {
                        extend:'copy',
                        split : [
                            {
                                extend:'pdf',
                                orientation:'landscape',
                                exportOptions: {
                                    modifier: {
                                        page: 'current'
                                    },
                                    columns:[0,1,2,3,4,5,6,10,11,12,7]
                                }
                            }
                        ,   {
                                extend:'print',
                                orientation:'landscape',
                                exportOptions: {
                                    modifier: {
                                        page: 'current'
                                    },
                                    columns:[0,1,2,3,4,5,6,10,11,12]
                                }
                            },
                            'excel'
                    ]}, 'grouping'
            ],
            searching:true,
            paging:true,
            pageLength:200,
            lengthChange:false,
            autoWidth:false,
            info:true,
            responsive:{
                details: {
                    display: $.fn.dataTable.Responsive.display.modal( {
                        header: function ( row ) {
                            var data = row.data();
                            return 'Status <strong>Pieza '+data[4]+'</strong>';
                        }
                    } ),
                    renderer: $.fn.dataTable.Responsive.renderer.listHidden()
                }
            },
            fixedHeader:true,
            colReorder:{
                order:[0,1,2,3,4,5,6,10,11,12,7,14,15,16,17,13,8,9],
                realtime: false
            },
            language:{
                search:"Buscar en toda la tabla:",
                paginate:{
                    "previous":"Anterior",
                    "next":"Siguiente"
                },
                buttons:{
                    "copy":"Copiar datos actuales",
                    "print":"Imprimir datos actuales",
                    "pdf":"Exportar datos actuales a PDF",
                    "excel":"Exportar datos actuales a excel"
                },
                "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
                "infoFiltered": "(Filtrado de _MAX_ registros)",
                "infoEmpty": "Mostrando 0 a 0 de 0 registros",
                "zeroRecords": "No se encontraron coincidencias"
            },
            createdRow: function (row,data,index){
                $('td', row).eq(7).addClass(class_status[data[7]]);
            }
	    });
	table.buttons().container().appendTo( '#datatable_wrapper .col-sm-6:eq(0)');

    new $.fn.dataTable.RowGroup( table );
    table.rowGroup().enable(false);
    table.rowGroup().dataSrc([0,1]).draw();
    
    // listener para buscar el texto sobre los texts de los headers
    $("#datatable thead td input").on( 'keyup change', function () {
        table.column( $(this).parent().index()+':visible' ).search( this.value ).draw();
    } );
    // listener para modificar el header principal al hacer resizing
    table.on('responsive-resize', function ( e, api, columns ) {
        api.columns().eq(0).each(function (colIdx) {
                var cell = $('#datatable thead td').eq(
                     $(api.column(colIdx).header()).index()
                );
                if(columns[colIdx]){
                    cell.removeClass('hide');
                }else{
                    cell.addClass('hide');
                }
            });
    });
    table.on('column-reorder', function ( e, api, columns ) {
    });
    // ---------- datachar instance -------------
    const data = table.column(':contains(Status)').data().reduce(function (c, p) {
        c[p] = (c[p] || 0) + 1;
        return c;
    }, {});
    const labels = Object.keys(data);
    console.log(Object.values(data));
    const ctx = $('#datachar');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(data),
            datasets: [{
                label: 'No. Piezas por Status',
                data: Object.values(data),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    $("#closechar").on('click',function() {
        console.log('ohno');
        $("#char").css("width","0");
        $("#table").css("marginRight","0");
        table.fixedHeader.enable();
    });
    $("#header_informe").on('click',function() {
        console.log('pressed');
        $("#char").css("width","500px");
        $("#table").css("marginRight", "500px");
        table.fixedHeader.disable();
    });
});
