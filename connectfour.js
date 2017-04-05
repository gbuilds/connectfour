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

	flipColor() {
		if (this.color == "red") {
			this.color = "yel"
			return "yel"
		} else {
			this.color = "red"
			return "red"
		}
	}

	checkForWin() {
		// up and down
		// side to side
		// downward slope
		// upward slope
	}

	// columnWin(0, 0, 1, "red")

	columnWin(column, position, inARow, color) {
		return true if { inARow == 4 }

		if (column[position + 1] == color) {
			var newScore = inARow + 1
			var newPosition = position + 1
			columnWin(column, newPosition, newScore, color)
		} else {
			var newColor = this.flipColor()
			var columnWin(column, newPosition, inARow, newColor)
		}

	}

}
console.log("hello")
b = new Board()
b.addPiece(b.grid, 0, "yel")
b.addPiece(b.grid, 0, "red")
b.addPiece(b.grid, 0, "yel")
b.addPiece(b.grid, 1, "yel")
b.addPiece(b.grid, 1, "yel")
b.addPiece(b.grid, 1, "yel")