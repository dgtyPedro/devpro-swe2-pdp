import {DesktopNav, Header, Item, MobileNav, Logo, MobileItem} from "./Header.styles.tsx";
import {useLocation, useNavigate} from "react-router";
import {useState} from "react";
import {LoginComponent} from "../Login";
import {SignUpComponent} from "../SignUp";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store.ts";
import {deleteCredentials} from "../../features/authSlice.ts";
import {useLogoutMutation} from "../../services/collaborator.ts";

export const HeaderComponent = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const permissions = useSelector((state: RootState) => state.auth.permission);
    const dispatch = useDispatch();
    const [logout] = useLogoutMutation();
    const navigate = useNavigate();
    const location = useLocation();

    const [openLogin, setOpenLogin] = useState(false);
    const handleOpenLogin = () => setOpenLogin(true);
    const handleCloseLogin = () => setOpenLogin(false);

    const [openSignUp, setOpenSignUp] = useState(false);
    const handleOpenSignUp = () => setOpenSignUp(true);
    const handleCloseSignUp = () => setOpenSignUp(false);

    const checkRouteActive = (route: string) => {
        return location.pathname.includes(route)
    }

    const handleLogout = async () => {
        await logout();
        dispatch(deleteCredentials());
        window.location.href = '/about';
    };

    checkRouteActive("");

    return (
        <Header>
            <Logo onClick={() => window?.open("https://dev.pro", '_blank')?.focus()}>
                Pedro's PDP
            </Logo>
            <DesktopNav>
                <Item style={
                    checkRouteActive("about") ? {
                        fontWeight: "1000"
                    } : {}
                } onClick={() => navigate("/about")}>
                    About
                </Item>
                {
                    token ? (
                        <>
                            {
                                permissions?.["read-users"] &&
                                <Item style={
                                    checkRouteActive("collaborators") ? {
                                        fontWeight: "1000"
                                    } : {}
                                } onClick={() => navigate("/collaborators")}>
                                    Collaborators
                                </Item>
                            }
                            {
                                permissions?.["read-teams"] &&
                                <Item style={
                                    checkRouteActive("projects") ? {
                                        fontWeight: "1000"
                                    } : {}
                                } onClick={() => navigate("/projects")}>
                                    Projects
                                </Item>
                            }
                            <Item style={
                                checkRouteActive("profile") ? {
                                    fontWeight: "1000"
                                } : {}
                            } onClick={() => navigate("/profile")}>
                                Profile
                            </Item>
                            <Item onClick={handleLogout}>
                                Log Out
                            </Item>
                        </>
                    ) : (
                        <>
                            <Item onClick={handleOpenLogin}>
                                Sign In
                            </Item>
                            <Item onClick={handleOpenSignUp}>
                                Sign Up
                            </Item>
                        </>
                    )
                }
            </DesktopNav>
            <MobileNav>
                <MobileItem style={
                    checkRouteActive("about") ? {
                        fontWeight: "1000"
                    } : {}
                } onClick={() => navigate("/about")}>
                    About
                </MobileItem>
                {
                    token ? (
                        <>
                            {
                                permissions?.["read-users"] &&
                                <MobileItem style={
                                    checkRouteActive("collaborators") ? {
                                        fontWeight: "1000"
                                    } : {}
                                } onClick={() => navigate("/collaborators")}>
                                    Collaborators
                                </MobileItem>
                            }
                            {
                                permissions?.["read-teams"] &&
                                <MobileItem style={
                                    checkRouteActive("projects") ? {
                                        fontWeight: "1000"
                                    } : {}
                                } onClick={() => navigate("/projects")}>
                                    Projects
                                </MobileItem>
                            }
                            <MobileItem style={
                                checkRouteActive("profile") ? {
                                    fontWeight: "1000"
                                } : {}
                            } onClick={() => navigate("/profile")}>
                                Profile
                            </MobileItem>
                            <MobileItem onClick={handleLogout}>
                                Log Out
                            </MobileItem>
                        </>
                    ) : (
                        <>
                            <MobileItem onClick={handleOpenLogin}>
                                Sign In
                            </MobileItem>
                            <MobileItem onClick={handleOpenSignUp}>
                                Sign Up
                            </MobileItem>
                        </>
                    )
                }
            </MobileNav>
            <LoginComponent open={openLogin} handleClose={handleCloseLogin}/>
            <SignUpComponent open={openSignUp} handleClose={handleCloseSignUp}/>
        </Header>
    )
}
