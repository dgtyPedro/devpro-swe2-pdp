import styled from "styled-components";

export const ProjectBox = styled.div`
    display: flex;
    border: 1px solid #f58220;
    box-shadow: 0 .1rem .8rem rgba(0, 0, 0, 0.05) !important;
    cursor: pointer;
    flex-direction: column;
    //border-radius: 6px;
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: scale(1.01);
    }

    @media screen and (max-width: 800px) {
        flex: 1;
        width: 100%;
    }
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

