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
    flex: 1;
    width: 100%;
    justify-content: end;
    > * {
        zoom: 60%;
        cursor: pointer;
    }
`;