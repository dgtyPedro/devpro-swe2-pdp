import styled from "styled-components";

export const ProjectBox = styled.div`
    display: block;
    border: 1px solid #f58220;
    box-shadow: 0 .1rem .8rem rgba(0, 0, 0, 0.05) !important;
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

export const AssociatesPreview = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    background: #f58220;
    color: white;
    padding: 10px;
`;

export const AssociateIcon = styled.div`
    height: 20px;
    width: 20px;
    padding: 1px;
    font-size: 0.8em;
    background-color: #f58220;
    border: 1px solid white;
    color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

