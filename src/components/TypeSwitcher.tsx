import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import TypeSwitchItem from './TypeSwitchItem';

import { ReactComponent as PatternRawImage } from '../assets/PatternRaw.svg';
import { ReactComponent as PatternBrickImage } from '../assets/PatternBrick.svg';
import { ReactComponent as PatternSquareImage } from '../assets/PatternSquare.svg';
import { SchemeType } from '../interface/scheme';

// interface Props {}

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	/* justify-content: center; */
	align-items: center;
	/* flex-wrap: wrap; */
	gap: 4px;
	/* margin: 16px 0; */
`;

const TypeSwitcher = () => {
	const [currentType, setCurrentType] = useState(SchemeType.Square);

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
	// <PatternSquareImage width={26} height={26} />
	// <PatternRawImage width={26} height={26} />
	// <PatternBrickImage width={26} height={26} />
	return (
		<Wrap>
			{types?.map(({ type, Icon }) => (
				<TypeSwitchItem
					active={type === currentType}
					key={type}
					onSelect={() => setCurrentType(type)}
				>
					<Icon width={34} height={34} />
				</TypeSwitchItem>
			))}
		</Wrap>
	);
};

export default TypeSwitcher;
