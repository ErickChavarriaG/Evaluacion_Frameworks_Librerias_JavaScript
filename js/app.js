//Declaración de variables
var segundos = 30;
var minutos = 0;
var llamada;
var ceromin='';
var ceroseg='';
//var verifica = false;

$(function(){
	//"Match Game" está animado
	setInterval(function(){
	      $(".main-titulo").switchClass("main-titulo","main-titulo-2", 200),
	      $(".main-titulo").switchClass("main-titulo-2","main-titulo", 200)
  	}, 1000);
	//Función para cronometro
		function CronoMetro(){
				TiempoCero(minutos,segundos);
				segundos = segundos % 60;
				//document.getElementById("reloj").innerHTML=ceromin+minutos+':'+ceroseg+segundos;
				$('#timer').text(ceromin+minutos+':'+ceroseg+segundos);
				 if (minutos ===0 && segundos ===0){
						//alert ("Fin del Juego");
						Finalizar();
						//clearTimeOut(crono);
				}
				if (segundos ==0){
						minutos --;
						segundos+=60;
				}
				segundos --;
				var crono = setTimeout(CronoMetro,1000);
		};

		function TiempoCero(minutos,segundos){
				if (minutos<10){
						ceromin='0';

				}
				if (segundos<10){
						ceroseg='0';

				}else {
						ceroseg='';
				}
				 return ceroseg;return ceromin;
		};

		//Reiniciar
		// function ReiniciarJuego(verifica) {
		//   clearTimeout(crono);
		//   $(".btn-reinicio").text("Iniciar");
		//   if (verifica) {
		//     $(".panel-tablero").show("slow");
		//     $(".panel-score").animate(
		//       {
		//         width: "-=50"
		//       }, 1000
		//     );
		//     verifica=false;
		//   };
		//
		// }

		//Finalizar
		function Finalizar() {
		  //clearTimeout(crono);
			$(".panel-score").prepend('<h1 class="main-titulo">Juego Terminado</h1>');
			$(".main-titulo").css("text-align", "center");
			$(".main-titulo-2").css("text-align", "center");
		  $(".panel-tablero").hide("slide", {direction: "left"}, "slow");
			$(".time").hide("slide", {direction: "left"}, "slow");
		  $(".panel-score").animate(
		    {
		      //width: "+=50"
					width: "85%"
		    }, 1000
		  );
		  //verifica=true;
		}

		//Botón de inicio
		$(".btn-reinicio").on("click", function(){
			if ($(".btn-reinicio").text() == "Iniciar"){
				$(".btn-reinicio").html('Reiniciar');
				CronoMetro();
			}else{
				$(".btn-reinicio").html('Iniciar');
				$('#timer').text('02:00');
			}
			$(".btn-reinicio").html('Reiniciar');

		});

});
