import { MenuItemInterface } from "../interface/side-bar-interface";
import * as BsIcons from "react-icons/bs";
import * as TbIcons from "react-icons/tb";
import * as HiIcons from "react-icons/hi";




 export const actions: MenuItemInterface[] = [
    {
      label: "Edit",
      link_identifier: "Edit",
      icon: <TbIcons.TbEdit size={17}/>,
      color: "hover:text-blue-500",
      
    },
    {
      label: "Delete",
      link_identifier: "Delete",
      icon: <BsIcons.BsTrash3Fill  size={17}/>,     
      color: "hover:text-red-500", 
    },
    {
      label: "Download",
      link_identifier: "Download",
      icon: <HiIcons.HiDownload  size={17}/>,   
      color: "hover:text-green-500",   
    },
    
  ]