import {Header, Item} from "./Header.styles.tsx";

export const HeaderComponent = () => {
    return (
        <Header>
            <Item>
                Logo
            </Item>
            <Item>
                <div>
                    Projects
                </div>
                <div>
                    Teams
                </div>
                <div>
                    Collaborators
                </div>
                <div>
                    About
                </div>
            </Item>
        </Header>
    )
}
