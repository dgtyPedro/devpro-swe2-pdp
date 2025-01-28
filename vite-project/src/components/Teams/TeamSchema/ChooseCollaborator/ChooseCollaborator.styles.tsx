import styled from "styled-components";

export const ChooseCollaboratorBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    @media screen and (max-width: 800px) {
        flex-direction: column;
        justify-content: center;
    }

    & h3 {
        margin: 0;
    }
`;

