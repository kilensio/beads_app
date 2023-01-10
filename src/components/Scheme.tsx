import { KonvaEventObject } from 'konva/lib/Node';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import styled from 'styled-components';
import { SchemeType } from '../interface/scheme';
import { useAppSelector } from '../store';
import {
	selectColorBase,
	selectColorCurrent,
	selectColorCurrentId,
	selectColors,
	selectPalette,
	selectSchemeSize,
} from '../store/schemeSlice';
import { generateScheme } from '../utils/generators';
import Bead from './Bead';

interface Props {
	className?: string;
	type?: SchemeType;
	// customSize?: { row: number; col: number };
}

// Konva.pixelRatio = 5;
const size = { width: 20, height: 16 };
const start = { x: 16 / 2, y: 16 / 2 };

const SIDEBAR_WIDTH = 116;

const Scheme: React.FC<Props> = ({ type, className }) => {
	const {
		current: activeColor,
		base: baseColor,
		palette,
	} = useAppSelector(selectColors);
	const { rows, columns } = useAppSelector(selectSchemeSize);

	const [clearMode, setClearMode] = useState(false);
	const beadsColorsRef = useRef<Array<number | undefined>>([]);

	const beads = useMemo(() => {
		const { width, height } = size;
		if (!rows || !columns || !type) return [];

		return generateScheme[type]?.(rows, columns, width, height);
	}, [rows, columns, type]);

	useEffect(() => {
		if (!beads?.length) return;
		beadsColorsRef.current = new Array(beads.length);
	}, [beads]);

	const beadsSize = useMemo(
		() => ({
			height: beads.reduce(
				(res, { y, height }) => (y + height > res ? y + height : res),
				0
			),
			width: beads.reduce(
				(res, { x, width }) => (x + width > res ? x + width : res),
				0
			),
		}),
		[beads]
	);

	const widthDiff =
		window.innerWidth - (beadsSize.width + SIDEBAR_WIDTH + start.x * 2);

	const changeCursor =
		(cursor: string) => (e: KonvaEventObject<MouseEvent>) => {
			const container = e.target?.getStage()?.container();
			if (container) container.style.cursor = cursor;
		};

	return (
		<Stage
			className={className}
			width={window.innerWidth}
			height={window.innerHeight}
			{...(widthDiff < 0 && {
				draggable: widthDiff < 0,
				dragBoundFunc: (pos) => ({
					x: pos.x > 0 ? 0 : Math.max(pos.x, widthDiff),
					y: 0,
				}),
				onDragStart: changeCursor('grabbing'),
				onDragEnd: changeCursor('grab'),
				onMouseEnter: changeCursor('grab'),
				onMouseLeave: changeCursor('default'),
			})}
		>
			<Layer
				x={start.x + (widthDiff < 0 ? 0 : widthDiff / 2)}
				y={(window.innerHeight - beadsSize.height) / 2}
				onMouseDown={(e) => {
					e.cancelBubble = true;
				}}
				{...(widthDiff < 0 && {
					onMouseEnter: changeCursor('default'),
					onMouseLeave: changeCursor('grab'),
				})}
			>
				<>
					<Rect
						x={-start.x}
						y={-start.y}
						width={beadsSize.width + start.x * 2}
						height={beadsSize.height + start.y * 2}
					/>
					{beads.map(({ x, y, width, height }, idx) => (
						<Bead
							x={x}
							y={y}
							key={`${x}${y}`}
							width={width}
							height={height}
							borderRadius={
								type === SchemeType.Brick
									? height / 4
									: height / 2
							}
							palette={palette}
							// defaultColor
							color={activeColor}
							baseColor={baseColor}
							clearMode={clearMode}
							onClearMode={setClearMode}
							onChangeColor={(color) => {
								if (!beadsColorsRef.current?.length) return;
								beadsColorsRef.current[idx] = color;
							}}
						/>
					))}
				</>
			</Layer>
		</Stage>
	);
};

export default Scheme;
