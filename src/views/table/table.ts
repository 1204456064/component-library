// 表格行数据值类型
export interface rowType {
    [key: string]: string | number | object | boolean;
}

// columns类型
export interface columnsType {
    prop?: string | number;
    label: string | number;
    width?: number;
    rowSpan?: number;
    colSpan?: number;
    children?: columnsType[];
    type?: string;
    customCell?: (_?: rowType, index?: number, columns?: columnsType) => { rowspan?:number; colspan?:number };
}


export type tableHeight = 10 | 20 | 30 | 40 | 50 | 60 | 70;