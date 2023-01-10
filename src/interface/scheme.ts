export type GenerateFunc = (
	rows: number,
	columns: number,
	width: number,
	height: number
) => { x: number; y: number; width: number; height: number; color?: number }[];

export enum SchemeType {
	Brick = 'brick',
	// Peyote = 'peyote',
	Square = 'square',
	Raw = 'raw',
}
