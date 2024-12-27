import {HeaderComponent} from "./components/Header";
import {ContainerComponent} from "./components/Container";
import {WindowComponent} from "./components/Window";
import {RootComponent} from "./components/Root";
import React from "react";

function App({ render }: { render: React.ReactNode }) {
    return (
        <RootComponent>
            <HeaderComponent/>
            <ContainerComponent>
                <WindowComponent children={render}/>
            </ContainerComponent>
        </RootComponent>
    )
}

export default App
