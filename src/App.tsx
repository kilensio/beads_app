import { Counter } from './components/Counter';
import styled from 'styled-components';
import Scheme from './components/Scheme';
import Konva from 'konva';
import { SchemeType } from './interface/scheme';
import Sidebar from './components/Sidebar';
// import PaletteColor from './components/PaletteColor';
import Palette from './components/Palette';
import BaseColor from './components/BaseColor';
import { ReactComponent as LogoImage } from './assets/Logo.svg';
// import { ReactComponent as PatternRawImage } from './assets/PatternRaw.svg';
// import { ReactComponent as PatternBrickImage } from './assets/PatternBrick.svg';
// import { ReactComponent as PatternSquareImage } from './assets/PatternSquare.svg';
import TypeSwitcher from './components/TypeSwitcher';

const StyledApp = styled.div`
	min-height: 100vh;
	display: flex;
	/* display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center; */
	background-color: #f5edeb;
	background-color: #f9f1f5;
	background-color: #dbcfd5;
	font-size: calc(10px + 2vmin);
`;

// const StyledScheme = styled(Scheme)`
// 	margin: 10px 0;
// `;

const Header = styled.h1`
	position: fixed;
	display: flex;
	align-items: center;
	width: min-content;
	/* width: min-content; */
	padding: 4px 10px;
	padding: 2px 16px 6px 12px;
	background-color: white;
	box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
	font-size: 24px;
	color: #3d2ca7;
	color: #187295;
	color: #028abf;
	/* text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.7); */
	margin: 16px;
	z-index: 10;
	svg {
		margin-top: 4px;
		margin-right: 6px;
	}
`;

const Main = styled.div`
	/* display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center; */
	max-height: 100vh;
	/* overflow-y: scroll; */
	overflow: hidden;
	flex-grow: 1;
	/* margin-right: -18px; */
	/* font-size: calc(10px + 2vmin); */
	/* background-color: aliceblue; */
`;

const StyledHr = styled.hr`
	border: 0;
	height: 0px;
	border-top: 1px solid rgba(0, 0, 0, 0.1);
	margin: 16px 0 16px;
`;

// const SidebarLabel = styled.p`
// 	margin: 0 0 4px;
// 	font-size: 12px;
// 	&:not(:first-child) {
// 		margin-top: 24px;
// 	}
// `;

const SidebarHeader = styled.header`
	margin-bottom: auto;
`;

const SchemeContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-content: center;
	justify-content: center;
	/* align-items: center; */
	height: calc(100% - 56px);
	margin-top: 56px;
`;

// const StyledScheme = styled(Scheme)`
// 	margin: auto 0;
// `

function App() {
	Konva.pixelRatio = 1;
	return (
		<StyledApp>
			<Main>
				<Header>
					<LogoImage width={20} height={20} />
					{/* <PatternSquareImage width={26} height={26} /> */}
					{/* <PatternRawImage width={26} height={26} /> */}
					{/* <PatternBrickImage width={26} height={26} /> */}
					Beads.App
				</Header>
				<SchemeContainer>
					{/* <Scheme type={SchemeType.Square} customSize={{ row: 4, col: 4}} />
					<Scheme type={SchemeType.Raw} customSize={{ row: 2, col: 2}} />
					<Scheme type={SchemeType.Brick} customSize={{ row: 3, col: 4}} /> */}
					<Scheme type={SchemeType.Square} />
					{/* <Scheme type={SchemeType.Raw} /> */}
					{/* <Scheme type={SchemeType.Brick} /> */}
				</SchemeContainer>
			</Main>
			<Sidebar>
				<SidebarHeader>
					<Palette />
				</SidebarHeader>
				{/* <SidebarLabel>Palette</SidebarLabel> */}
				{/* <SidebarLabel>Base color</SidebarLabel> */}
				<BaseColor />
				<StyledHr />
				<TypeSwitcher />
				{/* <input id="color" type="color" />
				<StyledLabel htmlFor="color" /> */}
			</Sidebar>
		</StyledApp>
	);
}

export default App;
