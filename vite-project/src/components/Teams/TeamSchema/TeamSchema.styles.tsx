import styled from "styled-components";

export const SchemaBox = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    overflow: scroll;
    border: 2px solid #f58220;
    background-color: white;
    display: flex;
    flex-direction: column;
    padding: 20px;
    justify-content: center;
    align-items: center;
    max-height: 90vh;
    box-sizing: border-box;
`;

export const Tree = styled.div.attrs({
    className: 'tf-tree tf-custom',
})`
    width: 100%;
    text-align: center;
`;

export const TreeRoot = styled.div`
    width: 100%;
`;

export const Nc = styled.span.attrs({
    className: 'tf-nc',
})`
    display: flex!important;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;