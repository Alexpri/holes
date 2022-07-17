
# Proxx app 

How to use/play/test it
To make several clicks you can uncomment or create new clicks at the end of the file.
Example: `app.click({ x: 2, y: 1 });`

In the terminal you're going to find the entire board with your clicks.

Cell's values description for the board:
 * H - Hole
 * 0 - Empty
 * 1 - 100 ... K amount of nearest Holes
 * X - Hole opened

Structure of every cell  `{ cell_value: "0", is_visible: true }`

`cell_value` - value of a cell

`is_visible` - visibility status of a cell
