// $(document).ready(function(){
	
//     $('body').addClass('first');
//     $('.card').click(function(){
//           $(this).toggleClass('open');
//       if ($('body').hasClass('first')) {
//         setTimeout(init,10);
//       }
//       $('body').removeClass('first');
//       });
    
//     function Brush(x,y,size,jitt,maxHeight,color,invert) {
//       this.x = x;
//       this.y = y;
//       this.height = 0;
//       this.size = size;
//       this.jitt = jitt;
//       this.maxHeight = maxHeight;
//       this.color = color;
//       this.invert = invert;
//   }
//   Brush.prototype.grow = function() {
//       if( this.height ++ > this.maxHeight ) {
//           return;
//       }
//       requestAnimationFrame(this.grow.bind(this));
//       var y = this.invert ? this.maxHeight - this.height : this.height;
//       context.beginPath();
//       context.moveTo(this.x - this.size/2, y);
//       context.lineTo(this.x + this.size/2, y);
//       context.strokeStyle = this.color;
//       context.stroke();
//       context.closePath();
//       this.x += Math.random() * this.jitt - (this.jitt / 2);
//   }
//   function itterate() {
//       for( var i = 0; i < 16; i++ ) {
//           if( count >= limit ) return;
  
//           var x = Math.random() * width,
//               y = height,
//               size = Math.random() * 15 + 15,
//               jitt = Math.random() + 0.6,
//               maxHeight = height;
//           new Brush(x,y,size,jitt,maxHeight,color(count++),Math.random()>0.5).grow();
//       }
//       setTimeout(itterate, Math.random() * 300);
//   }
//   function color(i) {
//       var r = Math.floor( Math.sin(i) * 127 + 128 );
//       var g = Math.floor( Math.sin(i + 2) * 127 + 128 );
//       var b = Math.floor( Math.sin(i + 3) * 127 + 128 );
//       return 'rgb(' + r + ', ' + g + ',' + b + ')';
//   }
//   function init() {
//       canvas = document.getElementById('canvas');
//       context = canvas.getContext('2d');
//       height = canvas.height = $(document).height();
//       width = canvas.width = $(document).width();
//       count = 0;
//       limit = 1024;
//       context.globalAlpha = 0.88;
//       itterate();
//   }
//   var canvas,context,height,width,count,limit;
  
//   });

document.addEventListener("DOMContentLoaded", function () {



    const card = document.querySelector('.card');
    const button = document.querySelector('.cover button');
    const canvas = document.getElementById('canvas');
  
    // Verificar si el canvas es compatible
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
      const particles = [];
      const numParticles = 100;
  
      // Clase para las partículas
      function Particle(x, y, vx, vy, radius, color) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
        this.color = color;
      }
  
      // Actualizar la posición de la partícula
      Particle.prototype.update = function () {
        this.x += this.vx;
        this.y += this.vy;
  
        // Reubicar la partícula si sale de los límites del canvas
        if (this.x - this.radius > canvas.width) {
          this.x = -this.radius;
        } else if (this.x + this.radius < 0) {
          this.x = canvas.width + this.radius;
        }
        if (this.y - this.radius > canvas.height) {
          this.y = -this.radius;
        } else if (this.y + this.radius < 0) {
          this.y = canvas.height + this.radius;
        }
      };
  
      // Dibujar la partícula
      Particle.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      };
  
      // Crear las partículas
      for (let i = 0; i < numParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const vx = (Math.random() - 0.5) * 2;
        const vy = (Math.random() - 0.5) * 2;
        const radius = Math.random() * 3 + 1;
        const color = 'rgba(255, 255, 255, 0.8)';
        particles.push(new Particle(x, y, vx, vy, radius, color));
      }
  
      // Función de animación
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
          particle.update();
          particle.draw(ctx);
        });
        requestAnimationFrame(animate);
      }
  
      // Ajustar el tamaño del canvas al tamaño de la ventana
      function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
  
      // Escuchar el evento de redimensionamiento
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();
      animate();
    }
  
    // Añadimos un event listener al botón para abrir la tarjeta
    button.addEventListener('click', () => {
      card.classList.toggle('open');
    });
  });
  