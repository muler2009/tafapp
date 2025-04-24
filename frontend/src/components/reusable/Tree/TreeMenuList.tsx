import React from "react";
import SideMenuItem from "./TreeMenuItem1"
import { MenuItemInterface } from "../../../interface/side-bar-interface";
import { FlexBox } from "../StyledComponent";
import { TreeMenuItemInterface } from "../../../interface/tree-menu-interface";
import TreeMenuItem from "./TreeMenuItem1";

interface SideMenuListProps {
  list: TreeMenuItemInterface[] | undefined;
  controller: boolean
}

const TreeMenuList = ({ list = [], controller }: SideMenuListProps) => {
  return (
    <FlexBox className={`flex flex-col duration-500 font-Poppins font-normal text-[13px] text-white`}>
      {list.length > 0
        ? list.map((listItem, index) => (
            <TreeMenuItem key={index} listItem={listItem} controller={controller} />
          ))
        : null}
    </FlexBox>
  );
};

export default TreeMenuList;
