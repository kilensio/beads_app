import React, { useMemo } from 'react';
import styled from 'styled-components';
import TypeSwitchItem from './TypeSwitchItem';

import { ReactComponent as PatternRawImage } from '../assets/PatternRaw.svg';
import { ReactComponent as PatternBrickImage } from '../assets/PatternBrick.svg';
import { ReactComponent as PatternSquareImage } from '../assets/PatternSquare.svg';
import { SchemeType } from '../interface/scheme';
import { useAppDispatch, useAppSelector } from '../store';
import { selectType, setType } from '../store/schemeSlice';


const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
`;

const TypeSwitcher = () => {
	const dispatch = useAppDispatch();
	const currentType = useAppSelector(selectType);

	const types = useMemo<
		Array<{
			type: SchemeType;
			Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
		}>
	>(
		() => [
			{
				type: SchemeType.Square,
				Icon: PatternSquareImage,
			},
			{
				type: SchemeType.Raw,
				Icon: PatternRawImage,
			},
			{
				type: SchemeType.Brick,
				Icon: PatternBrickImage,
			},
		],
		[]
	);

	return (
		<Wrap>
			{types?.map(({ type, Icon }) => (
				<TypeSwitchItem
					active={type === currentType}
					key={type}
					onSelect={() => dispatch(setType(type))}
				>
					<Icon width={34} height={34} />
				</TypeSwitchItem>
			))}
		</Wrap>
	);
};

export default TypeSwitcher;
