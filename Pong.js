function main () {
  console.log("main: pong")
  console.log(window.innerHeight);
  var i = 0;

  var canvas = document.getElementById("display");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var ctx = canvas.getContext("2d");

/*
  ctx.fillStyle = 'white';
  ctx.fillRect(60,60, 10, 40);
  ctx.fillRect(550,300, 10, 40);

  ctx.fillRect(3*canvas.width/4, 3*canvas.height/4, 5, 5)

  while (i < canvas.height){

    ctx.fillRect(300, i, 2, 8);
    i = i + 15;
  }

  ctx.font = "50px Times New Roman"
  ctx.fillText("15",canvas.width/4, 40)

  ctx.font = "50px Comic Sans"
  ctx.fillText("0",3*canvas.width/4, 40)
*/
  var hitjugador1 = false;

  var bola = {

    x_ini : 50,
    y_ini : 50,

    x : 0,
    y: 0,

    vx : 7,
    vy : 7,

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

  bola.init(ctx);
  bola.draw();

  /*var raqueta = {

    x_ini: 40,
    y_ini: 40,

    x: 0,
    y: 0,

    ctx: null,

    vy: 7,

    width: 10,
    height: 60,

    direccion: null,

    reset: function () {
      this.x = this.x_ini;
      this.y = this.y_ini;
      this.direccion = null;
    },

    init : function(ctx) {
      this.reset();
      this.ctx = ctx;

    },

    draw: function() {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    },

    update: function() {
      if (this.direccion == "arriba") {
        this.y = this.y - this.vy;
      } else if (this.direccion == "abajo") {
        this.y = this.y + this.vy;
      }
    },

    hit: function(a,b) {
      for (i = this.y; i < this.y + this.height; i++) {
        if (a == raqueta.x + raqueta.width && ( b == i || b+1 == i || b+2 ==  i || b+3 ==  i || b+4 ==  i || b+5 ==  i) )  {
          choque_bola_raqueta = true;
          console.log("Han chocado");
        }
     }
   }

 }*/

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

  function hit(x,y,a,b) {
    for (var i = b; i < b + jugador1.height; i++) {
        if (x == a + jugador1.width && (y == i || y+1 == i || y+2 == i || y+3 == i || y+4 == i || y+5 == i)){
          hitjugador1 = true;
          console.log(hitjugador1);
        }
    }
  }

  var jugador1 = new raqueta(40,40);
  var jugador2 = new raqueta(canvas.width-40,40);

  jugador1.init(ctx);
  jugador1.draw();
  jugador2.init(ctx);
  jugador2.draw();

  var timer = null;
  window.onkeydown = (e) => {
    e.preventDefault();

    if (e.key == 'Enter'){
      // Lanzar el timer (si es que no estaba ya lanzado)
      if (!timer) {
        timer = setInterval(() =>{
          // Actualizar la bola
           bola.update()

         // Movimiento de una raqueta
         window.onkeydown = (e) => {
           e.preventDefault();
           if (e.key == 'w' && jugador1.y > jugador1.y_ini) {
             jugador1.direccion = "arriba";
           } else if (e.key == "s" && jugador1.y + jugador1.height < canvas.height ) {
             jugador1.direccion = "abajo";
           }
        }
        window.onkeyup = (e) => {
          if (e.key == 'w' || e.key == 's') {
            jugador1.direccion = "ninguna";
          }
        }

          jugador1.update();
          jugador2.update();
          // Borrar el canvas
          ctx.clearRect(0,0,canvas.width, canvas.height);

          //Dibujar la bola
          bola.draw()

          //Dibujar la raqueta
          jugador1.draw();
          jugador2.draw();

          //Comprobacion de si la bola choca con la raqueta
          hit(bola.x,bola.y,jugador1.x,jugador1.y)

          // Choque y rebote de la bola
          if (bola.x > canvas.width) {
            bola.vx = -7;
            bola.direccion = "izquierda";
          } else if (bola.y < 0 && bola.x < 0) {
            bola.vx = 7;
            bola.vy= 15;
            bola.direccion = "derecha";
          } else if (bola.x > canvas.width && bola.y > canvas.height) {
            bola.vx = -15;
            bola.vy = -7;
            bola.direccion = "izquierda";
          } else if (bola.x < 0 && bola.y > canvas.height) {
            bola.vx = 15;
            bola.vy = -7;
            bola.direccion = "derecha";
          } else if (bola.x > canvas.width && bola.y < 0) {
            bola.vx = -7;
            bola.vy = 15;
            bola.direccion = "izquierda";
          } else if (bola.y > canvas.height) {
            // Controlo la direccion de rebote de la bola
            if (bola.direccion == "izquierda") {
              bola.vx = -7;
              bola.vy = -7;
            } else {
              bola.vx = 7;
              bola.vy = -7;
            }
          } else if (bola.y < 0) {
            // Controlo la direccion de rebote de la bola
            if (bola.direccion == "izquierda") {
              bola.vx = -7;
              bola.vy = 7;
            } else {
              bola.vx = 7;
              bola.vy = 7;
            }
          } else if (bola.x < 0) {
            bola.vx = 7;
            bola.direccion = "derecha";
          } else if (hitjugador1) {
            bola.vx = 7;
            bola.direccion = "derecha";
            // Vuelvo a poner el choque en false para poder comprobarlo en cada interaccion
            hitjugador1 = false;
            console.log(hitjugador1)
          }

        }, 15)
      }
    }
  }


}
