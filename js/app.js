//Declaración de variables
var segundos = 30;
var minutos = 0;
var llamada;
var ceromin ='';
var ceroseg ='';
var finalizado = false;
var iniciado = false;
var t;
var timer_is_on = 0;
var contador = 0;

$(function(){
	//Función para cronometro
		function timedCount(){
				TiempoCero(minutos,segundos);
				segundos = segundos % 60;
				$('#timer').text(ceromin+minutos+':'+ceroseg+segundos);
				 if (minutos ===0 && segundos ===0){
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
	            $('.col-' + col).append(imagen);
	        }
	    }
			AddDulces();
		};

		//Resetear tablero
		function ResetearTablero() {
	    for (var col = 1; col <= 7; ++col) {
	        $('.col-' + col).empty();
	    }
		};

		//Movimiento de elementos
		function AddDulces() {
		  $('img').draggable({
		  containment: '.panel-tablero',
		  droppable: 'img',
		  revert: true,
		  revertDuration: 500,
		  grid: [100, 100],
		  zIndex: 10,
		  drag: Movimiento
		  });
		  $('img').droppable({
		    drop: MoverImagen
		  });
		 //HacerJugadaVertical();
		 //HacerJugadaHorizontal();
		}

		function MoverImagen(event, DragImg)
		{
		  var DragImg = $(DragImg.draggable);
		  var img1 = DragImg.attr('src');
		  var DropImg = $(this);
		  var img2 = DropImg.attr('src');
		  DragImg.attr('src', img2);
		  DropImg.attr('src', img1);

		  setTimeout(function () {
		    //HacerJugadaVertical();
		    //HacerJugadaHorizontal();
		    NuevoMovimiento();
		  }, 300);
		}

		function Movimiento(event, DragImg) {
		  DragImg.position.top = Math.min(100, DragImg.position.top);
		  DragImg.position.bottom = Math.min(100, DragImg.position.bottom);
		  DragImg.position.left = Math.min(100, DragImg.position.left);
		  DragImg.position.right = Math.min(100, DragImg.position.right);
		}

		//Aumenta contador de movimientos
		function NuevoMovimiento() {
				++contador;
		    $('#movimientos-text').text(contador);
		}

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
						width: "95%"
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
				$(".main-titulo").css("text-align", "left");
				InicializarTablero();
				startCount();
				//$('#score-text').text('100');
			}else{
				stopCount();
				ResetearTablero()
				$(".btn-reinicio").text("Iniciar");
				$('#timer').text('02:00');
				$('#score-text').text('0');
				$('#movimientos-text').text('0');
				if (finalizado) {
					$(".main-titulo").css("text-align", "left");
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
		});

});
