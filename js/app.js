$(function(){
	setInterval(function(){
	      $(".main-titulo").switchClass("main-titulo","main-titulo-2", 200),
	      $(".main-titulo").switchClass("main-titulo-2","main-titulo", 200)
  	}, 1000);
});
