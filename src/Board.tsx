import { FunctionComponent } from "react";
import { BoardType } from "./helper";

interface IProps {
	board: BoardType;
	makeUserMove: (cell: number) => void;
}

const Board: FunctionComponent<IProps> = ({ board, makeUserMove }) => {
	const table = [];

	for (let i = 0; i < 9; i += 3) {
		let row = [];
		for (let j = 0; j < 3; j++) {
			row.push(
				<td
					key={`cell-${i + j}`}
					className={`
          ${i === 3 ? "vertical" : ""} 
          ${j === 1 ? "horizontal" : ""}
          `}
					onClick={() => makeUserMove(i + j)}
				>
					{board[i + j]}
				</td>
			);
		}
		table.push(<tr key={`cell-${i}`}>{row}</tr>);
	}

	return (
		<div className="flex-center flex-fill">
			<table>
				<tbody>{table}</tbody>
			</table>
		</div>
	);
};

export default Board;
