import styled from "styled-components";

export const Header = styled.header`
    font-size: 1.2em;
    margin: 0;
    text-align: center;
    display: flex;
    justify-content: space-between;
    background: #62bb46;
    color: white;
    padding: 12px;
    padding-inline: 40px;
    box-shadow: 0 4px 8px #00000014;
    @media screen and (max-width: 800px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
`;

export const Logo = styled.div`
    display: flex;
    font-family: "Playwrite ES Guides", serif;
    font-size: 1.2em;
    justify-content: space-between;
    flex: 1;
    cursor: pointer;
`;

export const Item = styled.div`
    cursor: pointer;
`;

export const DesktopNav = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    gap: 3vw;
    justify-content: end;
    @media screen and (max-width: 800px) {
        display: none;
    }
`;

export const MobileNav = styled.div`
    display: none;
    @media screen and (max-width: 800px) {
        display: flex;
        flex: 1;
        gap: 10px;
        flex-wrap: wrap;
        box-sizing: border-box;
    }
`;

export const MobileItem = styled.div`
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

