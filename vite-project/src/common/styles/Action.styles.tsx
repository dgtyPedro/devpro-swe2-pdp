import styled from "styled-components";

export const ActionBar = styled.div`
    display: flex;
    align-items: start;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 10px;
`;

export const RemoveNotch = styled.div`
    display: flex;
    width: 100%;
    box-sizing: border-box;
    padding-inline: 2%;
    justify-content: end;
    > * {
        zoom: 100%;
        cursor: pointer;
    }
`;