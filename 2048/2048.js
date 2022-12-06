var board;
var score = 0;
var rows = 4;
var columns = 4;
var ran = 3;

window.onload = function() {
    setGame();
}

function setGame() {
    // board = [
    //     [2, 2, 2, 2],
    //     [2, 2, 2, 2],
    //     [4, 4, 8, 8],
    //     [4, 4, 8, 8]
    // ];
    
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    //create 2 to begin the game
    
    // let ranNum = Math.floor(Math.random() * ran * 10);
    //             if(ranNum == 1){
    //                 setOne();
    //             } else if(ranNum == 2){
    //                 setOne();
    //                 setThree();
    //             } else if(ranNum == 3){
    //                 setThree();
    //             }
    function random() {
        return Math.floor(Math.random() * 10)}
      
        const a = random()   
        switch (a) {
        case 0:
            setOne();
          break
          case 1:
            setOne();
          break
          case 2:
            setOne();
          break
          case 3:
            setOne();
          break
        case 4:
            setOne();
            setThree();
          break
          case 5:
            setOne();
            setThree();
          break
          case 6:
            setOne();
            setThree();
          break
            case 7:
            setThree();
          break
          case 8:
            setThree();
          break
          case 9:
            setThree();
          break
        default:
    }
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; //clear the classList
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num.toString();
        if (num <= 4096) {
            tile.classList.add("x"+num.toString());
        } else {
            tile.classList.add("x8192");
        }                
    }
}


document.addEventListener('keyup', (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft();
        setOne();
    }
    else if (e.code == "ArrowRight") {
        slideRight();
        setOne();
    }
    else if (e.code == "ArrowUp") {
        slideUp();
        setOne();

    }
    else if (e.code == "ArrowDown") {
        slideDown();
        setOne();
    }
    document.getElementById("score").innerText = score;
})

function filterZero(row){
    return row.filter(num => num != 0); //create new array of all nums != 0
}

function slide(row) {
    //[0, 2, 2, 2] 
    row = filterZero(row); //[2, 2, 2]
    for (let i = 0; i < row.length-1; i++){
        if (row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        }
    } //[4, 0, 2]
    row = filterZero(row); //[4, 2]
    //add zeroes
    while (row.length < columns) {
        row.push(0);
    } //[4, 2, 0, 0]
    return row;
}

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];         //[0, 2, 2, 2]
        row.reverse();              //[2, 2, 2, 0]
        row = slide(row)            //[4, 2, 0, 0]
        board[r] = row.reverse();   //[0, 0, 2, 4];
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        //find random row and column to place a 2 in
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            let ranNum = Math.floor(Math.random() * ran * 10);
                if(ranNum == 1){
                    board[r][c] = 2;
                    let tile = document.getElementById(r.toString() + "-" + c.toString());
                    tile.innerText = "2";
                    tile.classList.add("x2");
                    found = true;

                } else if(ranNum == 2){
                    board[r][c] = 4;
                    let tile = document.getElementById(r.toString() + "-" + c.toString());
                    tile.innerText = "4";
                    tile.classList.add("x4");
                    found = true;
                }
            }
    }
}

function setOne() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        //find random row and column to place a 2 in
        let ro = Math.floor(Math.random() * rows);
        let co = Math.floor(Math.random() * columns);
        if (board[ro][co] == 0) {
                    board[ro][co] = 2;
                    let tile = document.getElementById(ro.toString() + "-" + co.toString());
                    tile.innerText = "2";
                    tile.classList.add("x2");
                    found = true;
            }
    }
}

function setThree() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        //find random row and column to place a 2 in
        let roo = Math.floor(Math.random() * rows);
        let coo = Math.floor(Math.random() * columns);
        if (board[roo][coo] == 0) {
                    board[roo][coo] = 4;
                    let tile = document.getElementById(roo.toString() + "-" + coo.toString());
                    tile.innerText = "4";
                    tile.classList.add("x4");
                    found = true;
            }
    }
}

function hasEmptyTile() {
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) { //at least one zero in the board
                return true;
            }
        }
    }
    return false;
}