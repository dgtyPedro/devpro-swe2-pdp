import styled from "styled-components";

export const CollaboratorsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr) );
    column-gap: 2rem;
    row-gap: 20px;
`;

export const Collaborator = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    border: 1px solid #62bb46;
    padding: 5px 0 5px;
    box-shadow: 0 .1rem .8rem rgba(0, 0, 0, 0.05) !important;
    gap: 5px;
    text-align: center;
`;
