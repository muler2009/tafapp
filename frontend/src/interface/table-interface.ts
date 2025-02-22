import { ColumnDef, FilterFn, Row } from "@tanstack/react-table";

export interface BaseRecord {
    record_date?: string | Date; // Make it optional if not all records have this property
    sales_in_money?: number;
  }

export interface SharedTableProps<T> extends BaseRecord{
    data: T[];
    columns: ColumnDef<T, any>[];
    watermark?: string;
    showEntries?: boolean;
    showSearch?: boolean;
    showActions?: boolean; 
    showPagination?: boolean;
    showFilter?:boolean;
    filter_btn_name?: string;
    noRecordMessage?: string;
    customRowRenderer?: (row: Row<T>) => React.ReactNode; // Custom row rendering
    additionalFilters?: FilterFn<T>[]; // Additional filtering logic
  
}

export interface TableFilterProps {
    table: any;
    onMonthChange: (month: string) => void;
  }

export interface FilterPropsInterface {
    label: string;
}