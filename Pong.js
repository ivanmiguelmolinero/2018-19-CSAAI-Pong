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

  var i;

  var choque_bola_raqueta = false;

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

  var raqueta = {

    x_ini: 40,
    y_ini: 40,

    x: 0,
    y: 0,

    ctx: null,

    vy: 30,

    width: 10,
    height: 60,

    direccion: null,

    init : function(ctx) {
      this.x = this.x_ini;
      this.y = this.y_ini;
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

  }

  raqueta.init(ctx);
  raqueta.draw();

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

           if (e.key == 'ArrowUp' && raqueta.y > raqueta.y_ini) {
             raqueta.direccion = "arriba";
             raqueta.update()
           } else if (e.key == "ArrowDown" && raqueta.y + raqueta.height < canvas.height ) {
             raqueta.direccion = "abajo";
             raqueta.update();
           }
        }

          // Borrar el canvas
          ctx.clearRect(0,0,canvas.width, canvas.height);

          //Dibujar la bola
          bola.draw()

          //Dibujar la raqueta
          raqueta.draw();

          //Comprobacion de si la bola choca con la raqueta
          raqueta.hit(bola.x,bola.y)

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
          } else if (bola.vx < 0 && bola.vy > canvas.height) {
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
          } else if (choque_bola_raqueta) {
            bola.vx = 7;
            bola.direccion = "derecha";
            // Vuelvo a poner el choque en false para poder comprobarlo en cada interaccion
            choque_bola_raqueta = false;
          }

        }, 15)
      }
    }
  }

}
