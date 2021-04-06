class pin {
  constructor(_x, _y, _col){
    //this.loc = [parseInt(_x), parseInt(_y)];
    this.x = _x;
    this.y = _y;
    this.color = _col;
    this.selected = false;
    this.canMoveTo = [];
    this.highlighted = false;
    if((this.x == 3 && this.y == 2) || (this.x == 7 && this.y == 2)){
      this.canMoveTo = [[5, 0]];
    }
    this.checkMoves = function(){
      updateGrid();
      this.canMoveTo = [];
      if(true){
        if(this.x < 8){if(grid[this.x+4][this.y] == 'empty' && grid[this.x+2][this.y] != 'empty'){this.canMoveTo.push([this.x+4, this.y]);}}
        if(this.x < 10){
          if(grid[this.x+2][this.y+2] == 'empty' && grid[this.x+1][this.y+1] != 'empty'){this.canMoveTo.push([this.x+2, this.y+2]);}
          if(grid[this.x+2][this.y-2] == 'empty' && grid[this.x+1][this.y-1] != 'empty'){this.canMoveTo.push([this.x+2, this.y-2]);}
        }
      }
      if(true){
        if(this.x >= 4){if(grid[this.x-4][this.y] == 'empty' && grid[this.x-2][this.y] != 'empty'){this.canMoveTo.push([this.x-4, this.y]);}}
        if(this.x >= 2){if(grid[this.x-2][this.y+2] == 'empty' && grid[this.x-1][this.y+1] != 'empty'){this.canMoveTo.push([this.x-2, this.y+2]);}}
        if(this.x >= 2){if(grid[this.x-2][this.y-2] == 'empty' && grid[this.x-1][this.y-1] != 'empty'){this.canMoveTo.push([this.x-2, this.y-2]);}}
      }
    };
    this.moveTo = function(_x, _y) {
      this.checkMoves();
      this.deselect();
      grid[(this.x + _x)/2][(this.y + _y)/2].x = -1;
      grid[(this.x + _x)/2][(this.y + _y)/2].y = -1;
      this.x = _x;
      this.y = _y;
      drawGrid();
      this.checkMoves();
    };
    this.draw = function(){
      if(this.x != -1 && this.y != -1){
        ctx.fillStyle = this.color;
        this.highlighted = false;
        circle(this.x, this.y);
      }
    };
    this.select = function(){
      this.selected = true;
      selected = [this.x, this.y];
      ctx.strokeStyle = "#ffffaa";
      this.draw();
      ctx.strokeStyle = "#000000";
      this.checkMoves();
      for(let i=0; i < this.canMoveTo.length; i++){
        ctx.fillStyle = "#ffffff";
        ctx.strokeStyle = "#aaffff";
        circle(this.canMoveTo[i][0], this.canMoveTo[i][1]);
        ctx.strokeStyle = "#000000";
      }
    };
    this.deselect = function(){
      this.checkMoves();
      this.selected = false;
      selected = false;
      this.draw();
      for(let i=0; i < this.canMoveTo.length; i++){
        ctx.fillStyle = "#ffffff";
        ctx.strokeStyle = "#000000";
        circle(this.canMoveTo[i][0], this.canMoveTo[i][1]);
      }
    };
  }
}
let emptyGrid = function(){
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ln(5, 0, 1, 4);
  ln(5, 0, 9, 4);
  ln(4, 1, 6, 1);
  ln(4, 1, 7, 4);
  ln(6, 1, 3, 4);
  ln(3, 2, 7, 2);
  ln(3, 2, 5, 4);
  ln(7, 2, 5, 4);
  ln(2, 3, 8, 3);
  ln(2, 3, 3, 4);
  ln(8, 3, 7, 4);
  ln(1, 4, 9, 4);
  ctx.stroke();
  circle(5, 0);
  circle(4, 1);
  circle(6, 1);
  circle(3, 2);
  circle(5, 2);
  circle(7, 2);
  circle(2, 3);
  circle(4, 3);
  circle(6, 3);
  circle(8, 3);
  circle(1, 4);
  circle(3, 4);
  circle(5, 4);
  circle(7, 4);
  circle(9, 4);
};

let selected = false;
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let cSize = 30;
let pins = [];
let grid = {};
ctx.lineWidth = 4;
//11
emptyGrid();

pins[0] = new pin(4, 1, "#0000ff");
pins[1] = new pin(6, 1, "#0000ff");
pins[2] = new pin(3, 2, "#00ffff");
pins[3] = new pin(5, 2, "#00ffff");
pins[4] = new pin(7, 2, "#00ffff");
pins[5] = new pin(2, 3, "#ff0000");
pins[6] = new pin(4, 3, "#ff0000");
pins[7] = new pin(6, 3, "#ff0000");
pins[8] = new pin(8, 3, "#ff0000");
pins[9] = new pin(1, 4, "#00ffff");
pins[10] = new pin(3, 4, "#00ffff");
pins[11] = new pin(5, 4, "#00ffff");
pins[12] = new pin(7, 4, "#00ffff");
pins[13] = new pin(9, 4, "#00ffff");

updateGrid();
for(let i = 0; i<=pins.length-1;i++){
  pins[i].draw();
}
function drawGrid(){
  emptyGrid();
  for(let i = 0; i<=pins.length-1;i++){
    pins[i].draw();
  }
}

function circle(_x, _y){
  ctx.beginPath();
  ctx.arc(canvas.width/12*(_x+1),canvas.height/6*(_y+1),cSize,0,2*Math.PI);
  ctx.fill();
  ctx.stroke();
}

function ln(_x, _y, _x1, _y1){
  ctx.moveTo(canvas.width/12*(_x+1),canvas.height/6*(_y+1));
  ctx.lineTo(canvas.width/12*(_x1+1),canvas.height/6*(_y1+1));
}

function updateGrid(){
  for(let i=0; i <= 12; i++){
    grid[i] = {}; //initialise grid
    for(let j=0; j <= 4; j++){
      grid[i][j] = undefined; //initialise grid
    }
  }
  grid[5][0] = 'empty';
  grid[4][1] = 'empty';
  grid[6][1] = 'empty';
  grid[3][2] = 'empty';
  grid[5][2] = 'empty';
  grid[7][2] = 'empty';
  grid[2][3] = 'empty';
  grid[4][3] = 'empty';
  grid[6][3] = 'empty';
  grid[8][3] = 'empty';
  grid[1][4] = 'empty';
  grid[3][4] = 'empty';
  grid[5][4] = 'empty';
  grid[7][4] = 'empty';
  grid[9][4] = 'empty';
  for(let i = 0; i < pins.length; i++){
    if(pins[i].x != -1 && pins[i].y != -1){
      grid[pins[i].x][pins[i].y] = pins[i];
    }
  }
}

canvas.addEventListener("mousedown", function(e){
  let clickX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - canvas.offsetLeft;
  let clickY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop - canvas.offsetTop;
  let x = Math.round((clickX)/(canvas.width/12)-1);
  let y = Math.round((clickY)/(canvas.height/6)-1);
  //console.log(grid[Math.round((clickX)/(canvas.width/12)-1)][Math.round((clickY)/(canvas.height/6)-1)]);
  //debugger;
  if(grid[x][y] != undefined && grid[x][y] != 'empty'){
    if(selected == false){
      grid[x][y].select();
    }else if(grid[x][y].x == selected[0] && grid[x][y].y == selected[1]){
      grid[x][y].deselect();
    }
  }else if(selected != false){
    if(grid[x][y] == 'empty'){
      console.log(grid[selected[0]][selected[1]].canMoveTo.length);
      for(let i=0; i < grid[selected[0]][selected[1]].canMoveTo.length; i++){
        //debugger;

        if(grid[selected[0]][selected[1]].canMoveTo[i][0] == x && grid[selected[0]][selected[1]].canMoveTo[i][1] == y){
          //console.log("hi");
          grid[selected[0]][selected[1]].moveTo(x, y);
		  let pinNum = 0;
		  let poMo = [];
		  for(let j = 0; j < pins.length; j++){
			  if(pins[j].x != -1 && pins[j].y != -1) {
				  pinNum++;
				  pins[j].checkMoves();
				  poMo = poMo.concat(pins[j].canMoveTo);
				  //console.log(pins[i].canMoveTo);
			  }
			  
		  }
		  if(pinNum == 1){win();}
		  else if(poMo.length < 1){stuck();}
        }
      }
    }
  }
});

function win(){
	ctx.textAlign = "center";
	ctx.font = "100px Arial";
	ctx.fillText("You win!", canvas.width/2, canvas.height/2);
	ctx.strokeText("You win!", canvas.width/2, canvas.height/2);
}
function stuck(){
	ctx.textAlign = "center";
	ctx.font = "75px Arial";
	ctx.fillText("You're stuck", canvas.width/2, canvas.height/2);
	ctx.strokeText("You're stuck", canvas.width/2, canvas.height/2);
}
