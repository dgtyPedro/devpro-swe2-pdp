import React from "react";
import {Permission} from "../../services/types/Permission.ts";

export interface ProtectedRouteProps {
    redirectPath?: string;
    children: React.ReactNode;
    permission?: keyof Permission;
}
