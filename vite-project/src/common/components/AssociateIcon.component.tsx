import { AssociateIconProps } from "./AssociateIcon.interface";
import { AssociateIcon, BigAssociateIcon, SmallAssociateIcon } from "../styles";
import { useNameInitials } from "../hooks/UseNameInitials.tsx";
import React from "react";

type Size = "default" | "big" | "small";

/* eslint-disable @typescript-eslint/no-explicit-any */
const componentMap: Record<Size, React.ComponentType<any>> = {
    default: AssociateIcon,
    big: BigAssociateIcon,
    small: SmallAssociateIcon,
};

export const AssociateIconComponent = (props: Omit<AssociateIconProps, "size"> & { size?: Size }) => {
    const { size = "default", hasShadow, name } = props;

    const Icon = componentMap[size];

    return (
        <Icon title={name} style={!hasShadow ? { boxShadow: "unset" } : {}}>
            {useNameInitials(name)}
        </Icon>
    );
};
