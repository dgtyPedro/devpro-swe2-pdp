import styled from "styled-components";

export const ProfileBox = styled.div`
    display: flex;
    flex: 1;
    gap: 10px;
`;

export const ProfileForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    gap: 10px;
    padding-inline: 20px;
`

export const ProfileInput = styled.input`
    font-size: 1.2em;
    padding: 5px 10px;
    width: 100%;
    outline: none;
    background: #FFFFFF;
    color: #000000;
    border: 1px solid #0075A3;
    box-shadow: 0 .1rem .2rem rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
`;

export const ProfileButton = styled.button`
    background-color: #0075A3;
    color: white;
    border: 0;
    font-weight: bold;
    padding: 5px;
    padding-inline: 20px;
    cursor: pointer;
    font-size: 1em;
`;

export const ProfileTitle = styled.h2`
    text-align: center;
    width: 100%;
`;

export const ProfileText = styled.p`
`;

export const ProfileInfo = styled.div`
    flex: 1;
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
    height: 100%;
`;

export const InfoLabel = styled.span`
    font-weight: bold;
`;