import styled from "styled-components";

export const SchemaBox = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    overflow: scroll;
    border: 2px solid #62bb46;
    background-color: white;
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-shadow: 0 0 100px 0 rgb(98, 187, 70, 0.5);
    justify-content: center;
    align-items: center;
`;

export const Tree = styled.div.attrs({
    className: 'tf-tree tf-custom',
})`
`;

export const Nc = styled.span.attrs({
    className: 'tf-nc',
})`
    display: flex!important;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;