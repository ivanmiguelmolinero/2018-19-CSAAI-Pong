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
  var bola = {

    x_ini : 50,
    y_ini : 50,

    x : 0,
    y: 0,

    vx : 15,
    vy : 15,

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
      console.log("Bola: init")
      this.reset();
      this.ctx= ctx;
    },

    draw : function () {
      console.log("bola: draw")
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    },

    update : function () {
      console.log("bola: update");
      this.x = this.x + this.vx;
      this.y = this.y + this.vy;
    },

  }

  bola.init(ctx);
  bola.draw();

  var timer = null;

  var sacar = document.getElementById("sacar");

  window.onkeydown = (e) => {
    e.preventDefault();

    if (e.key == 'Enter'){
      // Lanzar el timer (si es que no estaba ya lanzado)
      if (!timer) {
        timer = setInterval(() =>{
          console.log("tic");
          // Actualizar la bola
           bola.update()

          // Borrar el canvas
          ctx.clearRect(0,0,canvas.width, canvas.height);

          //Dibujar la bola
          bola.draw()

          // Condicion de terminacion
          if (bola.x > canvas.width) {
            bola.vx = -15;
            bola.direccion = "izquierda";
          } else if (bola.y < 0 && bola.x < 0) {
            bola.vx = 15;
            bola.vy= 30;
            bola.direccion = "derecha";
          } else if (bola.x > canvas.width && bola.y > canvas.height) {
            bola.vx = -30;
            bola.vy = -15;
            bola.direccion = "izquierda";
          } else if (bola.vx < 0 && bola.vy > canvas.height) {
            bola.vx = 30;
            bola.vy = -15;
            bola.direccion = "derecha";
          } else if (bola.x > canvas.width && bola.y < 0) {
            bola.vx = -15;
            bola.vy = 30;
            bola.direccion = "izquierda";
          } else if (bola.y > canvas.height) {
            // Controlo la direccion de rebote de la bola
            if (bola.direccion == "izquierda") {
              bola.vx = -15;
              bola.vy = -15;
            } else {
              bola.vx = 15;
              bola.vy = -15;
            }
          } else if (bola.y < 0) {
            // Controlo la direccion de rebote de la bola
            if (bola.direccion == "izquierda") {
              bola.vx = -15;
              bola.vy = 15;
            } else {
              bola.vx = 15;
              bola.vy = 15;
            }
          } else if (bola.x < 0) {
            bola.vx = 15;
            bola.direccion = "derecha";
          }
        }, 20)
      }
    }
  }

}
