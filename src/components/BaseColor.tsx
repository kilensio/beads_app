import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../store';
import { selectColorBase, setColorBase } from '../store/schemeSlice';
import PaletteColor from './PaletteColor';

const Wrap = styled.div`
	margin: 0 auto;
`;

const BaseColor = () => {
	const dispatch = useAppDispatch();

	const baseColor = useAppSelector(selectColorBase);

	return (
		<Wrap>
			{/* <span>Base:</span> */}
			<PaletteColor
				// defaultColor={color}
				defaultColor={baseColor}
				onChange={(color) => dispatch(setColorBase(color))}
				size={48}
				// active={colorId === idx}
				// onActive={() => dispatch(setColorCurrent(idx))}
			/>
		</Wrap>
	);
};

export default BaseColor;
