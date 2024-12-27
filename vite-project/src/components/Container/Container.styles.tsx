import styled from "styled-components";

export const Container = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    padding: 50px 100px 50px;
    flex-direction: column;
    @media screen and (max-width: 1200px) {
        padding: 50px;
    }
    @media screen and (max-width: 800px) {
        padding: 0;
    }
`;


