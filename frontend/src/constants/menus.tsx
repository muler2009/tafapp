import { CategoryInterface, MenuItemInterface } from "../interface/side-bar-interface";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io5";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";
import * as BsIcons from "react-icons/bs";
import * as IoIoIcons from "react-icons/io";
import * as GoIcons from "react-icons/go";
import * as GrIcons from "react-icons/gr";
import * as RiIcons from "react-icons/ri";
import * as GiIcons from "react-icons/gi";


export const sidebar_link: MenuItemInterface[] = [
    {
      label: "Dashboard",
      path: "/taf",
      icon: <Fa6Icons.FaRegFolder size={17} />
    },
    {
      label: "Taf menu",
      path: "/taf/",
      icon: <FaIcons.FaGasPump size={17}/>,
      children: [
        {
          label: "Stock",
          path: "stock",
          icon: <GiIcons.GiStockpiles size={17} />
        },     
        {
          label: "Gaspump",
          path: "machine",
          icon: <RiIcons.RiGasStationFill size={17} />,
        },
        {
          label: "Reading",
          path: "record",
          icon: <FaIcons.FaBookReader size={15} />
        },
        {
          label: "Sales Information",
          path: "sales",
          icon: <IoIcons.IoScale size={15} />,
        },
               
      ]
    },
    {
      label: "Trash",
      path: "/taf/trash", // Remove trailing slash
      icon: <IoIcons.IoTrashOutline size={17} />,
      // children: [
      //   {
      //     label: "Stock",
      //     path: "/taf/trash/stocking", // Just the relative path
      //     icon: <GiIcons.GiStockpiles size={17} />
      //   }, 
      // ]
    } 
  ];


  export const settings: MenuItemInterface[] = [
    {
      label: "Passowrd",
      link_identifier: "Change Passowrd",
      icon: <BsIcons.BsBellFill size={17} />
      
    },
    {
      label: "Configurations",
      link_identifier: "Configurations",
      icon: <BsIcons.BsBellFill size={17} />
      
    },
  ]


  export const sidearBarLink: MenuItemInterface[] = [
    {
      label: "Notification",
      path: "notification",
      icon: <BsIcons.BsBellFill size={17} />
      
    },
    {
      label: "Setting",
      path: "setting",
      icon: <IoIcons.IoSettingsOutline size={17} />,
      children: [
        {
          label: "Profile Setting",
          path: "profile",
          icon: <FaIcons.FaGoogleDrive />,
        },
        {
          label: "Preference",
          path: "preferences",
          icon: <MdIcons.MdOutlineAssignmentInd size={16} />
        }
      ]
      
    },

  ]


  
  export default sidebar_link;



  