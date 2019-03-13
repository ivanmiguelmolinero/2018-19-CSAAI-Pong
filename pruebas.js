function main() {

  var canvas = document.getElementById("display");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var ctx = canvas.getContext("2d");

  var raqueta = {

    x_ini: 40,
    y_ini: 40,

    x: 0,
    y: 0,

    ctx: null,

    vy: 15,

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
  }

    raqueta.init(ctx);
    raqueta.draw();

    var timer = null;

    var finish = false;


      if (!timer) {
        timer = setInterval(() => {
        window.onkeydown = (e) => {
          e.preventDefault();
          if (e.key == "s") {
            raqueta.direccion = "abajo";
          } else if (e.key == "w") {
            raqueta.direccion = "arriba";
          } else if (e.key == "Enter") {
            finish = true;
          }
        }
        raqueta.update();
        ctx.clearRect(0,0,canvas.width, canvas.height);
        raqueta.draw();
        },15);
    }
  }
