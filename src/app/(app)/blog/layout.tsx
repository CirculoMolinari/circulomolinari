import { MainLayout } from "@/components/layout/main";
import { ReactNode } from "react";

function EventLayout({ children }: { children: ReactNode }) {
	return <MainLayout>{children}</MainLayout>;
}

export default EventLayout;
