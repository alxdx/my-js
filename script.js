$(document).ready(function(){
	var table = $('#datatable').DataTable({
		columnDefs:[
			{
				targets:[8,9],
				searchable:false
			}
		],
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
		searching:true,
		paging:true,
		pageLength:50,
		lengthChange:false,
		autoWidth:false,
		info:true,
		select:true,
		scrollCollapse:true,
		fixedHeader:false,
		responsive:true,
		fixedHeader:true,
		colReorder:{
			order:[0,1,2,3,4,5,6,10,11,12,13,14,15,16,17,7,8,9]
		},
		rowGroup:false
	});
table.buttons().container()
        .appendTo( '#datatable_wrapper .col-sm-6:eq(0)' );
});