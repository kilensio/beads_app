import { KonvaEventObject } from 'konva/lib/Node';
import { Stage as StageType } from 'konva/lib/Stage';
import React, {
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import { SchemeType } from '../interface/scheme';
import { useAppSelector } from '../store';
import {
	selectColors,
	selectSchemeSize,
	selectType,
} from '../store/schemeSlice';
import { generateScheme } from '../utils/generators';
import uploadFile from '../utils/uploadFile';
import Bead from './Bead';

export interface ImperativeSchemeRef {
	savePicture: () => void;
}

interface Props {
	className?: string;
	type?: SchemeType;
	schemeRef?: React.MutableRefObject<Array<number | undefined>>;
}

const size = { width: 20, height: 16 };
const start = { x: 16 / 2, y: 16 / 2 };

const SIDEBAR_WIDTH = 116;

const Scheme = React.forwardRef<ImperativeSchemeRef, Props>(
	({ schemeRef, className }, ref) => {
		const {
			current: activeColor,
			base: baseColor,
			palette,
		} = useAppSelector(selectColors);
		const { rows, columns } = useAppSelector(selectSchemeSize);
		const type = useAppSelector(selectType);

		const [clearMode, setClearMode] = useState(false);

		const beads = useMemo(() => {
			const { width, height } = size;
			if (!rows || !columns || !type) return [];

			return generateScheme[type]?.(rows, columns, width, height);
		}, [rows, columns, type]);

		useEffect(() => {
			if (!schemeRef || !beads?.length) return;
			schemeRef.current = new Array(beads.length);
		}, [beads, schemeRef]);

		const beadsSize = useMemo(
			() => ({
				height: beads.reduce(
					(res, { y, height }) =>
						y + height > res ? y + height : res,
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

		const canvasRef = useRef<StageType>(null);

		const handleSavePicture = useCallback(() => {
			const stage = canvasRef?.current;
			if (!stage) return;

			const dataUrl = stage.toDataURL({
				pixelRatio: 3,
				x: start.x + (widthDiff < 0 ? 0 : widthDiff / 2) - start.x,
				y: (window.innerHeight - beadsSize.height) / 2 - start.y,
				width: beadsSize.width + start.x * 2,
				height: beadsSize.height + start.y * 2,
				mimeType: 'image/jpeg',
			});

			uploadFile(dataUrl);
		}, [beadsSize.height, beadsSize.width, widthDiff]);

		useImperativeHandle(ref, () => ({
			savePicture() {
				handleSavePicture();
			},
		}));

		const changeCursor =
			(cursor: string) => (e: KonvaEventObject<MouseEvent>) => {
				const container = e.target?.getStage()?.container();
				if (container) container.style.cursor = cursor;
			};

		const handleChangeBeadColor = useCallback(
			(idx: number) => (color?: number) => {
				if (!schemeRef?.current?.length) return;
				schemeRef.current[idx] = color;
			},
			[schemeRef]
		);

		return (
			<Stage
				key={type}
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
				ref={canvasRef}
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
							fill="#dbcfd5"
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
								color={activeColor}
								baseColor={baseColor}
								clearMode={clearMode}
								onClearMode={setClearMode}
								onChangeColor={handleChangeBeadColor(idx)}
							/>
						))}
					</>
				</Layer>
			</Stage>
		);
	}
);

export default Scheme;
