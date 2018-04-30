//Declaración de variables
var segundos = 10;
var minutos = 0;
var llamada;
var ceromin ='';
var ceroseg ='';
var finalizado = false;
var iniciado = false;
var t;
var timer_is_on = 0;

$(function(){
	//Función para cronometro
		function timedCount(){
				TiempoCero(minutos,segundos);
				segundos = segundos % 60;
				//document.getElementById("reloj").innerHTML=ceromin+minutos+':'+ceroseg+segundos;
				$('#timer').text(ceromin+minutos+':'+ceroseg+segundos);
				 if (minutos ===0 && segundos ===0){
						//alert ("Fin del Juego");
						Finalizar();
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

		//Iniciar Contador
		function startCount() {
	    if (!timer_is_on) {
	        timer_is_on = 1;
	        timedCount();
	    }
		};

		//Detener Contador
		function stopCount() {
    clearTimeout(t);
    timer_is_on = 0;
		minutos = 0;
		segundos = 10;
		};

		//Inicializar tablero
		function InicializarTablero() {
	    for (var col = 1; col <= 7; ++col) {
	        for (var fila = 1; fila <= 7; ++fila) {
	            var imagen = $('<img>',
	                {"src": "image/" + (1 + Math.floor(Math.random() * 4)) + ".png", "class": "elemento"}
	            );
	            $(imagen).draggable();
							//alert ("agregando imagen");
	            $('.col-' + col).append(imagen);
	        }
	    }
		};

		//Resetear tablero
		function ResetearTablero() {
	    for (var col = 1; col <= 7; ++col) {
	        $('.col-' + col).empty();
	    }
		};

		//Finalizar
		function Finalizar() {
			if (!finalizado) {
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
			finalizado = true;
			iniciado = false;
			stopCount();
		}

		//Botón de inicio
		$(".btn-reinicio").on("click", function(){
			if (!iniciado) {
				//"Match Game" está animado
				setInterval(function(){
				      $(".main-titulo").switchClass("main-titulo","main-titulo-2", 200),
				      $(".main-titulo").switchClass("main-titulo-2","main-titulo", 200)
			  	}, 1000);
					iniciado = true;
			}
			if ($(".btn-reinicio").text() == "Iniciar"){
				$(".btn-reinicio").html('Reiniciar');
				InicializarTablero();
				startCount();
				$('#score-text').text('100');
				$('#movimientos-text').text('200');
			}else{
				stopCount();
				ResetearTablero();
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
				}
				// else {
				// 	alert ("El juego se ha reiniciado");
				// }
			}
			//$(".btn-reinicio").html('Reiniciar');
		});

});
