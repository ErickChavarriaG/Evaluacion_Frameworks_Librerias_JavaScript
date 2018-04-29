//Declaración de variables
var segundos = 10;
var minutos = 0;
var llamada;
var ceromin='';
var ceroseg='';
var finalizado= false;
var t;
var timer_is_on = 0;

$(function(){
	//"Match Game" está animado
	setInterval(function(){
	      $(".main-titulo").switchClass("main-titulo","main-titulo-2", 200),
	      $(".main-titulo").switchClass("main-titulo-2","main-titulo", 200)
  	}, 1000);
	//Función para cronometro
		function timedCount(){
				TiempoCero(minutos,segundos);
				segundos = segundos % 60;
				//document.getElementById("reloj").innerHTML=ceromin+minutos+':'+ceroseg+segundos;
				$('#timer').text(ceromin+minutos+':'+ceroseg+segundos);
				 if (minutos ===0 && segundos ===0){
						//alert ("Fin del Juego");
						Finalizar();
						stopCount();
				}
				if (segundos ==0){
						minutos --;
						segundos+=60;
				}
				segundos --;
				t = setTimeout(timedCount,1000);
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

		function startCount() {
	    if (!timer_is_on) {
	        timer_is_on = 1;
	        timedCount();
	    }
		};

		function stopCount() {
    clearTimeout(t);
    timer_is_on = 0;
		minutos = 0;
		segundos = 10;
		};

		//Finalizar
		function Finalizar() {
			finalizado = true;
			$(".panel-score").prepend('<h1 class="main-titulo" id="titulo-finalizado">Juego Terminado</h1>');
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
		}

		//Botón de inicio
		$(".btn-reinicio").on("click", function(){
			if ($(".btn-reinicio").text() == "Iniciar"){
				$(".btn-reinicio").html('Reiniciar');
				startCount();
				$('#score-text').text('100');
				$('#movimientos-text').text('200');
			}else{
				stopCount();
				$(".btn-reinicio").text("Iniciar");
				$('#timer').text('02:00');
				$('#score-text').text('0');
				$('#movimientos-text').text('0');
				if (finalizado) {
					//alert ("El juego ha finalizado");
			    $(".panel-tablero").show("slow");
					$(".time").show("slow");
					$('#titulo-finalizado').remove();
			    $(".panel-score").animate(
			      {
			        width: "25%"
			      }, 1000
			    );
				} else {
					alert ("El juego se ha reiniciado");
				}
			}
			//$(".btn-reinicio").html('Reiniciar');
		});

});
