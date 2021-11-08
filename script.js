$(document).ready(function(){

    //$('#datatable thead tr td').each(function(){
    //	console.log(this);
    //	$(this).append( '<input type="text" placeholder="Search '+'" />' );
    //});
    $('#datatable thead tr')
        .clone(true)
        .appendTo('#datatable thead');

	var table = $('#datatable').
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
                }else{
                    $(cell).html('');                    
                }
                if(!api.column(colIdx).responsiveHidden()){
                    cell.addClass('hide');
                }
            });
        })
        .DataTable({
		columnDefs:[
			{
				targets:[8,9],
				searchable:false
			}
		],
        buttons: [
            'copy', 'excel', 
            {
            	extend:'pdf',
            	text:'Guardar pagina actual en PDF',
                orientation:'landscape',
            	exportOptions: {
	                modifier: {
	                    page: 'current'
	                },
	                columns:[0,1,2,3,4,5,6,10,11,12,7]
            	}
            },
            {
            	extend:'print',
            	text:'Imprimir pagina actual',
                orientation:'landscape',
            	exportOptions: {
	                modifier: {
	                    page: 'current'
	                },
	                columns:[0,1,2,3,4,5,6,10,11,12]
            	}
            }
        ],
		searching:true,
		paging:true,
		pageLength:200,
		lengthChange:false,
		autoWidth:false,
		info:true,
        responsive:true,
		colReorder:{
			order:[0,1,2,3,4,5,6,10,11,12,7,14,15,16,17,13,8,9]
		},
		rowGroup: false
        //{
		//	dataSrc:[0,1]
		//}
        ,
		language:{
			search:"Buscar en toda la tabla:",
			paginate:{
				"previous":"Anterior",
				"next":"Siguiente"
			},
			buttons:{
				"copy":"Copiar",
				"print":"Imprimir"
			},
			"info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
			"infoFiltered": "(Filtrado de _MAX_ registros)",
			"infoEmpty": "Mostrando 0 a 0 de 0 registros",
			"zeroRecords": "No se encontraron coincidencias"
		}
	});
	table.buttons().container().appendTo( '#datatable_wrapper .col-sm-6:eq(0)' );
    new $.fn.dataTable.FixedHeader( table );
    
    $("#datatable thead td input").on( 'keyup change', function () {
    	console.log($(this).attr('name'));
        table.column( $(this).parent().index()+':visible' ).search( this.value ).draw();
    } );

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
});




/**
$(document).ready(function () {
    // Setup - add a text input to each footer cell
    $('#example thead tr')
        .clone(true)
        .addClass('filters')
        .appendTo('#example thead');
 
    var table = $('#example').DataTable({
        orderCellsTop: true,
        fixedHeader: true,
        initComplete: function () {
            var api = this.api();
 
            // For each column
            api
                .columns()
                .eq(0)
                .each(function (colIdx) {
                    // Set the header cell to contain the input element
                    var cell = $('.filters th').eq(
                        $(api.column(colIdx).header()).index()
                    );
                    var title = $(cell).text();
                    $(cell).html('<input type="text" placeholder="' + title + '" />');
 
                    // On every keypress in this input
                    $(
                        'input',
                        $('.filters th').eq($(api.column(colIdx).header()).index())
                    )
                        .off('keyup change')
                        .on('keyup change', function (e) {
                            e.stopPropagation();
 
                            // Get the search value
                            $(this).attr('title', $(this).val());
                            var regexr = '({search})'; //$(this).parents('th').find('select').val();
 
                            var cursorPosition = this.selectionStart;
                            // Search the column for that value
                            api
                                .column(colIdx)
                                .search(
                                    this.value != ''
                                        ? regexr.replace('{search}', '(((' + this.value + ')))')
                                        : '',
                                    this.value != '',
                                    this.value == ''
                                )
                                .draw();
 
                            $(this)
                                .focus()[0]
                                .setSelectionRange(cursorPosition, cursorPosition);
                        });
                });
        },
    });
});



**/

