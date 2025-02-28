import React from "react";

export interface MenuItemInterface {
    label: string;
    path?: string | null;
    children?: MenuItemInterface[],
    icon?: React.ReactElement;
    name?: string;
    link_identifier?: string;
}

export interface CategoryInterface {
    label: string;
    icon?: React.ReactElement;
    path?: string;
}