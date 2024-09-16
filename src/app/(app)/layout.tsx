import { ReactNode } from "react";
import "@radix-ui/themes/styles.css";
import "./globals.scss";

import { inter } from "./fonts";
import { Theme } from "@radix-ui/themes";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		template: "%s | Círculo Molinari",
		default: "Círculo Molinari",
	},
	description: "Instituto de filosofía política anarquista",
};

function Layout({ children }: { children: ReactNode }) {
	return (
		<html className={inter.className} lang="es">
			<body>
				<Theme accentColor="gray">
					<Header />
					{children}
					<Footer />
				</Theme>
			</body>
		</html>
	);
}

export default Layout;
