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

  checksForColumnWin() {
      var victory = false;
      for (let i = 0; i < this.grid.length; i++) {
        var winner = this.columnWin(i, 0, 1, "yel");
        if (winner) { victory = winner }
      }
      return victory
    }

  checksForRowWin() {
    var victory = false;
    for (let i = 0; i < 5; i++) {
      var winner = this.rowWin(i, 0, 1, "yel");
      if (winner) { victory = winner }
    }
  return victory;
  }

  checksForUpwardSlopeWin() {
    var victory = false
    for (let i=0; i<6; i++) {
      var winner = this.upwardSlopeWin(i, 0, 1, "yel");
      if (winner) { victory = winner }
    }

    for (let i=0; i<5; i++) {
      var winner = this.upwardSlopeWin(0, i, 1, "yel");
      if (winner) { victory = winner }
    }
    return victory
  }

  // checksForDownwardSlopeWin()

  // columnWin(0, 0, 1, "yel")

  columnWin(column, index, inARow, color) {
    if (inARow == 4) { return color }
    var newIndex = index + 1;
    var notEnoughSpace = notEnoughSpacesToWin()
    if (notEnoughSpace) { console.log("(spaces)"); return false };
    
    if (newIndex > 6 ) { console.log("it broke"); return false }

    function notEnoughSpacesToWin() {
      // number of spaces left for checking is greater or equal to
      // the number left needed to make a winning 4
      if (5 - index >= 4 - inARow) {
        return false
      } else {
        // there isnt enough space to continue our check
        return true
      }
    }

    if (index == 0) {
      var newColor = this.grid[column][index]
      var newScore = inARow + 1
      return this.columnWin(column, newIndex, newScore, newColor)
    } else if (column[index + 1] == color) {
      var newScore = inARow + 1
      return this.columnWin(column, newIndex, newScore, color)
    } else {
      var newColor = this.flipColor(color)
      return this.columnWin(column, newIndex, 1, newColor)
    }
  }

  // rowWin(0, 0, 1, "red")

  rowWin(row, index, inARow, color) {
    if (inARow == 4) { return color }
    var newIndex = index + 1;
    var notEnoughSpace = notEnoughSpacesToWin();
    if (notEnoughSpace) { console.log("(spaces)"); return false };
    if (newIndex > 7 ) { console.log("it broke"); return false };

    function notEnoughSpacesToWin() {
      // number of spaces left for checking is greater or equal to
      // the number left needed to make a winning 4
      if (6 - index >= 4 - inARow) {
        return false
      } else {
        // there isnt enough space to continue our check
        return true
      }
    }

    if (index == 0) {
      var newColor = this.grid[index][row];
      var newScore = inARow + 1;
      return this.rowWin(row, newIndex, newScore, newColor)
    } else if (this.grid[index + 1][row] == color) {
      var newColor = color
      var newScore = inARow + 1;
      return this.rowWin(row, newIndex, newScore, newColor)
    } else {
      var newColor = this.flipColor(color)
      return this.rowWin(row, newIndex, 1, newColor)
    }

  }

  // upwardSlopeWin(row, index, 1, "red")

  upwardSlopeWin(column, row, inARow, color) {
    if (inARow == 4) { return color }
    var notEnoughSpace = notEnoughSpacesToWin();
    if (notEnoughSpace) { console.log("(spaces)"); return false };

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

}
console.log("helloo")
b = new Board()

b.addPiece(b.grid, 0, "yel")
b.addPiece(b.grid, 0, "yel")
b.addPiece(b.grid, 0, "yel")
b.addPiece(b.grid, 0, "red")
b.addPiece(b.grid, 0, "red")
b.addPiece(b.grid, 0, "red")

b.addPiece(b.grid, 1, "red")
b.addPiece(b.grid, 1, "yel")
b.addPiece(b.grid, 1, "red")
b.addPiece(b.grid, 1, "yel")
b.addPiece(b.grid, 1, "yel")
b.addPiece(b.grid, 1, "yel")

b.addPiece(b.grid, 2, "yel")
b.addPiece(b.grid, 2, "yel")
b.addPiece(b.grid, 2, "yel")
b.addPiece(b.grid, 2, "red")
b.addPiece(b.grid, 2, "red")
b.addPiece(b.grid, 2, "red")

b.addPiece(b.grid, 3, "red")
b.addPiece(b.grid, 3, "red")
b.addPiece(b.grid, 3, "yel")
b.addPiece(b.grid, 3, "red")
b.addPiece(b.grid, 3, "yel")
b.addPiece(b.grid, 3, "yel")

b.addPiece(b.grid, 4, "yel")
b.addPiece(b.grid, 4, "yel")
b.addPiece(b.grid, 4, "yel")
b.addPiece(b.grid, 4, "red")
b.addPiece(b.grid, 4, "red")
b.addPiece(b.grid, 4, "red")

b.addPiece(b.grid, 5, "red")
b.addPiece(b.grid, 5, "red")
b.addPiece(b.grid, 5, "red")
b.addPiece(b.grid, 5, "yel")
b.addPiece(b.grid, 5, "yel")
b.addPiece(b.grid, 5, "yel")

b.addPiece(b.grid, 6, "yel")
b.addPiece(b.grid, 6, "yel")
b.addPiece(b.grid, 6, "yel")
b.addPiece(b.grid, 6, "red")
b.addPiece(b.grid, 6, "red")
b.addPiece(b.grid, 6, "red")