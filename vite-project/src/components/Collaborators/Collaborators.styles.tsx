import styled from "styled-components";

export const CollaboratorsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr) );
    row-gap: 20px;
`;

export const Collaborator = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
