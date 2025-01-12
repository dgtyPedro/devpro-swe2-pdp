import {SchemaFragmentProps} from "./SchemaFragment.interface.tsx";
import {AssociateIcon} from "../../../../../common/styles";

export const SchemaFragmentComponent = (props: SchemaFragmentProps) => {
    const {associate} = props
    return (
        <li>
            <span className="tf-nc" style={
                {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                }
            }>
                <AssociateIcon style={{zoom: "130%", boxShadow: "unset"}}>{associate.name.slice(0, 2)}</AssociateIcon>
                {associate.name.split(' ').slice(0, 2).join(' ')}
            </span>
            {
                associate.associates.length > 0 &&
                <ul>
                    {
                        associate.associates.map(
                            associate =>
                                <SchemaFragmentComponent associate={associate}/>
                        )
                    }
                </ul>
            }
        </li>
    )
}
