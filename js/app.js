//Declaración de variables
var segundos = 0;
var minutos = 2;
var llamada;
var ceromin ='';
var ceroseg ='';
var finalizado = false;
var iniciado = false;
var t;
var timer_is_on = 0;
var contador = 0;
var score = 0;

$(function(){
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

		function startCount() {
	    if (!timer_is_on) {
	        timer_is_on = 1;
	        timedCount();
	    }
		};

		function stopCount() {
    clearTimeout(t);
    timer_is_on = 0;
		minutos = 2;
		segundos = 0;
		};

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

		function ResetearTablero() {
	    for (var col = 1; col <= 7; ++col) {
	        $('.col-' + col).empty();
	    }
		};

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
		 ValidaV();
		 ValidaH();
		}

		function ValidaV()
		{
		  var eliminados = 0
		  for (var x = 1; x <8; x++) {
		    var vecesVertical=0;
		    var dulceAnterior="";
		    var imagenesEliminar = new Array();
		    for (var y = 0; y < 7; y++) {
		      var dulce= $(".col-"+x).children('img')[y].src;
		      if (dulce==dulceAnterior ) {
		        vecesVertical+=1;
		        if (vecesVertical==1) {
		          imagenesEliminar[1]=$(".col-"+x).children('img')[y-1];
		        }
		        imagenesEliminar[vecesVertical+1]=$(".col-"+x).children('img')[y];
		      }
		      else if (dulce!=dulceAnterior && vecesVertical<2){
		        vecesVertical=0;
		        imagenesEliminar = new Array();
		      }
		      var dulceAnterior = dulce;
		    }
		    if (vecesVertical>=2){
		      for (var i = 1; i <= vecesVertical+1; i++) {
		        imagenesEliminar[i].remove();
		        eliminados += 1;
		      };
		      NuevoPuntaje();
		    };

		  }
		  if (eliminados>1) {
		    RellenaTablero();
		  };
		}

		function ValidaH()
		{
		  var eliminadosX = 0
		  for (var x = 1; x < 8; x++) {
		    var vecesHorizontal=0;
		    var dulceAnteriorX="";
		    var imagenesEliminarX = new Array();
		    var z=0
		    for (var y = 0; y < 7; y++) {
		      z+=1
		      var dulceX = $(".col-"+z).children('img')[x-1].src;
		      if (dulceX==dulceAnteriorX) {
		        vecesHorizontal+=1;
		        if (vecesHorizontal==1) {
		          var anterior = z-1
		          imagenesEliminarX[1]=$(".col-"+anterior).children('img')[x-1];
		        }
		        imagenesEliminarX[vecesHorizontal+1]=$(".col-"+z).children('img')[x-1]

		      } else if (dulceX!=dulceAnteriorX && vecesHorizontal<2){
		        vecesHorizontal=0;
		        imagenesEliminarX = new Array();
		      };
		     var dulceAnteriorX = dulceX;
		    };
		    if (vecesHorizontal>=2){
		      for (var h = 1; h <= vecesHorizontal+1; h++) {
		        imagenesEliminarX[h].remove();
		        eliminadosX += 1;
		      }
		      NuevoPuntaje();
		    };
		    if (eliminadosX>1) {RellenaTablero();};
		  };

		}

		function RellenaTablero()
		{
		  for (var i = 1; i < 8; i++) {
		    var hijos = 7- $(".col-"+i).children('img').length;
		    for (var j = 0; j < hijos; j++) {
		      var tipoDulce= Math.floor((Math.random() * 4) + 1);
		      var elementoImg=document.createElement('img')
		      $(".col-"+i).prepend(elementoImg)
		      $(elementoImg).addClass('elemento')
		      $(elementoImg).attr('src',"image/"+tipoDulce+".png")
		    };
		  };
		  AddDulces();
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
		    ValidaV();
		    ValidaH();
		    NuevoMovimiento();
		  }, 600);
		}

		function Movimiento(event, DragImg) {
		  DragImg.position.top = Math.min(100, DragImg.position.top);
		  DragImg.position.bottom = Math.min(100, DragImg.position.bottom);
		  DragImg.position.left = Math.min(100, DragImg.position.left);
		  DragImg.position.right = Math.min(100, DragImg.position.right);
		}

		function NuevoMovimiento() {
			++contador;
	    $('#movimientos-text').text(contador);
		}

		function NuevoPuntaje(){
			++score;
		  $('#score-text').text(score);
		}

		function Finalizar() {
			if (!finalizado) {
				$(".panel-score").prepend('<h1 class="main-titulo" id="titulo-finalizado">Juego Terminado</h1>');
				$(".main-titulo").css("text-align", "center");
				$(".main-titulo-2").css("text-align", "center");
			  $(".panel-tablero").hide("slide", {direction: "left"}, "slow");
				$(".time").hide("slide", {direction: "left"}, "slow");
			  $(".panel-score").animate(
			    {
						width: "95%"
			    }, 1000
			  );
			}
			finalizado = true;
			iniciado = false;
			stopCount();
		}

		$(".btn-reinicio").on("click", function(){
			if (!iniciado) {
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
