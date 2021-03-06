;(function(){
    angular.module('minesweep-r.game')
        .controller('GameController', GameController);
        
    
        
    function GameController() {

  var vm = this;
  vm.boardHeight = 9;
  vm.boardWidth = 9;
  vm.mineCordinates = '1,5,20,21,22,14,10,40,81';
  vm.title = "Hello world";




  vm.handleClick = function(x, y) {
    
    if (x < 0 || y < 0 || x >= vm.boardWidth || y >= vm.boardHeight ) {
      return;
    } else {
      if (vm.gameBoard[y][x] === undefined || vm.gameBoard[y][x].clicked === true) {
        return;
      }
      vm.gameBoard[y][x].clicked = true;
      if(vm.gameBoard[y][x].numberOfSurroundingMines >0 || vm.gameBoard[y][x].hasMine){
        return;
      }
      var stuff = [{
        'x': x - 1,
        'y': y
      }, {
        'x': x,
        'y': y - 1
      }, {
        'x': x + 1,
        'y': y
      }, {
        'x': x,
        'y': y + 1
      },{
        'x': x +1,
        'y': y -1
      },{
        'x': x-1,
        'y': y -1
      },{
        'x': x-1,
        'y': y + 1
      },{
        'x': x+1,
        'y': y + 1
      }];

     
        angular.forEach(stuff, function(value, key) {
       
          if(value.x === 2 && value.y ===3){
            console.debug('here');
          }
          vm.handleClick(value.x, value.y);


        });
     
    }

  }

  function resetBoard() {

    vm.gameBoard = new Array(vm.boardHeight);
    for (var y = 0; y < vm.boardHeight; y++) {
      vm.gameBoard[y] = new Array(vm.boardWidth);
      for (var x = 0; x < vm.boardWidth; x++) {
        vm.gameBoard[y][x] = {
          hasMine: false,
          numberOfSurroundingMines: -1,
          positionX: x,
          positionY: y,
          clicked: false
        }
      }
    }

  }


  vm.generateMap = function() {
    resetBoard();

    var mineCordinates = vm.mineCordinates.split(',');
    for (var n = 0; n < mineCordinates.length; n++) {
      var cord = getCordinates(mineCordinates[n], vm.boardWidth, vm.boardHeight);
      vm.gameBoard[cord.y][cord.x].hasMine = true;

    }



    for (var y = 0; y < vm.boardHeight; y++) {
      for (var x = 0; x < vm.boardWidth; x++) {
        vm.gameBoard[y][x].numberOfSurroundingMines = numberOfSurroundingMines(vm.gameBoard, x, y);
      }
    }


  }

  function getCordinates(val, width, height) {
    var y = Math.ceil(val / width);
    var x = (val % width);

    return {
      'x': (x > 0 ? x : width) - 1,
      'y': y - 1
    }
  }

  function numberOfSurroundingMines(arry, startX, startY) {
    console.debug('y + x' + startY + ':' + startX);
    if (arry[startY][startX].hasMine) {
      return 0;
    }
    var a = startX;
    var b = startY;
    startY--;
    startX--;
    var countOfMines = 0;
    for (var y = startY; y < startY + 3; y++) {
      for (var x = startX; x < startX + 3; x++) {
        if (x >= 0 && y >= 0 && x < arry[0].length && y < arry.length && !(x == a && y == b)) {
          console.debug('----y + x' + y + ':' + x + '-' + arry[y][x].hasMine);
          if (arry[y][x].hasMine) {

            countOfMines++;
          }
        }
      }
    }
    console.debug('count' + countOfMines);


    return countOfMines;
  }
}
}());