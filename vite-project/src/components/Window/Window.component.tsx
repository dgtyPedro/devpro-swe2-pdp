import {Window} from "./Window.styles.tsx";
import React from "react";

export const WindowComponent = ({ children }: { children: React.ReactNode }) => {
    return (
        <Window>
            {children}
        </Window>
    )
}
