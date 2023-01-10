import React, { useEffect, useId, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useDebouncedCallback } from 'use-debounce';

interface Props {
	// color?: string;
	active?: boolean;
	defaultColor?: string;
	onActive?: () => void;
	onChange?: (color?: string) => void;
	// onClick?: () => void;
	// addMode?: boolean;
	size?: number;
	className?: string;
}

const Label = styled.label<{ color?: string; active?: boolean, size?: number }>`
	display: block;
	position: relative;
	height: ${({ size }) => size ? `${size}px` : '32px'};
	width: ${({ size }) => size ? `${size}px` : '32px'};
	/* height: 32px;
	width: 32px; */
	/* background-color: black; */
	background-color: ${({ color }) => color || 'unset'};
	border: 1px
		${({ color, active }) =>
			active ? 'solid white' : color ? 'solid gray' : 'dashed gray'};
	/* outline: 1px; */
	outline: ${({ active }) => (active ? '2px lightblue solid' : '0px white')};
	box-shadow: ${({ active }) =>
		active ? '0px 0px 3px -1px rgba(0, 0, 0, 0.5) inset' : 'unset'};
	transition: outline-color 264ms, border-color 264ms;
	/* border: 1px solid #000; */
	cursor: pointer;
	border-radius: 2px;
	flex-grow: 0;
	flex-shrink: 0;

	${({ color }) =>
		!color &&
		css`
			&:before,
			&:after {
				content: '';
				position: absolute;
				inset: 50%;
				width: 12px;
				height: 1px;
				background-color: black;
				/* border-bottom: 1px solid black; */
			}

			&:before {
				transform: translate(-50%, -50%);
			}

			&:after {
				transform: translate(-50%, -50%) rotate(90deg);
			}
		`}
`;

const Input = styled.input`
	/* visibility: hidden; */
	position: absolute;
	width: 0;
	height: 0;
	opacity: 0;
`;

const PaletteColor: React.FC<Props> = ({
	active,
	defaultColor,
	className,
	size,
	onActive,
	onChange,
}) => {
	// const colorRef = useRef<HTMLInputElement>(null);
	// const id = useId();
	
	const [color, setColor] = useState<string | undefined>(defaultColor);

	const onDebounceChangeColor = useDebouncedCallback((newColor) => {
		setColor(newColor);
		onChange?.(newColor);
	}, 192);

	const onClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
		if (onActive && !active && color) {
			e.preventDefault();
			onActive?.();
		}
	};

	return (
		<Label
			className={className}
			active={active}
			color={color}
			size={size}
			// style={{
			// 	backgroundColor: defaultColor
			// 		? colorRef.current?.value || defaultColor
			// 		: 'unset',
			// }}
			// onClick={!active ? onActive : undefined}
		>
			{/* {(active || !color) && ( */}
			<Input
				// ref={colorRef}
				// id={`color_${id}`}
				type="color"
				defaultValue={color ?? '#ffffff'}
				// value={'#ffffff'}
				// value={color}
				// onChange={(e) => setColor(e.target?.value)}
				onChange={(e) => onDebounceChangeColor(e.target?.value)}
				// onBlur={() => {
				// 	onChange?.(color);
				// }}
				// onClick={!active ? onActive : undefined}
				onClick={onClick}
				// onBlur={() => {
				// 	console.log('onBlur');
				// 	// onChange?.(colorRef.current?.value);
				// 	onChange?.(color);
				// }}
				// onFocus={(e) => {
				// 	console.log(e);
				// 	console.log(colorRef.current?.value);
				// }}
			/>
			{/* )} */}
		</Label>
	);
};

export default PaletteColor;
