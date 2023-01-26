import styled from 'styled-components';
import Scheme, { ImperativeSchemeRef } from './components/Scheme';
import Konva from 'konva';
import Sidebar from './components/Sidebar';
import Palette from './components/Palette';
import BaseColor from './components/BaseColor';
import { ReactComponent as LogoImage } from './assets/Logo.svg';
import TypeSwitcher from './components/TypeSwitcher';
import Size from './components/Size';
import Buttons from './components/Buttons';
import { useRef } from 'react';

const StyledApp = styled.div`
	min-height: 100vh;
	display: flex;
	background-color: #f5edeb;
	background-color: #f9f1f5;
	background-color: #dbcfd5;
	font-size: calc(10px + 2vmin);
`;

const Header = styled.h1`
	position: fixed;
	display: flex;
	align-items: center;
	width: min-content;
	padding: 4px 10px;
	padding: 2px 16px 6px 12px;
	background-color: white;
	box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
	font-size: 24px;
	color: #3d2ca7;
	color: #187295;
	color: #028abf;
	margin: 16px;
	z-index: 10;
	svg {
		margin-top: 4px;
		margin-right: 6px;
	}
`;

const Main = styled.div`
	max-height: 100vh;
	overflow: hidden;
	flex-grow: 1;
`;

const StyledHr = styled.hr`
	border: 0;
	height: 0px;
	border-top: 1px solid rgba(0, 0, 0, 0.1);
	margin: 16px 0 16px;
`;

const SidebarHeader = styled.header`
	margin-bottom: auto;
`;

const SchemeContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-content: center;
	justify-content: center;
	height: calc(100% - 56px);
	margin-top: 56px;
`;

function App() {
	Konva.pixelRatio = 1;
	const canvasRef = useRef<ImperativeSchemeRef>(null);

	return (
		<StyledApp>
			<Main>
				<Header>
					<LogoImage width={20} height={20} />
					Beads.App
				</Header>
				<SchemeContainer>
					<Scheme
						ref={canvasRef}
					/>
				</SchemeContainer>
			</Main>
			<Sidebar>
				<SidebarHeader>
					<Palette />
				</SidebarHeader>
				<BaseColor />
				<StyledHr />
				<TypeSwitcher />
				<StyledHr />
				<Size />
				<StyledHr />
				<Buttons
					onSavePicture={() => canvasRef.current?.savePicture()}
				/>
			</Sidebar>
		</StyledApp>
	);
}

export default App;
