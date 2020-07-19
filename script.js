const gameboard = document.querySelector("#gameboard")
const Player = function (name, character) {
    this.name = name
    this.character = character
}
const game = (() => {

    const createBoard = () => {
        for (let i = 0; i < 9; i++) {
            const square = document.createElement("p")
            gameboard.appendChild(square)
            square.classList.add("square")
        }
    }
    const changeValue = function (character) {
        let otherCharacter
        if (character === "x")
            otherCharacter = "o"
        else
            otherCharacter = "x"
        const squares = document.querySelectorAll(".square")
        for (let i = 0; i < squares.length; i++) {
            eventId = squares[i].addEventListener("click", () => {
                if (!this.isGameOver() && !squares[i].innerHTML) {
                    squares[i].innerHTML = character
                    if (!this.isGameOver()) {
                        this.randomPlay(otherCharacter)
                        this.isGameOver()
                    }
                }
            })
        }
    }
    const takevalues = function () {
        const squares = document.querySelectorAll(".square")
        const values = []
        for (let i = 0; i < squares.length; i++)
            values[i] = squares[i].innerHTML
        return values
    }
    const resetBoard = function () {
        const squares = document.querySelectorAll(".square")
        const congMessage = document.querySelector("#winner")
        for (square of squares) {
            square.innerHTML = ""
            square.style.backgroundColor = ""
        }

        congMessage.style.display = "none"
        this.changeValue("x")
    }
    const findEmptySquares = function () {
        const values = this.takevalues()
        const index = []
        for (let i = 0; i < values.length; i++) {
            if (!values[i])
                index.push(i)
        }
        return index

    }
    const randomPlay = function (character) {
        const squares = document.querySelectorAll(".square")
        const emptySquares = this.findEmptySquares()
        const randomIndex = Math.floor(Math.random() * emptySquares.length)
        squares[emptySquares[randomIndex]].innerHTML = character
    }
    const isGameOver = function () {
        values = this.takevalues()
        for (let i = 0; i < values.length; i += 3) {//for row
            if (values[i] && values[i] === values[i + 1] && values[i] === values[i + 2]) {
                this.congrulate(values[i], User, Ai)
                this.changeBackground([i, i + 1, i + 2])

                return values[i]
            }
        }
        for (let i = 0; i < 3; i++) { //for column
            if (values[i] && values[i] === values[i + 3] && values[i] === values[i + 6]) {
                this.congrulate(values[i], User, Ai)
                this.changeBackground([i, i + 3, i + 6])

                return values[i]

            }
        }
        if (values[0] && values[0] === values[4] && values[0] === values[8])//for diagonal 1
        {
            this.congrulate(values[0], User, Ai)
            this.changeBackground([0, 4, 8])

            return values[0]
        }

        if (values[2] && values[2] === values[4] && values[2] === values[6])//for diagonal 2
        {
            this.congrulate(values[2], User, Ai)
            this.changeBackground([2, 4, 6])
            return values[2]

        }
        if (this.findEmptySquares().length === 0) {
            congrulate("tie", User, Ai)
        }
        return false
    }
    const changeBackground = (index) => {
        const squares = document.querySelectorAll(".square")
        for (i of index)
            squares[i].style.backgroundColor = "#fff48f"
    }
    const congrulate = function (character, player1, player2) {
        const congMessage = document.querySelector("#winner")
        if (character === "tie")
            congMessage.innerHTML = "Tie"
        else if (character === player1.character)
            congMessage.innerHTML = `${player1.name} is the winner`
        else
            congMessage.innerHTML = `${player2.name} is the winner`
        congMessage.style.display = "block"
    }
    return { changeBackground, resetBoard, congrulate, isGameOver, findEmptySquares, randomPlay, createBoard, changeValue, takevalues }
})()
game.createBoard()
const userName = document.querySelector("#userName")
const aiName = document.querySelector("#aiName")
const startButton = document.querySelector("#start")
const replayButton = document.querySelector("#replay")
const User = new Player(userName.value, "x")
const Ai = new Player(aiName.value, "o")
replayButton.addEventListener("click", () => {
    game.resetBoard()
    User.name = userName.value
    Ai.name = aiName.value
})
startButton.addEventListener("click", () => {
    game.changeValue("x")
})
