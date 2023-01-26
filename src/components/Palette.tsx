import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../store';
import {
	addColor,
	editColor,
	selectColorCurrentId,
	selectPalette,
	setColorCurrent,
} from '../store/schemeSlice';
import PaletteColor from './PaletteColor';

const Wrap = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 4px;
`;

const Palette = () => {
	const dispatch = useAppDispatch();

	const colors = useAppSelector(selectPalette);
	const colorId = useAppSelector(selectColorCurrentId);

	const onColorChange = (id: number) => (newColor?: string) => {
		if (!newColor) return;

		dispatch(editColor({ idx: id, newColor }));
	};

	const onColorAdd = (newColor?: string) => {
		if (!newColor) return;
		dispatch(addColor(newColor));
		dispatch(setColorCurrent(colors.length));
	};

	return (
		<Wrap>
			{[...colors, ...(colors.length < 8 ? [undefined] : [])].map(
				(color, idx) => (
					<PaletteColor
						defaultColor={color}
						key={idx}
						onChange={color ? onColorChange(idx) : onColorAdd}
						active={colorId === idx}
						onActive={() => dispatch(setColorCurrent(idx))}
					/>
				)
			)}
		</Wrap>
	);
};

export default Palette;
