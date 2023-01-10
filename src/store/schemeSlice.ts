import { RootState } from './index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SchemeType } from '../interface/scheme';

interface SchemeState {
	// palette: string[];
	type: SchemeType | null;
	// activeColor: number | null;
	color: {
		palette: string[];
		current: number;
		base: string;
	};
	// current: {
	// 	color: number | null;
	// 	clearMode: boolean;
	// };
	schemeSize: {
		rows: number;
		columns: number;
	};
	beadSize: {
		width: number;
		height: number;
	};
}

const initialState: SchemeState = {
	type: null,
	// activeColor: 0,
	color: {
		palette: ['#eeeeee'],
		current: 0,
		base: '#ffffff',
	},
	// current: {
	// 	color: null,
	// 	clearMode: false,
	// },
	schemeSize: {
		rows: 4,
		columns: 88,
	},
	beadSize: {
		width: 200,
		height: 160,
	},
};

export const schemeSlice = createSlice({
	name: 'scheme',
	initialState,
	reducers: {
		// setColorCurre: (state, { payload }: PayloadAction<number | undefined>) => {
		// 	state.color.current = payload || 0;
		// },
		// setClearMode: (state, { payload }: PayloadAction<boolean>) => {
		// 	state.clearMode = payload;
		// },
		setType: (state, { payload }: PayloadAction<SchemeType | null>) => {
			state.type = payload;
		},
		setSchemeSize: (
			state,
			{ payload }: PayloadAction<{ rows: number; columns: number }>
		) => {
			state.schemeSize = { ...payload };
		},
		setBeadSize: (
			state,
			{ payload }: PayloadAction<{ width: number; height: number }>
		) => {
			state.beadSize = { ...payload };
		},
		setColorCurrent: (
			state,
			{ payload }: PayloadAction<number | undefined>
		) => {
			if (
				typeof payload === 'number' &&
				payload < state.color.palette.length &&
				payload >= 0
			)
				state.color.current = payload;
		},
		setColorBase: (
			state,
			{ payload }: PayloadAction<string | undefined>
		) => {
			if (typeof payload === 'string') state.color.base = payload;
		},
		addColor: (state, { payload }: PayloadAction<string>) => {
			state.color.palette = [...state.color.palette, payload];
		},
		editColor: (
			state,
			{ payload }: PayloadAction<{ idx: number; newColor: string }>
		) => {
			const { idx, newColor } = payload;
			state.color.palette = state.color.palette.map((c, i) =>
				i === idx ? newColor : c
			);
		},
		removeColor: (state, { payload }: PayloadAction<string>) => {
			state.color.palette = {
				...state.color.palette.filter((color) => color !== payload),
			};
		},
	},
});

export const {
	// setColor,
	// setClearMode,
	setType,
	setSchemeSize,
	setBeadSize,
	setColorCurrent,
	setColorBase,
	addColor,
	editColor,
	removeColor,
} = schemeSlice.actions;

export const selectColorCurrentId = (state: RootState) =>
	state.scheme.color.current;
export const selectColorCurrent = (state: RootState) => {
	const { current, palette } = state.scheme.color;
	if (typeof current === 'number' && current < palette?.length)
		return palette?.[current];
};
export const selectColors = (state: RootState) => state.scheme.color;
export const selectColorBase = (state: RootState) => state.scheme.color.base;
export const selectPalette = (state: RootState) => state.scheme.color.palette;
export const selectSchemeSize = (state: RootState) => state.scheme.schemeSize;
export const selectBeadSize = (state: RootState) => state.scheme.beadSize;
export const selectType = (state: RootState) => state.scheme.type;

export default schemeSlice.reducer;
