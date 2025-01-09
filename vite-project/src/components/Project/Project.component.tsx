import {useParams} from "react-router";

export const ProjectComponent = () => {

    const { id } = useParams();

    console.log(id)
    return (
        <></>
    );
}
