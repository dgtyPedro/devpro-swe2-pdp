import { Root } from "./Root.styles.tsx";
import React from "react";

export const RootComponent = ({ children }: { children: React.ReactNode }) => {
    return (
        <Root>
            {children}
        </Root>
    );
};
