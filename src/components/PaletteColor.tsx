import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useDebouncedCallback } from 'use-debounce';

interface Props {
	active?: boolean;
	defaultColor?: string;
	onActive?: () => void;
	onChange?: (color?: string) => void;
	size?: number;
	className?: string;
}

const Label = styled.label<{ color?: string; active?: boolean; size?: number }>`
	display: block;
	position: relative;
	height: ${({ size }) => (size ? `${size}px` : '32px')};
	width: ${({ size }) => (size ? `${size}px` : '32px')};
	background-color: ${({ color }) => color || 'unset'};
	border: 1px
		${({ color, active }) =>
			active ? 'solid white' : color ? 'solid gray' : 'dashed gray'};
	transition: outline-color 264ms, border-color 264ms;
	cursor: pointer;
	border-radius: 2px;
	flex-grow: 0;
	flex-shrink: 0;
	outline: 0px white;
	box-shadow: unset;

	${({ active }) =>
		active &&
		css`
			outline: 2px lightblue solid;
			box-shadow: 0px 0px 3px -1px rgba(0, 0, 0, 0.5) inset;
		`}

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
		<Label className={className} active={active} color={color} size={size}>
			<Input
				type="color"
				defaultValue={color ?? '#ffffff'}
				onChange={(e) => onDebounceChangeColor(e.target?.value)}
				onClick={onClick}
			/>
		</Label>
	);
};

export default PaletteColor;
