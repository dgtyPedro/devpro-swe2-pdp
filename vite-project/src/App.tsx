import {HeaderComponent} from "./components/Header";
import {ContainerComponent} from "./components/Container";
import {WindowComponent} from "./components/Window";
import {RootComponent} from "./components/Root";

function App() {
    return (
        <RootComponent>
            <HeaderComponent/>
            <ContainerComponent>
                <WindowComponent/>
            </ContainerComponent>
        </RootComponent>
    )
}

export default App
