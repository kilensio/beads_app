import { GenerateFunc, SchemeType } from "../interface/scheme";

const generateRaw: GenerateFunc = (
	rows: number,
	columns: number,
	width: number,
	height: number,
) => {
	const gap = -height / 4.5;
	const cell = (width + height) / 2 + gap;

	const beadsList = [];

	for (let i = 0; i < rows * 2 + 1; i++) {
		const isOddRow = !(i % 2);

		for (let j = 0; j < columns * 2 + 1; j++) {
			const isOddCol = !(j % 2);
			if (isOddCol === isOddRow) continue;

			beadsList.push(
				isOddRow
					? {
							x: j * cell + (width - height) / 2,
							y: i * cell,
							width: height,
							height: width,
					  }
					: {
							x: j * cell,
							y: i * cell + (width - height) / 2,
							width: width,
							height: height,
					  }
			);
		}
	}

	return beadsList;
};

const generateSquare: GenerateFunc = (
	rows: number,
	columns: number,
	width: number,
	height: number,
) => {
	const gap = height / 32;
	const beadsList = [];

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < columns; j++) {
			beadsList.push({
				x: j * (width + gap),
				y: i * (height + gap),
				width,
				height,
			});
		}
	}

	return beadsList;
};

const generateBrick: GenerateFunc = (
	rows: number,
	columns: number,
	width: number,
	height: number,
) => {
	const gap = height / 16;
	const beadsList = [];

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < columns; j++) {
			const isOdd = !(j % 2);
			beadsList.push({
				x: j * (height + gap),
				y: (isOdd ? 0 : width / 2) + i * (width + gap),
				width: height,
				height: width,
			});
		}
	}

	return beadsList;
};

export const generateScheme: Record<SchemeType, GenerateFunc> = {
	[SchemeType.Brick]: generateBrick,
	[SchemeType.Square]: generateSquare,
	[SchemeType.Raw]: generateRaw,
};
