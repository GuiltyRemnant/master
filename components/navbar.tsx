import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import Image from 'next/image';
import { UploadForm } from '@/components/uploadForm';

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import {
	TwitterIcon,
	GithubIcon,
	DiscordIcon,
	HeartFilledIcon,
	SearchIcon,
} from "@/components/icons";

export const Navbar = ({session}: any) => {

	const searchInput = (
		<Input
			aria-label="Search"
			classNames={{
				inputWrapper: "bg-default-100",
				input: "text-sm",
			}}
			endContent={
				<Kbd className="hidden lg:inline-block" keys={["command"]}>
					K
				</Kbd>
			}
			labelPlacement="outside"
			placeholder="Search..."
			startContent={
				<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
			}
			type="search"
		/>
	);

	return (
		<NextUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className=" basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex juwstify-start items-center gap-1" href="/">
						<div className="w-[150px]">
							<Image
								alt='Logo'
								src='/logo_only_small.png'
								width='139'
								height='64'
								style={{ position: 'absolute', top: '16px' }}
							/>
						</div>
					</NextLink>
				</NavbarBrand>
				<ul className="hidden md:flex gap-4 justify-start ml-2">
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:text-primary data-[active=true]:font-medium"
								)}
								color="foreground"
								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarItem>
					))}
				</ul>
			</NavbarContent>

			<NavbarContent className="basis-1 pl-4" justify="end">
				<UploadForm session={session} />
				<ThemeSwitch />
				<Link isExternal href={siteConfig.links.github} aria-label="Github">
					<GithubIcon className="text-default-500" />
				</Link>
				<NavbarMenuToggle />
			</NavbarContent>



			<NavbarMenu>
				<div className="pt-4">
					{searchInput}
					<div className="mx-4 mt-2 flex flex-col gap-2 text-right">
						{siteConfig.navMenuItems.map((item, index) => (
							<NavbarMenuItem className="md:hidden" key={`${item}-${index}`}>
								<Link
									color={"foreground"}
									href={item.href}
									size="lg"
								>
									{item.label}
								</Link>
							</NavbarMenuItem>
						))}
						{session &&
							<NavbarMenuItem>
								<Link
									color={'danger'}
									href={'/api/auth/signout'}
									size="lg"
								>
									Logout
								</Link>
							</NavbarMenuItem>
						}
					</div>
				</div>
			</NavbarMenu>
		</NextUINavbar>
	);
};
