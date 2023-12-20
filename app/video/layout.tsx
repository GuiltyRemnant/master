import { Navbar } from "@/components/navbar";

export default function BlogLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			{/* <Navbar /> */}
			<section className="pb-4 dark:bg-zinc-950">
				{children}
			</section>
		</>
	);
}
