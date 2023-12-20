import { Registration } from "@/components/registration";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

export default async function Home() {

	const session = await getServerSession(authOptions);

	return (
		<div>
			<div className="relative h-[calc(100vh-64px)] overflow-hidden rounded-lg bg-cover bg-center bg-no-repeat p-12 text-center" style={{
				backgroundImage: `url('/bb-background.jpg')`,
			}}>


				<div className="absolute bottom-5 left-0 right-0">
					{/* <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">


						<div className="inline-block max-w-lg text-center justify-center">
							<h1 className={title()}>Make&nbsp;</h1>
							<h1 className={title({ color: "violet" })}>beautiful&nbsp;</h1>
							<br />
							<h1 className={title()}>
								websites regardless of your design experience.
							</h1>
							<h2 className={subtitle({ class: "mt-4" })}>
								Beautiful, fast and modern React UI library.
							</h2>
						</div>

						<div className="flex gap-3">
							<Link
								isExternal
								as={NextLink}
								href={siteConfig.links.docs}
								className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
							>
								Documentation
							</Link>
							<Link
							
								isExternal
								as={NextLink}
								className={buttonStyles({ variant: "bordered", radius: "full" })}
								href={siteConfig.links.github}
							>
								<GithubIcon size={20} />
								GitHub
							</Link>
						</div>

						<div className="mt-8">
							<Snippet hideSymbol hideCopyButton variant="flat">
								<span>
									Get started by editing <Code color="primary">app/page.tsx</Code>
								</span>
							</Snippet>
						</div>

					</section> */}
					{
						!session &&
						<Registration msg="Sign In Free" />
					}

				</div>
			</div>
		</div>
	);
}
