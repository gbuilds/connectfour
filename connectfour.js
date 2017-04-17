class Board {
  // 7 columns, 6 rows
  // "red" "yel"
  // grid[0-6 column][0-5 row]

  constructor() {
    this.grid = [[],[],[],[],[],[],[]];
    this.playerOne = true;
    this.color = "red"
  }

  addPiece(grid, x, color) {
    var column = grid[x]
    var y = column.length
    if (y < 6 && x < 7) {
      column.push(color)
      return true
    } else {
      return false
    }
  }

  flipColor(color) {
    if (color == "red") {
      return "yel"
    } else {
      return "red"
    }
  }

  flipPlayer() {
    if (this.playerOne == false) {
      this.playerOne = true
    } else {
      this.playerOne = false
    }
  }

  isEmptyCell(column, row) {
    var cell = this.grid[column][row]
    if (cell === "red" || cell === "yel") {
      return false
    } else {
      return true
    }
  }

  turnInfo() {
    if (this.playerOne == true) {
      console.log("player one's turn...");
      console.log("playing", this.color);
    } else {
      console.log("player two's turn...");
      console.log("playing", this.color);
    }
  }

  randomMove() {
    var column = Math.floor((Math.random() * 7))
    var added = this.addPiece(this.grid, column, this.color)
    if (added) {
      console.log(`Placed ${this.color} in column ${column}`);
      this.color = this.flipColor(this.color)
      var victory = this.checksForAllWins()
      if (!victory) { console.log("Next turn.."); }
      return true
    } else {
      console.log(`Tried to put ${this.color} in column ${column}... full`);
      return false
    }
  }

  // CHECKS FOR WINNING CONDITIONS

  checksForAllWins() {
    var totalVictory = false
    var columnWin = this.checksForColumnWin()
    if (columnWin) {
      console.log('VICTORY: column win');
      totalVictory = columnWin;
    }
    var rowWin = this.checksForRowWin()
    if (rowWin) {
      console.log('VICTORY: row win');
      totalVictory = rowWin;
    }
    var upSlopeWin = this.checksForUpwardSlopeWin()
    if (upSlopeWin) {
      console.log('VICTORY: upwards slope win');
      totalVictory = upSlopeWin;
    }
    var downSlopeWin = this.checksForDownwardSlopeWin()
    if (downSlopeWin) {
      console.log('VICTORY: downwards slope win');
      totalVictory = downSlopeWin;
    }
    console.log(`victory: ${totalVictory}`);
    return totalVictory;
  }

  checksForColumnWin() {
    var victory = false;
    for (let i = 0; i < 7; i++) {
      var winner = this.columnWin(i, 0, 0, "yel");
      if (winner) { 
        console.log(`i: ${i}, winner: ${winner}, column win`);
        victory = winner
      }
    }
    return victory
  }

  checksForRowWin() {
    var victory = false;
    for (let i = 0; i < 6; i++) {
      var winner = this.rowWin(i, 0, 0, "yel");
      if (winner) { 
        console.log(`i: ${i}, winner: ${winner}, row win`);
        victory = winner
      }
    }
  return victory;
  }

  checksForUpwardSlopeWin() {
    var victory = false
    for (let i=0; i<6; i++) {
      var winner = this.upwardSlopeWin(i, 0, 0, "yel");
      if (winner) { 
        console.log(`i: ${i}, winner: ${winner}, upward sloped win`);
        victory = winner }
    }
    for (let i=0; i<5; i++) {
      var winner = this.upwardSlopeWin(0, i, 0, "yel");
      if (winner) { 
        console.log(`i: ${i}, winner: ${winner}, downward sloped win`);
        victory = winner 
      }
    }
    return victory;
  }

  checksForDownwardSlopeWin() {
    var victory = false
    for (let i=6; i < 0; i--) {
      var winner = this.downwardSlopeWin(i, 0, 0, "yel");
      if (winner) {
        console.log(`i: ${i}, winner: ${winner}, downward sloped win`);
        victory = winner;
      }
    }
    for (let i=0; i<5; i++) {
      var winner = this.downwardSlopeWin(6, i, 0, "yel");
      if (winner) {
        console.log(`i: ${i}, winner: ${winner}, downward sloped win`);
        victory = winner;
      }
    }
    return victory;
  }

  // CHECK FOR SINGLE WIN
  // ON A INDIVIDUAL COLUMN, ROW, DIAGONAL
  // e.g. columnWin(0,0,0, "yel")
  // upwardSlopeWin(0,4,0, "yel")

  columnWin(column, row, inARow, color) {
    if (inARow == 4) { return color }
    var notEnoughSpace = notEnoughSpacesToWin()
    if (notEnoughSpace) { console.log("end check for column ", column); return false };
    if (row > 6 ) { console.log("it broke"); return false }
    function notEnoughSpacesToWin() {
      // return false if number of spaces left for checking is greater or equal to
      // the number left needed to make a winning 4
      if (6 - row >= 4 - inARow) {
        return false
      } else {
        // there isnt enough space to continue our check
        return true
      }
    }
    if (row == 0) {
      var newColor = this.grid[column][row];
      var newScore = inARow + 1;
      var newRow = row + 1;
      return this.columnWin(column, newRow, newScore, newColor)
    } else if (this.grid[column][row] == color) {
      var newScore = inARow + 1
      var newRow = row + 1
      return this.columnWin(column, newRow, newScore, color)
    } else {
      var newColor = this.flipColor(color)
      var newRow = row + 1;
      return this.columnWin(column, newRow, 1, newColor)
    }
  }

  rowWin(row, column, inARow, color) {
    if (inARow == 4) { return color }
    var notEnoughSpace = notEnoughSpacesToWin();
    if (notEnoughSpace) { console.log("end check for row ", row); return false };
    if (column > 7 ) { console.log("it broke"); return false };
    function notEnoughSpacesToWin() {
      if (7 - column >= 4 - inARow) {
        return false
      } else {
        return true
      }
    }
    if (column == 0) {
      var newColor = this.grid[column][row];
      var newScore = inARow + 1;
      var newColumn = column + 1;
      return this.rowWin(row, newColumn, newScore, newColor)
    } else if (this.grid[column][row] == color) {
      var newScore = inARow + 1;
      var newColumn = column + 1;
      return this.rowWin(row, newColumn, newScore, color)
    } else {
      if (this.isEmptyCell(column, row)) {
        var newScore = 0
      } else {
        var newScore = 1
      }
      var newColor = this.flipColor(color)
      var newColumn = column + 1;
      return this.rowWin(row, newColumn, newScore, newColor)
    }
  }

  upwardSlopeWin(column, row, inARow, color) {
    if (inARow == 4) { return color }
    var notEnoughSpace = notEnoughSpacesToWin();
    if (notEnoughSpace) { console.log("end check for upward slope"); return false };
    if (column > 7 || row > 5 ) { console.log("it broke"); return false };
    function notEnoughSpacesToWin() {
      var spacesLeft = getSpacesLeft()
      function getSpacesLeft() {
        var columnsLeft = 6 - column;
        var rowsLeft = 5 - row;
        return Math.min(rowsLeft, columnsLeft);
      }
      if (spacesLeft >= 4 - inARow) {
        return false
      } else {
        return true
      }
    }
    if (column == 0 || row == 0) {
      var newColor = this.grid[column][row];
      var newScore = inARow + 1;
      var newRow = row + 1;
      var newColumn = column + 1;
      return this.upwardSlopeWin(newColumn, newRow, newScore, newColor)
    } else if (this.grid[column][row] == color) {
      var newScore = inARow + 1;
      var newColumn = column + 1;
      var newRow = row + 1;
      return this.upwardSlopeWin(newColumn, newRow, newScore, color)
    } else {
      if (this.isEmptyCell(column, row)) {
        var newScore = 0
      } else {
        var newScore = 1
      }
      var newColor = this.flipColor(color)
      var newColumn = column + 1;
      var newRow = row + 1;
      return this.upwardSlopeWin(newColumn, newRow, newScore, newColor)
    }
  }  

  // The "downward" slope check works the same as upwardSlopeWin but right to left

  downwardSlopeWin(column, row, inARow, color) {
    if (inARow == 4) { return color }
    var notEnoughSpace = notEnoughSpacesToWin()
    if (notEnoughSpace) { console.log("end check for downward slope"); return false };
    if (row > 6 ) { console.log("it broke"); return false }
    function notEnoughSpacesToWin() {
      var spacesLeft = getSpacesLeft()   
      function getSpacesLeft() {
        var columnsLeft = column;
        var rowsLeft = 5 - row;
        return Math.min(rowsLeft, columnsLeft);
      }
      if (spacesLeft >= 4 - inARow) {
        return false
      } else {
        return true
      }
    }
    if (column == 6 || row == 0) {
      var newColor = this.grid[column][row]
      var newScore = inARow + 1;
      var newRow = row + 1;
      var newColumn = column - 1;
      return this.downwardSlopeWin(newColumn, newRow, newScore, newColor)
    } else if (this.grid[column][row] == color) {
      var newScore = inARow + 1;
      var newRow = row + 1;
      var newColumn = column - 1;
      return this.downwardSlopeWin(newColumn, newRow, newScore, color)
    } else {
      if (this.isEmptyCell(column, row)) {
        var newScore = 0
      } else {
        var newScore = 1
      }
      var newColor = this.flipColor(color)
      var newRow = row + 1;
      var newColumn = column - 1;
      return this.downwardSlopeWin(newColumn, newRow, newScore, newColor) 
    }
  }

}