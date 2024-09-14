import React from "react";
import "@radix-ui/themes/styles.css";
import "./globals.scss";

import { Inter } from "next/font/google";
import { Container, Theme } from "@radix-ui/themes";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Metadata } from "next";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Círculo Molinari",
};

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
