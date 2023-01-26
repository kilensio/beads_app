import React from 'react';
import styled from 'styled-components';

interface Props {
	children?: React.ReactNode;
}

const StyledSidebar = styled.div`
	position: fixed;
	width: 100px;
	background-color: white;
	box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
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
		<StyledSidebar>{children}</StyledSidebar>
	);
};

export default Sidebar;
