import { Navbar as HeroUINavbar, NavbarContent, NavbarBrand, NavbarItem } from "@heroui/navbar";
import ThemeSwitch from "./theme-switch";
import { Button } from "@heroui/button";

export const Navbar = () => {
	return (
		<HeroUINavbar maxWidth="2xl" position="sticky">
			<NavbarBrand>
				<span className="">Cover Letter Generator</span>
			</NavbarBrand>

			<NavbarContent justify="end">
				<NavbarItem className="flex items-center gap-2">
					<ThemeSwitch />
					<Button color="primary">Login</Button>
				</NavbarItem>
			</NavbarContent>
		</HeroUINavbar>
	);
};
