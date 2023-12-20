export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Master",
	description: "Master Template",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "Videos",
			href: "/video",
		  }
	],
	navMenuItems: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "Videos",
			href: "/video",
		  },
	],
	links: {
		github: "https://github.com/nextui-org/nextui",
		twitter: "https://twitter.com/getnextui"
	},
};
