import React, { useEffect, useState } from "react";
import "./App.css";
import Board from "./Board";
import githubLogo from "./GitHub-Mark-Light-120px-plus.png";
import {
	BoardType,
	EMPTY,
	EMPTYBOARD,
	optimalAIMove,
	O,
	Player,
	utility,
	X,
} from "./helper";

const messages = {
	xwon: "X won !",
	owon: "O won !",
	move: "Make a Move ...",
	aiturn: "Computer thinking ...",
	draw: "Draw !",
};

function App() {
	const [board, setBoard] = useState<BoardType>([...EMPTYBOARD]);
	const [boardValue, setBoardValue] = useState<number | undefined>();
	const [player, setPlayer] = useState<Player>(X); // user is playing as ...
	const [msg, setMsg] = useState<string>(messages.move);

	const [aiMove, setAIMove] = useState(false);

	useEffect(() => {
		setBoardValue(utility(board));
	}, [board]);

	useEffect(() => {
		if (boardValue === 1) {
			setMsg(messages.xwon);
		} else if (boardValue === -1) {
			setMsg(messages.owon);
		} else if (boardValue === 0) {
			setMsg(messages.draw);
		} else {
			if (aiMove) {
				setMsg(messages.aiturn);
			} else {
				setMsg(messages.move);
			}
		}
	}, [aiMove, boardValue]);

	useEffect(() => {
		setBoard([...EMPTYBOARD]);
		setAIMove(player === O);
	}, [player]);

	useEffect(() => {
		if (aiMove) {
			if (boardValue === undefined) {
				let cell = optimalAIMove([...board]);
				board[cell] = player === X ? O : X;
				setBoard([...board]);
				setAIMove(false);
			}
		}
	}, [aiMove, board, player, boardValue]);

	const makeUserMove = (cell: number) => {
		if (board[cell] === EMPTY && boardValue === undefined) {
			board[cell] = player;
			setBoard([...board]);
			setAIMove(true);
		}
	};

	return (
		<div className="App text-white">
			<header className="flex-center p-3">
				<h1 className="f">Tic Tac Toe</h1>
			</header>

			<main>
				<div className="flex-between p-3">
					<span className="d-flex fs-5">
						Play As:
						<span className="form-check form-switch px-3 flex-center">
							X
							<input
								className="form-check-input mx-3 p-0 m-0"
								type="checkbox"
								checked={player === O}
								onChange={() => setPlayer(player === X ? O : X)}
							/>
							O
						</span>
					</span>
					<button
						className="btn btn-danger"
						onClick={() => {
							setBoard([...EMPTYBOARD]);
							setAIMove(player === O);
						}}
					>
						Reset
					</button>
				</div>
				<p className="flex-center m-3 fs-5">{msg}</p>

				<Board board={board} makeUserMove={makeUserMove} />
			</main>
			<footer>
				<div className="flex-center p-3 m-3">
					<a
						href="https://github.com/Chetan-Satpute/tictactoe"
						target="_blank"
						rel="noreferrer"
					>
						<img className="GitHub-Mark" src={githubLogo} alt="Github Link" />
					</a>
				</div>
			</footer>
		</div>
	);
}

export default App;
