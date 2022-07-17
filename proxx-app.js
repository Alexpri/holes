// Part 1
// --------

/**
 * -------- Part 1
 * I chosed Data structure as arrays in arrays as it's simplier to iterate and find a specific cell on the board.
 * // Data structure
 * 1. NxN board
 * Cell's values description:
 * H - Hole
 * 0 - Empty
 * 1 - 100 ... K amount of nearest Holes
 * X - Hole opened
 *
 * First parameter in the array is position by Y-axis
 * Second parameter in the array is position by X-axis
 */

const board_structure = [
  [
    { cell_value: "0", is_visible: true },
    { cell_value: "0", is_visible: true },
    { cell_value: "0", is_visible: true },
    { cell_value: "0", is_visible: true },
    { cell_value: "1", is_visible: true },
    { cell_value: "2", is_visible: false },
    { cell_value: "2", is_visible: false },
    { cell_value: "2", is_visible: false },
    { cell_value: "1", is_visible: false },
    { cell_value: "1", is_visible: false },
    { cell_value: "0", is_visible: false },
    { cell_value: "0", is_visible: false },
  ],
  [
    { cell_value: "0", is_visible: true },
    { cell_value: "0", is_visible: true },
    { cell_value: "0", is_visible: true },
    { cell_value: "0", is_visible: true },
    { cell_value: "1", is_visible: true },
    { cell_value: "H", is_visible: false },
    { cell_value: "H", is_visible: false },
    { cell_value: "2", is_visible: false },
    { cell_value: "H", is_visible: false },
    { cell_value: "1", is_visible: false },
    { cell_value: "0", is_visible: false },
    { cell_value: "0", is_visible: false },
  ],
];

class Board {
  static is_game_over = false;
  /**
   * -------- Part 3
   * creating a board hole after we generated holes positions.
   * @param {{x: number, y: number}} board_size
   * @param {number} holes_numb
   */
  create_board(board_size, holes_numb) {
    const { x, y } = board_size;
    const summary_board = [];
    const holes_array = this._generate_holes_positions(board_size, holes_numb);
    for (let y_axis = 0; y_axis < y; y_axis++) {
      const y_lines = [];
      for (let x_axis = 0; x_axis < x; x_axis++) {
        let cell_value = "0";
        let whole_counter = 0;
        for (const hole of holes_array) {
          if (x_axis === hole.x && y_axis === hole.y) {
            cell_value = "H";
            whole_counter = 0;
            break;
          } else if (
            // Checking surrounded cells and counting the holes
            (hole.x + 1 === x_axis && hole.y - 1 === y_axis) ||
            (hole.x + 1 === x_axis && hole.y === y_axis) ||
            (hole.x + 1 === x_axis && hole.y + 1 === y_axis) ||
            (hole.x - 1 === x_axis && hole.y - 1 === y_axis) ||
            (hole.x - 1 === x_axis && hole.y === y_axis) ||
            (hole.x - 1 === x_axis && hole.y + 1 === y_axis) ||
            (hole.x === x_axis && hole.y + 1 === y_axis) ||
            (hole.x === x_axis && hole.y - 1 === y_axis)
          ) {
            whole_counter++;
          }
        }
        if (whole_counter > 0) {
          cell_value = whole_counter.toString();
        }
        y_lines.push({ cell_value, is_visible: false });
      }
      summary_board.push(y_lines);
    }
    this.board = summary_board;
  }
  /**
   * -------- Part 2
   * Generating holes positions while it's going to ba unique
   * @param {{x: number, y: number}} board_size
   * @param {number} holes_numb
   * @return {Object[]}
   */
  _generate_holes_positions(board_size, holes_numb) {
    const { x, y } = board_size;
    const holes_array = [];
    while (holes_array.length < holes_numb) {
      const hole_unique = {
        x: Math.floor(Math.random() * x),
        y: Math.floor(Math.random() * y),
      };
      let is_unique = true;
      for (const hole of holes_array) {
        if (hole_unique.x === hole.x && hole_unique.y === hole.y) {
          is_unique = false;
          break;
        }
      }
      if (is_unique) {
        holes_array.push(hole_unique);
      } else {
        continue;
      }
    }
    return holes_array;
  }
  /**
   * -------- Part 4
   * Walking through all the surrounded Emply and with Numbers cells while we can untill we face with a number or corners
   * Click goes with X and Y prositions on the board
   * @param {{x: number, y: number}}
   */
  click({ x, y }) {
    if (this.is_game_over) return this.board;
    if (this.board[y][x].cell_value === "H") {
      this.board[y][x].cell_value = "X";
      this.board[y][x].is_visible = true;
      this.is_game_over = true;
      console.log("---Game over");
    } else if (this.board[y][x].cell_value === "0") {
      this.board[y][x].is_visible = true;
      const start_y = y - 1 >= 0 ? y - 1 : y;
      const end_y = y + 2 < this.board.length ? y + 2 : this.board.length;
      for (let counter_y = start_y; counter_y < end_y; counter_y++) {
        const start_x = x - 1 >= 0 ? x - 1 : x;
        const end_x =
          x + 2 < this.board[y].length ? x + 2 : this.board[y].length;
        for (let counter_x = start_x; counter_x < end_x; counter_x++) {
          if (
            this.board[counter_y][counter_x].cell_value !== "H" &&
            !this.board[counter_y][counter_x].is_visible
          ) {
            this.click({ x: counter_x, y: counter_y });
          }
        }
      }
    } else {
      this.board[y][x].is_visible = true;
    }
  }
}

const app = new Board();
app.create_board({ x: 12, y: 12 }, 16);
app.click({ x: 2, y: 1 });
console.log(app.board);
// app.click({ x: 6, y: 9 });
// console.log(app.board);
