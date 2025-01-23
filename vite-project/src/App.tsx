import {HeaderComponent} from "./components/Header";
import {ContainerComponent} from "./components/Container";
import {WindowComponent} from "./components/Window";
import {RootComponent} from "./components/Root";
import {store} from './app/store';
import {Provider} from 'react-redux';
import React from "react";
import {ToastProvider} from "./common/hooks/Toast/toast.provider.tsx";

function App({render}: { render: React.ReactNode }) {

    return (
        <Provider store={store}>
            <ToastProvider>
                <RootComponent>
                    <HeaderComponent/>
                    <ContainerComponent>
                        <WindowComponent children={render}/>
                    </ContainerComponent>
                </RootComponent>
            </ToastProvider>
        </Provider>
    );
}

export default App;
