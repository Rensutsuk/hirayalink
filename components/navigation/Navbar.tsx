'use client';

import React, { useState, useEffect } from 'react';
import FullMenu from '@/components/navigation/navbar/Full-Menu';
import Hamburger from '@/components/navigation/navbar/Hamburger-Menu';

const Navbar: React.FC = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		window.addEventListener('resize', handleResize);
		handleResize();

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<nav>
			{isMobile ? <Hamburger /> : <FullMenu />}
		</nav>
	);
};

export default Navbar;