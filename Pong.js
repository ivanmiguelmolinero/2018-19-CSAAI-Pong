function main () {
  console.log("main: pong")
  console.log(window.innerHeight);
  var i = 0;

  var canvas = document.getElementById("display");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var ctx = canvas.getContext("2d");

  window.onkeydown = (e) => {
    e.preventDefault();

    console.log(e.key);
    if (e.key == 'a') {
      console.log("Tecla A apretada");
      console
    }
  }
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

    vx : 40,
    vy : 40,

    ctx : null,

    width: 5,
    height: 5,

    reset : function () {
      this.x = this.x_ini;
      this.y = this.y_ini;
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

  sacar.onclick = () => {
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
          clearInterval(timer)
          timer = null;
          bola.reset();
          bola.draw();
        }
      }, 20)
    }
  }

}
