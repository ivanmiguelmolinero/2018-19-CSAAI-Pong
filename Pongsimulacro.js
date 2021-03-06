function main () {
  console.log("main: pong")
  console.log(window.innerHeight);
  var e = 0;

  var audiopelota = document.getElementById("audiopelota")
  var saque = document.getElementById("saque")
  var canvas = document.getElementById("display");
  canvas.width = window.innerWidth - 25;
  canvas.height = window.innerHeight - 230;

  var ctx = canvas.getContext("2d");


  ctx.fillStyle = 'white';

//Función que dibuja la línea central
function midline () {
  while (e < canvas.height){

    ctx.fillRect(canvas.width/2, e, 2, 8);
    e = e + 15;
  }
  e = 0;
}

// Variables booleanas que serán usadas para comprobar si la bola choca con alguna de las raquetas
  var hitjugador1 = false;
  var hitjugador2 = false;
//Objeto bola
  var bola = {

    x_ini : 50,
    y_ini : 50,

    x : 0,
    y: 0,

    vx : -4,
    vy : 4,

    ctx : null,

    width: 5,
    height: 5,

    direccion: "derecha",

    reset : function () {
      this.x = this.x_ini;
      this.y = this.y_ini;
      this.direccion = "derecha";
    },

    init : function(ctx) {
      this.reset();
      this.ctx= ctx;
    },

    draw : function () {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    },

    update : function () {
      this.x = this.x + this.vx;
      this.y = this.y + this.vy;
    },
  }

  var bola2 = {

    x_ini : 50,
    y_ini : 50,

    x : 0,
    y: 0,

    vx : -8,
    vy : 8,

    ctx : null,

    width: 5,
    height: 5,

    direccion: "derecha",

    reset : function () {
      this.x = this.x_ini;
      this.y = this.y_ini;
      this.direccion = "derecha";
    },

    init : function(ctx) {
      this.reset();
      this.ctx= ctx;
    },

    draw : function () {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    },

    update : function () {
      this.x = this.x + this.vx;
      this.y = this.y + this.vy;
    },
  }

//Funcion constructora de las raquetas
  function raqueta (x,y) {

    this.x_ini= x;
    this.y_ini= y;

    this.x= 0;
    this.y= 0;

    this.ctx= null;

    this.vy= 10;

    this.width= 10;
    this.height= 60;

    this.direccion= null;

    this.puntuacion = 0;

    this.reset= function () {
      this.x = this.x_ini;
      this.y = this.y_ini;
      this.direccion = null;
    }

    this.init = function(ctx) {
      this.reset();
      this.ctx = ctx;

    }

    this.draw= function() {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.update= function() {
      if (this.direccion == "arriba") {
        this.y = this.y - this.vy;
      } else if (this.direccion == "abajo") {
        this.y = this.y + this.vy;
      }
    }
  }

  //Funciones que comprueban el choque de las raquetas
  function hit1(x,y,a,b) {
    for (var i = b; i <= b + jugador1.height; i++) {
        if ((x <= a + jugador1.width && x >= a) && (y == i || y+1 == i || y+2 == i || y+3 == i || y+4 == i || y+5 == i)){
          hitjugador1 = true;
          console.log("paso");
        }
      }
  }
  function hit2(x,y,a,b) {
    for (var i = b; i <= b + jugador2.height; i++) {
        if ((x >= a && x <= a +jugador2.width)  && (y == i || y+1 == i || y+2 == i || y+3 == i || y+4 == i || y+5 == i)){
          hitjugador2 = true;
        }
      }
  }
  function resetmatch (){
    clearInterval(timer);
    timer = null;
    bola.reset();
    bola2.reset();
    jugador1.reset();
    jugador2.reset();
    ctx.clearRect(0,0,canvas.width, canvas.height);
    jugador1.draw();
    jugador2.draw();
    midline();
    ctx.font = "40px Impact"
    ctx.fillText(jugador1.puntuacion,canvas.width/4, 40);
    ctx.font = "40px impact"
    ctx.fillText(jugador2.puntuacion,3*canvas.width/4, 40);
  }



  var jugador1 = new raqueta(40,40);
  var jugador2 = new raqueta(canvas.width-40,40);

  jugador1.init(ctx);
  jugador1.draw();
  jugador2.init(ctx);
  jugador2.draw();
  bola.init(ctx);
  bola.draw();
  bola2.init(ctx);
  bola2.draw();

  //Dibujar la linea separadora del medio
  midline();

  ctx.font = "40px Impact"
  ctx.fillText(jugador1.puntuacion,canvas.width/4, 40);

  ctx.font = "40px impact"
  ctx.fillText(jugador2.puntuacion,3*canvas.width/4, 40);

  var timer = null;
  jugar();
function jugar() {
  window.onkeydown = (e) => {
    e.preventDefault();

    if (e.key == 'Enter' && !timer){
      saque.play();
      // Lanzar el timer (si es que no estaba ya lanzado)
        timer = setInterval(() =>{
          // Actualizar la bola
           bola.update()
           bola2.update();

         // Movimiento de una raqueta
         window.onkeydown = (e) => {
           e.preventDefault();
           if (e.key == 'w' && jugador1.y >= jugador1.y_ini) {
             jugador1.direccion = "arriba";
           } else if (e.key == "s" && jugador1.y < canvas.height ) {
             jugador1.direccion = "abajo";
           } else if (jugador1.y < jugador1.y_ini || jugador1.y + jugador1.height >= canvas.height) {
             jugador1.direccion = "ninguna";
           } else if (e.key == 'ArrowUp' && jugador2.y >= jugador2.y_ini) {
             jugador2.direccion = "arriba";
           } else if (e.key == "ArrowDown" && jugador2.y + jugador2.height <= canvas.height ) {
             jugador2.direccion = "abajo";
           } else if (jugador2.y < jugador2.y_ini || jugador2.y + jugador2.height >= canvas.height) {
             jugador2.direccion = "ninguna";
           }
        }
        window.onkeyup = (e) => {
          if (e.key == 'w' || e.key == 's') {
            jugador1.direccion = "ninguna";
          } else if (e.key == 'ArrowUp' || e.key == 'ArrowDown') {
            jugador2.direccion = "ninguna";
          }
        }

          jugador1.update();
          jugador2.update();
          midline();
          // Borrar el canvas
          ctx.clearRect(0,0,canvas.width, canvas.height);

          //Dibujar la bola
          bola.draw()
          bola2.draw();

          //Dibujar la raqueta
          jugador1.draw();
          jugador2.draw();

          //Dibujar la linea separadora del medio
          midline();

          //Comprobacion de si la bola choca con la raqueta
          hit1(bola.x,bola.y,jugador1.x,jugador1.y)
          if (!hitjugador1){
            hit2(bola.x,bola.y,jugador2.x,jugador2.y)
          }

          // Choque y rebote de la bola
          if (bola.x > canvas.width) {
            jugador1.puntuacion = jugador1.puntuacion + 1;
            resetmatch();
            bola.vx = -4;
            bola.vy = 4;
            bola.x = canvas.width - 45;
            bola.direccion = "izquierda"
            bola2.vx = -8;
            bola2.vy = 8;
            bola2.x = canvas.width - 45;
            bola2.direccion = "izquierda"
            bola.draw();
            bola2.draw();
            jugar();
          } else if (bola.y > canvas.height) {
            // Controlo la direccion de rebote de la bola
            if (bola.direccion == "izquierda") {
              bola.vx = -4;
              bola.vy = -4;
            } else {
              bola.vx = 4;
              bola.vy = -4;
            }
          } else if (bola.y < 0) {
            // Controlo la direccion de rebote de la bola
            if (bola.direccion == "izquierda") {
              bola.vx = -4;
              bola.vy = 4;
            } else {
              bola.vx = 4;
              bola.vy = 4;
            }
          } else if (bola.x < 0) {
            jugador2.puntuacion = jugador2.puntuacion + 1;
            resetmatch();
            bola.vx = 4;
            bola.vy = 4;
            bola2.vx = 8;
            bola.vy = 8;
            bola.draw();
            bola2.draw();
            jugar();
          } else if (hitjugador1) {
            bola.vx = 4;
            bola.direccion = "derecha";
            // Vuelvo a poner el choque en false para poder comprobarlo en cada interaccion
            hitjugador1 = false;
            audiopelota.play();
          } else if (hitjugador2) {
            bola.vx = -4;
            bola.direccion = "izquierda";
            hitjugador2 = false;
            audiopelota.play();
          }

          // Rebote de la bola 2
          if (bola2.x > canvas.width) {
            bola2.vx = -4;
            bola2.direccion = "izquierda"
          } else if (bola2.y > canvas.height) {
            // Controlo la direccion de rebote de la bola
            if (bola2.direccion == "izquierda") {
              bola2.vx = -8;
              bola2.vy = -8;
            } else {
              bola2.vx = 8;
              bola2.vy = -8;
            }
          } else if (bola2.y < 0) {
            // Controlo la direccion de rebote de la bola
            if (bola2.direccion == "izquierda") {
              bola2.vx = -8;
              bola2.vy = 8;
            } else {
              bola2.vx = 8;
              bola2.vy = 8;
            }
          } else if (bola2.x < 0) {
            bola2.vx = 8;
            bola2.direccion = "derecha"
          }

        }, 15)
    }
  }
}


}
