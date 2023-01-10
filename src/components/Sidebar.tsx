import React from 'react';
import styled from 'styled-components';

interface Props {
	children?: React.ReactNode;
}

// const Wrap = styled.div`
// 	width: 132px;
// 	height: 100vh;
// 	/* background-color: white; */
// 	/* box-shadow: 8px 0px 16px rgba(0, 0, 0, 0.3); */
// 	z-index: 100;
// 	padding: 16px;
// 	/* overflow: hidden; */
// 	flex-shrink: 0;
// `;

const StyledSidebar = styled.div`
	position: fixed;
	width: 100px;
	/* height: 100vh; */
	background-color: white;
	box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
	/* z-index: 100; */
	/* margin: 16px; */
	right: 0;
	height: calc(100% - 32px);
	margin: 16px;
	padding: 16px;
	display: flex;
	flex-direction: column;
	overflow: hidden;
`;

const Sidebar: React.FC<Props> = ({ children }) => {
	return (
		// <Wrap>
		<StyledSidebar>{children}</StyledSidebar>
		// </Wrap>
	);
};

export default Sidebar;
