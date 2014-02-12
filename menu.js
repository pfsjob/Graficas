var datos = [];
var x="X";
var y="Y";
function creaMenu(eje){
	if(eje=="X")
		$("body").append('<select id='+eje+' class='+eje+' name="Eje '+eje+'" size="20"  onClick="javascript:dibuja(x)" multiple>');
	if(eje=="Y")
		$("body").append('<select id='+eje+' class='+eje+' name="Eje '+eje+'" size="20"  onClick="javascript:dibuja(y)" multiple>');
	$("."+eje).append('<option selected>---Elige Variables para el eje '+eje+'---</option>');
	d3.json("datos.json",function(error,data){
		for(var tipo in data){
			$("."+eje).append('<option>'+tipo+'</option>');
		}
	});
    $("body").append('</select>');
}
$(document).ready(function(){
	creaMenu("X");
	creaMenu("Y");
});

