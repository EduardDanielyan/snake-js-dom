class Game{
	static canvas = document.querySelector('#myCanvas')
	static ctx = Game.canvas.getContext('2d')
	constructor () {
		this.snake = new Snake()
		this.food = new Food()
		this.move()
		Game.int=setInterval(this.play,100)
		
	}

	play = () =>{
		this.create()
		this.snake.create()
		this.food.create()
		this.check()
	}
	create(){
		Game.ctx.fillStyle = 'black'
		Game.ctx.fillRect(0,0,Game.canvas.width,Game.canvas.height)
		
	}

	move(){
		document.addEventListener('keydown',(e)=>{
			if(e.key == 'ArrowRight' && this.snake.vx == 0){
				this.snake.vx = 1
				this.snake.vy = 0
			}
			else if(e.key == 'ArrowLeft' && this.snake.vx == 0){
				this.snake.vx = -1
				this.snake.vy = 0
			}
			else if(e.key == 'ArrowUp' && this.snake.vy == 0){
				this.snake.vx = 0
				this.snake.vy = -1
			}
			
			else if(e.key == 'ArrowDown' && this.snake.vy == 0){
				this.snake.vx = 0
				this.snake.vy = 1
			}
		})

	}

	check(){
          let head = this.snake.body[this.snake.body.length-1]
          if(head.x===this.food.x && head.y===this.food.y){
          	this.snake.count++
          	this.food = new Food()
          }
          for(let i=0 ; i<this.snake.body.length-1 ; i++){
          	if(head.x==this.snake.body[i].x && head.y==this.snake.body[i].y){
          		clearInterval(Game.int)
          		Game.ctx.fillStile = `red`
          		Game.ctx.font="70px gabriola"
          		Game.ctx.fillText('Game Over', 200, 200)
          	}
          }
          if(this.snake.x<0){
          	this.snake.x = Game.canvas.width/20
          }
          if(this.snake.y<0){
          	this.snake.y = Game.canvas.height/20
          }
          if(this.snake.x*20 > Game.canvas.width){
          	this.snake.x = 0
          }
          if (this.snake.y*20 > Game.canvas.height){
          	this.snake.y = 0
          }
	}

}

let g = new Game()
const pouse = document.querySelector('.pause')
pouse.addEventListener('click',function(){
	if(this.classList.contains('active')){
		Game.int=setInterval(g.play,100)
		this.innerHTML = 'Pause'
	}
    else{
    	clearInterval(Game.int)
    	this.innerHTML = 'Play'
    }
    this.classList.toggle('active')
})


const music = document.querySelector('.music')
music.onclick = function(){
	erg()
}

function erg(){
	let a = new Audio()
	a.src = 'audio/1.mp3'
	a.play()
	setTimeout(()=>{
		a.pause()
	},300000)
}


function random(a){
	return Math.round(Math.random()*a)
}
function randomcolor(){
	return `rgb(${random(255)}, ${random(255)}, ${random(255)})`
}