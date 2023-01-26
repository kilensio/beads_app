import { useAppDispatch, useAppSelector } from '../store';
import { selectSchemeSize, setSchemeSize } from '../store/schemeSlice';
import SizeInput from './SizeInput';

const Size = () => {
	const dispatch = useAppDispatch();

	const { rows, columns } = useAppSelector(selectSchemeSize);

	return (
		<>
			<SizeInput
				margin="4px 0 0"
				title="Строки"
				value={rows}
				onChange={(count) => {
					dispatch(setSchemeSize({ rows: count, columns }));
				}}
			/>
			<SizeInput
				margin="8px 0"
				title="Столбцы"
				value={columns}
				onChange={(count) => {
					dispatch(setSchemeSize({ rows, columns: count }));
				}}
			/>
		</>
	);
};

export default Size;
