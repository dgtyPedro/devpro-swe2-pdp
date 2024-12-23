import { Container } from "./Container.styles.tsx";
import React from "react";

export const ContainerComponent = ({ children }: { children: React.ReactNode }) => {
    return (
        <Container>
            {children}
        </Container>
    );
};
