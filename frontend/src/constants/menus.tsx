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
import { FaGasPump } from "react-icons/fa";



export const sidebar_link: MenuItemInterface[] = [
    {
      label: "Dashboard",
      path: "/",
      icon: <Fa6Icons.FaRegFolder size={17} />
    },
    {
      label: "Taf",
      path: ".",
      icon: <FaGasPump />,
      children: [
        {
          label: "Stock",
          path: "stock",
          icon: <GiIcons.GiStockpiles size={15} />
        },     
        {
          label: "Machine",
          path: "machine",
          icon: <RiIcons.RiGasStationFill />,
        },
        {
          label: "Reading",
          path: "record",
          icon: <FaIcons.FaBookReader size={15} />
        },
        {
          label: "Sales Information",
          path: "sales",
          icon: <IoIcons.IoScale size={15} />
        },
               
      ]
    },
    {
      label: "Trash",
      path: "/.",
      icon: <IoIcons.IoTrashOutline size={15} />
    },
  
  
  ];

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



  