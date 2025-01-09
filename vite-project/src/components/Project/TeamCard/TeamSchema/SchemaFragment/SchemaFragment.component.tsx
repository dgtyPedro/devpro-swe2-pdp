import {SchemaFragmentProps} from "./SchemaFragment.interface.tsx";

export const SchemaFragmentComponent = (props: SchemaFragmentProps) => {
    const {associate} = props
    return (
        <div style={{border: "1px solid black"}}>
            <div>{associate.name}</div>
            <div style={{display: "flex"}}>
                {
                    associate.associates.map(
                        associate =>
                            <SchemaFragmentComponent associate={associate}/>
                    )
                }
            </div>
        </div>
    )
}
