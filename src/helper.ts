// https://www.typescriptlang.org/play?#code/C4TwDgpgBAKgrmANhAPDANFAclCAPYCAOwBMBnKIuAWwCMIAnAPigF5tcDjyOB+SmvQadCpCjn4wA2gF0oALigB9eEggB5AGZpMWTLJaKiEAG6MA3AChQkZauRadHfKJ5U6jTACUR3CnCIAayIAewB3IgM2KC8pAHJkIgBzYAALOLkXPz4YhTsEB20MbH1igDoKrxkmK2twaHsIAE40FnZGpyaautsAIRCAQwYSJrwWgAU22ALmtBmJpm7LEggAY0Qh6FWQojJgKFpB4cV+oZGxlHchJcOzqQB2GQe5AHoXqHUAaUtLW+GpACMAKejygbygqQGFFCuGQ1GI+wG+wAlqR8FA4kC4r8jiRnoDgWD3pDoSFYRB4URESi0XgMVigA
type Tuple<T, N extends number> = N extends N
	? number extends N
		? T[]
		: _TupleOf<T, N, []>
	: never;
type _TupleOf<T, N extends number, R extends unknown[]> = R["length"] extends N
	? R
	: _TupleOf<T, N, [T, ...R]>;

export const X = "X";
export const O = "O";
export const EMPTY = " ";

export type BoardValue = typeof X | typeof O | typeof EMPTY;
export type BoardType = Tuple<BoardValue, 9>;
export type Player = typeof X | typeof O;

// prettier-ignore
export const EMPTYBOARD: BoardType = [
  EMPTY,  EMPTY,  EMPTY,
  EMPTY,  EMPTY,  EMPTY,
  EMPTY,  EMPTY,  EMPTY,
];

export function terminal(board: BoardType) {
	for (let i = 0; i < 9; i += 3)
		if (
			board[i + 0] === board[i + 1] &&
			board[i + 1] === board[i + 2] &&
			board[i] !== EMPTY
		)
			return board[i];

	for (let i = 0; i < 3; i++)
		if (
			board[0 + i] === board[3 + i] &&
			board[3 + i] === board[6 + i] &&
			board[i] !== EMPTY
		)
			return board[i];

	if (board[0] === board[4] && board[4] === board[8] && board[0] !== EMPTY)
		return board[0];
	if (board[2] === board[4] && board[4] === board[6] && board[2] !== EMPTY)
		return board[2];

	for (let i = 0; i < 9; i++) if (board[i] === EMPTY) return EMPTY;
}

function nextPlayer(board: BoardType): Player {
	let x = 0;
	let o = 0;

	for (let i = 0; i < 9; i++) {
		if (board[i] === X) x++;
		else if (board[i] === O) o++;
	}

	if (x === o) return X;
	else return O;
}

function availableActions(board: BoardType) {
	let availActions: number[] = [];

	board.forEach((cell, index) => {
		if (cell === EMPTY) availActions.push(index);
	});

	return availActions;
}

function result(board: BoardType, action: number): BoardType {
	board[action] = nextPlayer(board);
	return board;
}

export function utility(board: BoardType) {
	let terminalValue = terminal(board);

	if (terminalValue === X) return 1;
	else if (terminalValue === O) return -1;
	else if (terminalValue === undefined) return 0;
}

export function optimalAIMove(board: BoardType) {
	let player = nextPlayer(board);
	let move = { value: 0, action: 0 };

	if (player === X) {
		if (board.filter((val) => val !== EMPTY).length === 0)
			return Math.floor(Math.random() * 9);
		move = maxMove([...board]);
	} else {
		move = minMove([...board]);
	}

	return move.action;
}

function minMove(board: BoardType) {
	let availActions = availableActions(board);
	let move = {
		value: 2,
		action: availActions[0],
	};
	let moves: { value: number; action: number }[] = [];

	for (let i = 0; i < availActions.length; i++) {
		let act = availActions[i];
		let resultBoard = result([...board], act);
		let boardValue = utility(resultBoard);

		if (boardValue !== undefined) {
			moves.push({ value: boardValue, action: act });
			if (boardValue < move.value) move = { value: boardValue, action: act };
		} else {
			// Game continues
			let mv = maxMove([...resultBoard]);
			moves.push({ value: mv.value, action: act });
			if (mv.value < move.value) {
				move = { value: mv.value, action: act };
			}
		}
	}

	return move;
}

function maxMove(board: BoardType) {
	let availActions = availableActions(board);
	let move = {
		value: -2,
		action: availActions[0],
	};

	let moves: { value: number; action: number }[] = [];

	for (let i = 0; i < availActions.length; i++) {
		let act = availActions[i];
		let resultBoard = result([...board], act);
		let boardValue = utility(resultBoard);

		if (boardValue !== undefined) {
			moves.push({ value: boardValue, action: act });
			if (boardValue > move.value) move = { value: boardValue, action: act };
		} else {
			// Game continues
			let mv = minMove([...resultBoard]);
			moves.push({ value: mv.value, action: act });
			if (mv.value > move.value) {
				move = { value: mv.value, action: act };
			}
		}
	}

	return move;
}
