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
		if (y < 6) {
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

	checkForWin() {
		// up and down
		// side to side
		// downward slope
		// upward slope
	}

	// columnWin(this.grid[0], 0, 1, "yel")

	columnWin(column, index, inARow, color) {
		if (inARow == 4) { console.log(`${color} wins`); return true }
		var newIndex = index + 1;
	  var notEnoughSpace = notEnoughSpacesToWin()
		if (notEnoughSpace) { console.log("spaces"); return false };
		
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
		
		if (column[index + 1] == color) {
			var newScore = inARow + 1
			return this.columnWin(column, newIndex, newScore, color)
		} else {
			var newColor = this.flipColor(color)
			return this.columnWin(column, newIndex, inARow, newColor)
		}
	}

}
console.log("hello")
b = new Board()
b.addPiece(b.grid, 0, "yel")
b.addPiece(b.grid, 0, "red")
b.addPiece(b.grid, 0, "yel")
b.addPiece(b.grid, 0, "yel")
b.addPiece(b.grid, 0, "red")
b.addPiece(b.grid, 0, "yel")
b.addPiece(b.grid, 1, "yel")
b.addPiece(b.grid, 1, "yel")
b.addPiece(b.grid, 1, "red")
b.addPiece(b.grid, 1, "red")
b.addPiece(b.grid, 1, "red")
b.addPiece(b.grid, 1, "red")
