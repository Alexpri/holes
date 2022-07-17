
# Proxx app 

How to use/play/test it
In the `proxx-app.js` at the end you can find the following line

```bash
const app = new Board();
app.create_board({ x: 12, y: 12 }, 16);
app.click({ x: 2, y: 1 });
```

Where you can change the size of the board changing X and Y params while creating a board (`app.create_board({ x: 12, y: 12 }, 16);`) second parameter is the number of expecting holes to fill the board.


To make several clicks you can uncomment or create new clicks at the end of the file.
Example: `app.click({ x: 2, y: 1 });`

In the terminal you're going to find the entire board with your clicks after running the command.

Cell's values description for the board:
 * H - Hole
 * 0 - Empty
 * 1 - 100 ... K amount of nearest Holes
 * X - Hole opened

Structure of every cell  `{ cell_value: "0", is_visible: true }`

`cell_value` - value of a cell

`is_visible` - visibility status of a cell



## Run Locally

Clone the project

```bash
  git clone https://github.com/Alexpri/holes
```

Go to the project directory

```bash
  cd holes
```

Run the command

```bash
  node proxx-app.js
```

