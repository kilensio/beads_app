import React from 'react';
import styled from 'styled-components';
import { ReactComponent as DownloadSvg } from '../assets/Download.svg';
import { ReactComponent as UploadSvg } from '../assets/Upload.svg';
import { ReactComponent as ReloadSvg } from '../assets/Reload.svg';
import { ReactComponent as PictureSvg } from '../assets/Picture.svg';

const Wrap = styled.div<{ margin?: string }>`
	display: flex;
	row-gap: 8px;
	column-gap: 4px;
	flex-wrap: wrap;

	margin: ${({ margin }) => margin || '0'};
`;

const StyledButton = styled.button`
	display: block;
	position: relative;
	height: 32px;
	width: 32px;
	background-color: white;
	border: 1px solid gray;
	cursor: pointer;
	border-radius: 2px;
	flex-grow: 0;
	flex-shrink: 0;
	outline: 0px white;
	box-shadow: unset;
	color: gray;

	:hover {
		color: #028abf;
	}

	:active {
		outline: 2px lightblue solid;
		box-shadow: 0px 0px 3px -1px rgba(0, 0, 0, 0.5) inset;
		border-color: white;
	}
`;

interface Props {
	margin?: string;
	onSavePicture?: () => void;
}

const Buttons: React.FC<Props> = ({ onSavePicture }) => {
	const handleSave = () => {
		console.log('onSavePicture', onSavePicture)
		onSavePicture?.();
	};

	return (
		<Wrap>
			<StyledButton title="Load from file" type="button">
				<UploadSvg height={18} width={18} />
			</StyledButton>
			<StyledButton title="Reload" type="button">
				<ReloadSvg height={18} width={18} />
			</StyledButton>
			<StyledButton
				onClick={handleSave}
				title="Save as file"
				type="button"
			>
				<DownloadSvg height={18} width={18} />
			</StyledButton>
			<StyledButton title="Save as picture" type="button">
				<PictureSvg height={18} width={18} />
			</StyledButton>
		</Wrap>
	);
};

export default Buttons;
