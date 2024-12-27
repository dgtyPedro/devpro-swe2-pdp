import {DesktopNav, Header, Item, MobileNav, Logo} from "./Header.styles.tsx";
import {Dropdown, Menu, MenuButton, MenuItem} from "@mui/base";
import {useNavigate} from "react-router";

export const HeaderComponent = () => {
    const navigate = useNavigate();
    return (
        <Header>
            <Logo onClick={() => window?.open("https://dev.pro", '_blank')?.focus()}>
                Pedro's PDP
            </Logo>
            <DesktopNav>
                <Item onClick={() => navigate("/projects")}>
                    Projects
                </Item>
                <Item onClick={() => navigate("/teams")}>
                    Teams
                </Item>
                <Item onClick={() => navigate("/collaborators")}>
                    Collaborators
                </Item>
                <Item onClick={() => navigate("/about")}>
                    About
                </Item>
                <Item>
                    Login
                </Item>
            </DesktopNav>
            <MobileNav>
            <Dropdown>
                    <MenuButton>[]</MenuButton>
                    <Menu>
                        <MenuItem>Project</MenuItem>
                        <MenuItem>
                            Teams
                        </MenuItem>
                        <MenuItem>
                            Collaborators
                        </MenuItem>
                        <MenuItem>
                            About
                        </MenuItem>
                        <MenuItem>Log out</MenuItem>
                    </Menu>
                </Dropdown>
            </MobileNav>
        </Header>
    )
}
