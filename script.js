function format(d){
	return '<table class="mychild">'+
	'<tr>'+'<td>Detalle de estatus:</td>'+
		'<td>'+d[8]+'</td>'+
	'</tr>'+
	'<tr>'+
		'<td>Estatus anterior:</td>'+
		'<td>'+d[9]+'</td>'+
	'</tr>'+'</table>';
}
$(document).ready(function(){
	var table = $('#table_id').DataTable({
		columnDefs:[
			{
				targets:[8,9],
				visible:false,
				searchable:false
			}
		],
		searching:true,
		paging:true,
		autoWidth:false,
		info:true,
		select:true,
		scrollCollapse:true,
		fixedHeader:false
	});
	// Add event listener for opening and closing details
	$('#table_id tbody').on('click','tr', function () {
		var tr = $(this).closest('tr');
		var row = table.row( tr );
		if ( row.child.isShown() ) {
		// This row is already open - close it
			row.child.hide();tr.removeClass('shown');
		}else{
		// Open this row
			row.child( format(row.data()) ).show();
			tr.addClass('shown');
		}
	});

	$('tr > .descripcion').click(function(){
		$(this).toggleClass('active');
	});
});