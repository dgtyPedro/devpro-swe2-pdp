import styled from "styled-components";

export const CollaboratorsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr) );
    column-gap: 2rem;
    row-gap: 20px;
`;

export const Collaborator = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #62bb46;
    padding: 15px 0 15px;
    box-shadow: 0 .1rem .8rem rgba(0, 0, 0, 0.05) !important;
    gap: 10px;
`;
