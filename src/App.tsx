import React, { useState } from "react";
import "./App.css";
import githubLogo from "./GitHub-Mark-Light-32px.png";

// https://www.typescriptlang.org/play?#code/C4TwDgpgBAKgrmANhAPDANFAclCAPYCAOwBMBnKIuAWwCMIAnAPigF5tcDjyOB+SmvQadCpCjn4wA2gF0oALigB9eEggB5AGZpMWTLJaKiEAG6MA3AChQkZauRadHfKJ5U6jTACUR3CnCIAayIAewB3IgM2KC8pAHJkIgBzYAALOLkXPz4YhTsEB20MbH1igDoKrxkmK2twaHsIAE40FnZGpyaautsAIRCAQwYSJrwWgAU22ALmtBmJpm7LEggAY0Qh6FWQojJgKFpB4cV+oZGxlHchJcOzqQB2GQe5AHoXqHUAaUtLW+GpACMAKejygbygqQGFFCuGQ1GI+wG+wAlqR8FA4kC4r8jiRnoDgWD3pDoSFYRB4URESi0XgMVigA
type Tuple<T, N extends number> = N extends N
	? number extends N
		? T[]
		: _TupleOf<T, N, []>
	: never;
type _TupleOf<T, N extends number, R extends unknown[]> = R["length"] extends N
	? R
	: _TupleOf<T, N, [T, ...R]>;

function App() {
	// prettier-ignore
	const [board, setboard] = useState<Tuple<string, 9>>([
		"X",  "X",  "O",
		" ",  "O",  " ",
		" ",  "X",  " ",
	]);

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
							/>
							O
						</span>
					</span>
					<button className="btn btn-danger">Reset</button>
				</div>
				<p className="flex-center m-3 fs-5">Computer Thinking ...</p>
				<div className="flex-center flex-fill">
					<table>
						<tr>
							<td>{board[0]}</td>
							<td className="horizontal">{board[1]}</td>
							<td>{board[2]}</td>
						</tr>
						<tr>
							<td className="vertical">{board[3]}</td>
							<td className="vertical horizontal">{board[4]}</td>
							<td className="vertical">{board[5]}</td>
						</tr>
						<tr>
							<td>{board[6]}</td>
							<td className="horizontal">{board[7]}</td>
							<td>{board[8]}</td>
						</tr>
					</table>
				</div>
			</main>
			<footer>
				<div className="flex-center p-3 m-3">
					<a
						href="https://github.com/Chetan-Satpute/tictactoe"
						target="_blank"
						rel="noreferrer"
					>
						<img src={githubLogo} alt="Github Link" />
					</a>
				</div>
			</footer>
		</div>
	);
}

export default App;
