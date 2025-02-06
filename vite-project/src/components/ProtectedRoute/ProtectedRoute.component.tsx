import {Navigate} from "react-router";
import {ProtectedRouteProps} from "./ProtectedRoute.interface.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store.ts";

export const ProtectedRoute = ({
                                   redirectPath = "/",
                                   children,
                                   permission
                               }: ProtectedRouteProps) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const permissions = useSelector((state: RootState) => state.auth.permission);
    if(permission && !permissions?.[permission]) {
        return <Navigate to={redirectPath} replace/>;
    }
    if (!user) {
        return <Navigate to={redirectPath} replace/>;
    }

    return children;
};