import {  columnsType, rowType, tableHeight } from './table';

export default function conf() {
    const labelWidth = 200;
    const formItemSpan = 24;
    const tableHeaderHeight: tableHeight = 40;

    const tableCellHeight: tableHeight = 40;

    const columns: columnsType[] = [
        // { prop: 'index', label: '', width: 3 },

        // {  
        //     label: 'Other',
        //     children: [
        //         {
        //             prop: 'age', label: 'Age',
        //         },
        //         {
        //             label: 'Address',
        //             children: [
        //                 {
        //                     label: 'Street',
        //                     prop: 'street'
        //                 },
        //                 {
        //                     label: 'Block',
        //                     children: [
        //                       {
        //                         label: 'Building',
        //                         prop: 'building',
                         
        //                       },
        //                       {
        //                         label: 'Door No.',
        //                         prop: 'number',
        //                       },
        //                     ],
        //                   },
        //             ]
        //         }
        //     ]
        // },
        {
            prop: 'monitor',
            label: '班次',
            customCell: (_?: rowType, index?: number, columns?: columnsType) => {
                if (index === 2 && columns?.prop === 'monitor') {
                    return { colspan:3 };
                }

                if (index === 0 && columns?.prop === 'monitor') {
                    return { rowspan:2 };
                }

                if (index === 1 && columns?.prop === 'monitor') {
                    return { rowspan:0 };
                }

                return {colspan:1,rowspan:1};
            },
        },
        {
            prop: 'taHao',
            label: '塔号',
            customCell: (_?: rowType, index?: number, columns?: columnsType) => {
                if (index === 2 && columns?.prop === 'taHao') {
                    return {colspan : 0};
                }

                return  {colspan:1};
            },
        },
        {
            prop: 'materialNum',
            label: '投料量',
            customCell: (_?: rowType, index?: number, columns?: columnsType) => {
                if (index === 2 && columns?.prop === 'materialNum') {
                    return {colspan : 0};
                }

                return  {colspan:1};
            },
        },
        { prop: 'temperature', label: '沸腾罐温度', rowSpan: 2 },
        {
            prop: 'steamPressure',
            label: '蒸汽压力'
        },
        {
            prop: 'steamPressure1',
            label: '蒸汽压力2'
        },
        { prop: 'oxygen', label: '真空度' },
        { prop: 'productNum', label: '成品产量' },
        {
            prop: 'operatorName',
            label: '操作人'
        },
        {
            prop: 'operatorTime',
            label: '操作时间'
        },
    ];

    

    return {
        labelWidth,
        formItemSpan,
        columns,
        tableHeaderHeight,
        tableCellHeight,
    };
}
