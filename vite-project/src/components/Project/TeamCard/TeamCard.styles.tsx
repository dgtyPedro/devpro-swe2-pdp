import styled from "styled-components";

export const TeamBox = styled.div`
    display: block;
    border: 1px solid #00a1e0;
    box-shadow: 0 .1rem .8rem rgba(0, 0, 0, 0.05) !important;
    cursor: pointer;
    //border-radius: 6px;
`;

export const TeamInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px 0;
    padding: 10px;
`;

export const TeamName = styled.h2`
    margin: 0;
    font-size: 1.1em;
`;

export const TeamOwner = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;
`;

export const TeamAssociates = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
`;

