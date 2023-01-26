import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div<{ margin?: string }>`
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-radius: 2px;
	font-size: 16px;
	line-height: 18px;

	margin: ${({ margin }) => (margin || '0')};
`;

const StyledButton = styled.button`
	position: relative;
	width: 20px;
	height: 28px;
	border: 0;
	background-color: #fff;
	cursor: pointer;
	flex: 0 0 auto;

	&:before {
		content: '';
		position: absolute;
		inset: 50%;
		width: 12px;
		border-top: 2px solid gray;
		height: 0px;
		transform: translate(-50%, -50%);
	}

	&:last-child:after {
		content: '';
		position: absolute;
		inset: 50%;
		width: 12px;
		border-top: 2px solid gray;
		height: 0px;
		transform: translate(-50%, -50%) rotate(90deg);
	}

	&:hover:not(:disabled) {
		background-color: #028abf;
		&:before,
		&:after {
			border-color: #fff;
		}
	}

	&:disabled {
		opacity: 0.4;
		cursor: default;
	}
`;

const StyledInput = styled.input`
	border: none;
	background-color: unset;
	font-size: inherit;
	line-height: inherit;
	width: 28px;
	text-align: center;
	outline: none;
`;

interface Props {
	title?: string;
	value: number;
	maxValue?: number;
	margin?: string;
	onChange: (count: number) => void;
}

const SizeInput: React.FC<Props> = ({ value, title, margin, maxValue, onChange }) => {
	const handleChange = (count: number) => {
		if (count < 0 || count > (maxValue || 100)) return;

		onChange(count);
	}

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		const notValid = e.target.validity.patternMismatch;
		if ((notValid && value) || +newValue > (maxValue || 100)) return;

		onChange(newValue === '' || !+newValue ? 0 : +newValue);
	};

	return (
		<Wrap margin={margin}>
			<StyledButton
				onClick={() => handleChange(value - 1)}
				disabled={value <= 0}
			/>
			<StyledInput
				value={value}
				onChange={handleInput}
				type="text"
				pattern="[0-9]*"
			/>
			<StyledButton
				onClick={() => handleChange(value + 1)}
				disabled={value >= (maxValue || 100)}
			/>
		</Wrap>
	);
};

export default SizeInput;
