class Board {
	// 7 columns, 6 rows
	// "red" "yel"
	// grid[0-7][0-6]

	constructor() {
		this.grid = [[],[],[],[],[],[],[]];
		this.playerOne = true;
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

	checkForWin() {
		// up and down
		// side to side
		// downward slope
		// upward slope
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