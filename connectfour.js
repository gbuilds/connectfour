class Board {
  // 7 columns, 6 rows
  // "red" "yel"
  // grid[0-7][0-6]

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

  // checksForAllWins()

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

  // columnWin(0, 0, 1, "yel")

  columnWin(column, row, inARow, color) {
    if (inARow == 4) { return color }
    var notEnoughSpace = notEnoughSpacesToWin()
    if (notEnoughSpace) { console.log("end check for column ", column); return false };
    
    if (row > 6 ) { console.log("it broke"); return false }

    function notEnoughSpacesToWin() {
      // number of spaces left for checking is greater or equal to
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

  // rowWin(0, 0, 1, "red")

  rowWin(row, column, inARow, color) {
    if (inARow == 4) { return color }
    var notEnoughSpace = notEnoughSpacesToWin();
    if (notEnoughSpace) { console.log("end check for row ", row); return false };
    if (column > 7 ) { console.log("it broke"); return false };

    function notEnoughSpacesToWin() {
      // number of spaces left for checking is greater or equal to
      // the number left needed to make a winning 4
      if (7 - column >= 4 - inARow) {
        return false
      } else {
        // there isnt enough space to continue our check
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
      var newColor = this.flipColor(color)
      var newColumn = column + 1;
      return this.rowWin(row, newColumn, 1, newColor)
    }

  }

  // upwardSlopeWin(column, row, 1, "red")

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
        // there isnt enough space to continue our check
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
      var newColor = this.flipColor(color)
      var newColumn = column + 1;
      var newRow = row + 1;
      return this.upwardSlopeWin(newColumn, newRow, 1, newColor)
    }

  }  

  // downwardSlopeWin()
  // this just checks "right to left" in a similar manner as upwardSlopeWin

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
        // there isnt enough space to continue our check
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
      var newColor = this.flipColor(color)
      var newRow = row + 1;
      var newColumn = column - 1;
      return this.downwardSlopeWin(newColumn, newRow, 1, newColor) 
    }


  }

}