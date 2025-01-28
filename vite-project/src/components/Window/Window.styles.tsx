import styled from "styled-components";

export const Window = styled.div`
    flex: 1;
    width: 100%;
    background: white;
    box-shadow: 0 .3rem .8rem #00000026 !important;
    border-radius: 24px;
    padding: 40px;
    height: 700px!important;
    overflow-y: scroll;
    @media screen and (max-width: 800px) {
        border-radius: 0;
        box-sizing: border-box;
    }
`;


