$(document).ready(function(){

	var table = $('#datatable').DataTable({
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
		pageLength:50,
		lengthChange:false,
		autoWidth:false,
		info:true,
		responsive:true,
		colReorder:{
			order:[0,1,2,3,4,5,6,10,11,12,7,14,15,16,17,13,8,9]
		},
		rowGroup:false,
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
    
});





