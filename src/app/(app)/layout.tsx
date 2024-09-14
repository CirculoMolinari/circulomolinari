import React from "react";
import "@radix-ui/themes/styles.css";
import "./globals.scss";

import { Inter } from "next/font/google";
import { Container, Theme } from "@radix-ui/themes";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
});

/* Our app sits here to not cause any conflicts with payload's root layout  */
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<html className={inter.className}>
			<body>
				<Theme accentColor="gray">
					<Container id="main" size="3">
						<Header />

						{children}
					</Container>
					<Footer />
				</Theme>
			</body>
		</html>
	);
};

export default Layout;
