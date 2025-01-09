import {DesktopNav, Header, Item, MobileNav, Logo} from "./Header.styles.tsx";
import {Dropdown, Menu, MenuButton, MenuItem} from "@mui/base";
import {useLocation, useNavigate} from "react-router";
import {useState} from "react";
import {LoginComponent} from "../Login";

export const HeaderComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [openLogin, setOpenLogin] = useState(false);
    const handleOpenLogin = () => setOpenLogin(true);
    const handleCloseLogin = () => setOpenLogin(false);

    const checkRouteActive = (route: string) => {
        return location.pathname.includes(route)
    }

    checkRouteActive("");

    return (
        <Header>
            <Logo onClick={() => window?.open("https://dev.pro", '_blank')?.focus()}>
                Pedro's PDP
            </Logo>
            <DesktopNav>
                <Item style={
                    checkRouteActive("projects") ? {
                        fontWeight: "1000"
                    } : {}
                } onClick={() => navigate("/projects")}>
                    Projects
                </Item>
                {/*<Item onClick={() => navigate("/teams")}>*/}
                {/*    Teams*/}
                {/*</Item>*/}
                <Item style={
                    checkRouteActive("collaborators") ? {
                        fontWeight: "1000"
                    } : {}
                } onClick={() => navigate("/collaborators")}>
                    Collaborators
                </Item>
                <Item style={
                    checkRouteActive("about") ? {
                        fontWeight: "1000"
                    } : {}
                } onClick={() => navigate("/about")}>
                    About
                </Item>
                <Item onClick={handleOpenLogin}>
                    Sign In
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
            <LoginComponent open={openLogin} handleClose={handleCloseLogin}/>
        </Header>
    )
}
