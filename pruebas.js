function main() {

  var canvas = document.getElementById("display");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var ctx = canvas.getContext("2d");

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

  var j1 = new raqueta(40,40)

  var j2 = new raqueta(canvas.width-40,40)

    j1.init(ctx);
    j1.draw();
    j2.init(ctx);
    j2.draw();

    var timer = null;

    var timer2 = null;

    var finish = false;


      if (!timer) {
        timer = setInterval(() => {
        window.onkeydown = (e) => {
          e.preventDefault();
          if (e.key == "s" || e.key == "w") {
            if (e.key == "s") {
              j1.direccion = "abajo";
            } else if (e.key == "w") {
              j1.direccion = "arriba";
            } else {
              finish = true;
            }
          }else if (e.key == "ArrowUp" || e.key == "ArrowDown"){
            if (e.key == "ArrowDown") {
              j2.direccion = "abajo";
            } else if (e.key == "ArrowUp") {
              j2.direccion = "arriba";
            } else {
              finish = true;
            }
          }
          }
          j1.update();
          j2.update();
          ctx.clearRect(0,0,canvas.width, canvas.height);
          j1.draw();
          j2.draw();
        },15);
    }
  }
