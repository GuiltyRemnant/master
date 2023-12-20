import { Navbar } from "@/components/navbar";

export default function ConfirmationLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// ...and then pass it as an argument to another useSWR hook
	/* const { data: orders } = useSWR(user ? ['/api/orders', user] : null, fetchWithUser) */

  /* const loginToken = router.query.loginToken || ''; */

	return (
		<>
			{/* <Navbar /> */}
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				<div className="pt-24 inline-block max-w-lg text-center justify-center">
					{children}
				</div>
			</section>
		</>
	);
}
