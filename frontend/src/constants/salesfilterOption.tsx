import { MenuItemInterface } from "../interface/side-bar-interface";
import * as MdIcons from 'react-icons/md'
import * as AiIcons from 'react-icons/ai'


export const filterOptions: MenuItemInterface[] = [
    { label: "Today" },
    {
      label: "Monthly",
      children: [
          { label: "datepicker", type: "datepicker" }]
    },
    {
      label: "Yearly",
      children: Array.from({ length: 6 }, (_, i) => ({
        label: (new Date().getFullYear() - i).toString(),
      })),
    },
  ];


  export const file_menu: MenuItemInterface[] = [
    {
        label: "File",
        icon: <AiIcons.AiOutlineFile size={20} />,
        children: [
          { label: "January" }, { label: "February" }, { label: "March" },
          { label: "April" }, { label: "May" }, { label: "June" },
          { label: "July" }, { label: "August" }, { label: "September" },
          { label: "October" }, { label: "November" }, { label: "December" },
        ]
    },
    {
        label: "Test link",
        children: [
            {label: "Word file"},
            {label: "Xlsx file"}
        ]
    },
    {
        label: "Other file",
        path: 'create'
    }
]
