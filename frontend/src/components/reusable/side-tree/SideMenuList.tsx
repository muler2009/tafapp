import React from "react";
import SideMenuItem from "./SideMenuItem";
import { MenuItemInterface } from "../../../interface/side-bar-interface";
import { FlexBox } from "../StyledComponent";

interface SideMenuListProps {
  list: MenuItemInterface[] | undefined;
}

const SideMenuList = ({ list = [] }: SideMenuListProps) => {
  return (
    <FlexBox className="flex flex-col">
      {list.length > 0
        ? list.map((listItem, index) => (
            <SideMenuItem key={index} listItem={listItem} />
          ))
        : null}
    </FlexBox>
  );
};

export default SideMenuList;
