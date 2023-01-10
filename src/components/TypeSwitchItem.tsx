import React from 'react';
import styled from 'styled-components';

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
	color: ${({ active }) => (active ? '#028abf' : 'gray')};
	/* padding: 2px; */
	border: 1px ${({ active }) => (active ? 'solid white' : 'solid gray')};
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

	&:hover {
		transition: outline-color 264ms, border-color 264ms, color 300ms;
		color: #028abf;
	}
`;

const TypeSwitchItem: React.FC<Props> = ({ active, children, onSelect }) => {
	return (
		<Wrap active={active} onClick={() => onSelect?.(!active)}>
			{children}
		</Wrap>
	);
};

export default TypeSwitchItem;
