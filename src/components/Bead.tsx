import React, { useEffect, useState } from 'react';
import { Rect } from 'react-konva';

interface Props {
	x: number;
	y: number;
	width: number;
	height: number;
	borderRadius: number;
	defaultColor?: number;
	color?: number;
	baseColor: string;
	clearMode: boolean;
	palette: string[];
	onClearMode: (isColor: boolean) => void;
	onChangeColor: (color: number | undefined) => void;
}

const Bead: React.FC<Props> = ({
	x,
	y,
	width,
	height,
	borderRadius,
	defaultColor,
	color,
	baseColor,
	clearMode,
	palette,
	onClearMode,
	onChangeColor,
}) => {
	const [currentColor, setCurrentColor] = useState<number | undefined>(
		undefined
	);

	useEffect(() => {
		onChangeColor(currentColor);
	}, [onChangeColor, currentColor]);

	return (
		<Rect
			x={x}
			y={y}
			width={width}
			height={height}
			fill={
				(currentColor !== undefined && palette?.[currentColor]) ||
				baseColor
			}
			cornerRadius={borderRadius}
			stroke="#000"
			strokeWidth={Math.max(height / 100, 0.2)}
			onMouseDown={() => {
				onClearMode(
					currentColor !== undefined && currentColor === color
				);
				setCurrentColor((prev) =>
					prev !== undefined && prev === color ? undefined : color
				);
			}}
			onMouseEnter={(e) => {
				if (e.evt.buttons === 1)
					setCurrentColor(clearMode ? undefined : color);
			}}
		/>
	);
};

export default Bead;
