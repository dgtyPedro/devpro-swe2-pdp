import styled from "styled-components";

export const ProjectBox = styled.div`
    display: block;
    border: 1px solid #f58220;
    box-shadow: 0 .1rem .8rem rgba(0, 0, 0, 0.05) !important;
    cursor: pointer;
    //border-radius: 6px;
`;

export const ProjectInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px 0;
    padding: 10px;
`;

export const ProjectName = styled.h2`
    margin: 0;
    font-size: 1.1em;
`;

export const ProjectTeamsSummary = styled.div`
    color: #0075A3;
`;

export const ProjectOwner = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;
`;

