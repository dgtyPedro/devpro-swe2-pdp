import styled from "styled-components";

export const ProjectGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    @media screen and (max-width: 800px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;