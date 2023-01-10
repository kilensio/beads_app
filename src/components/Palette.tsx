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
	// const [colors, setColors] = useState(['#ffffff', '#444444']);
	const dispatch = useAppDispatch();
	// const [active, setActive] = useState<number | undefined>();

	const colors = useAppSelector(selectPalette);
	const colorId = useAppSelector(selectColorCurrentId);

	const onColorChange = (id: number) => (newColor?: string) => {
		if (!newColor) return;

		// setColors((prev) => prev.map((c, i) => (id === i ? newColor : c)));
		dispatch(editColor({ idx: id, newColor }));
	};

	const onColorAdd = (newColor?: string) => {
		if (!newColor) return;
		// setColors((prev) => [...prev, color]);
		dispatch(addColor(newColor));
		dispatch(setColorCurrent(colors.length));
	};

	return (
		<Wrap>
			{[...colors, ...(colors.length < 8 ? [undefined] : [])].map(
				(color, idx) => (
					<PaletteColor
						// defaultColor={color}
						defaultColor={color}
						key={idx}
						onChange={color ? onColorChange(idx) : onColorAdd}
						active={colorId === idx}
						onActive={() => dispatch(setColorCurrent(idx))}
					/>
				)
			)}
			{/* {colors.length < 6 && ( */}
			{/* <PaletteColor
				key={`add_${colors.length}`}
				// key={'add'}
				onChange={onColorAdd}
				// onChange={onColorChange(colors.length)}
			/> */}
			{/* )} */}
		</Wrap>
	);
};

export default Palette;
