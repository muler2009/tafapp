import { ColumnDef } from "@tanstack/react-table";

export interface SharedTableProps<T> {
    data: T[];
    columns: ColumnDef<T, any>[];
    watermark?: string;
    showEntries?: boolean;
    showSearch?: boolean;
    showActions?: boolean; 
    showPagination?: boolean;
}