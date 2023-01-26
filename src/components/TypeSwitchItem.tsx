import React from 'react';
import styled, { css } from 'styled-components';

interface Props {
	active?: boolean;
	children?: React.ReactNode;
	onSelect?: (isActive: boolean) => void;
}

const Wrap = styled.div<{ active?: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	height: 48px;
	width: 48px;
	transition: outline-color 264ms, border-color 264ms;
	cursor: pointer;
	border-radius: 2px;
	flex-grow: 0;
	flex-shrink: 0;
	color: gray;
	border: 1px solid gray;
	outline: 0px white;
	box-shadow: unset;

	&:hover {
		transition: outline-color 264ms, border-color 264ms, color 300ms;
		color: #028abf;
	}

	${({ active }) =>
		active &&
		css`
			color: #028abf;
			border: 1px solid white;
			outline: 2px lightblue solid;
			box-shadow: 0px 0px 3px -1px rgba(0, 0, 0, 0.5) inset;
		`}
`;

const TypeSwitchItem: React.FC<Props> = ({ active, children, onSelect }) => {
	return (
		<Wrap active={active} onClick={() => onSelect?.(!active)}>
			{children}
		</Wrap>
	);
};

export default TypeSwitchItem;
