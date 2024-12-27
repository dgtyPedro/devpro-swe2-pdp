import styled from "styled-components";

export const Header = styled.header`
    font-size: 1.2em;
    margin: 0;
    text-align: center;
    display: flex;
    justify-content: space-between;
    background: #f58220;
    color: white;
    padding: 5px;
    padding-inline: 40px;
    font-weight: bold;
    box-shadow: 0 4px 8px #00000014;
`;

export const Logo = styled.div`
    display: flex;
    justify-content: space-between;
    flex: 1;
    cursor: pointer;
`;

export const Item = styled.div`
    cursor: pointer;
`;

export const DesktopNav = styled.div`
    display: flex;
    flex: 1;
    justify-content: space-between;
    @media screen and (max-width: 800px) {
        display: none;
    }
`;

export const MobileNav = styled.div`
    display: none;
    @media screen and (max-width: 800px) {
        display: flex;
        flex: 1;
        justify-content: end;
    }
`;

