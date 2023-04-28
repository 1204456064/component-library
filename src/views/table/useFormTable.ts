import { onBeforeMount, ref } from 'vue';
import { rowType ,columnsType } from './table';
export default function useFormTable(props: { columns: columnsType[] }) {
    // 表头最大的行高
    const maxHeaderRowSpan = ref<number>(1);

    // 表头最大的列宽
    const maxHeaderColSpan = ref<number>(1);

    // 需要渲染的表头list，因为需要合并表头比较麻烦，所以需要把props的columns重新转一下
    const renderHeaderList = ref<columnsType[][]>([]);

    // 需要渲染的表头list，因为需要合并表头比较麻烦，所以需要把props的columns重新转一下
    const renderDataList = ref<columnsType[]>([]);

    const headerIndex = ref<number>(0)

    const flatChildrenList = ref<columnsType[]>([])

    // 表格数据
    const tableData = ref([]);

    /**
     * @description 计算单元格colspan的占位
     * @param item 单元格一行的值
     * @param index 索引
     * @param columns 当前的单元格配置
     * @return colspan
     */
    function computedTdColspan(item: rowType, index: number, columns: columnsType): number|undefined {
        if (columns.customCell) {

            let colspan: number| undefined = 1

            if(columns.customCell(item, index, columns).colspan ===0){
                colspan = 0
            }

            if(columns.customCell(item, index, columns).colspan){
                colspan = columns.customCell(item, index, columns).colspan
            }

            return colspan
        }

        return 1;
    }

    
    /**
     * @description 计算单元格rowspan的占位
     * @param item 单元格一行的值
     * @param index 索引
     * @param columns 当前的单元格配置
     * @return colspan
     */
    function computedTdRowspan(item: rowType, index: number, columns: columnsType): number|undefined {
        if (columns.customCell) {

            let rowspan: number| undefined = 1

            if(columns.customCell(item, index, columns).rowspan ===0){
                rowspan = 0
            }

            if(columns.customCell(item, index, columns).rowspan){
                rowspan = columns.customCell(item, index, columns).rowspan
            }

            return rowspan
        }

        return 1;
    }

    /**
     * @description 单独rowspan的计算
     * @param columnsItem 单元格的配置
     * @return 单元格的列数 
     */
    function computedHeaderRowSpan(columnsItem:columnsType){
        if(!columnsItem.children){
            return renderHeaderList.value.length
        }

        return 1
    }

    /**
     * @description 单独colSpan的计算
     * @param columnsItem 单元格的配置
     * @return 单元格的列数
     */
    function computedHeaderColSpan(columnsItem:columnsType){
        if(!columnsItem.children){
            return 1
        }
    

        return flatColumnsItemChildren(columnsItem.children).length
    }

    /** 
     * @description 深度遍历扁平化数组获取单元格所占的列数
     * @param columnsItem 单元格的配置
     * @return 返回扁平化后的数组
     */
    function flatColumnsItemChildren(columnsItem:columnsType[]){
        // 深度遍历,扁平化数组
        let node, list = [...columnsItem], nodes = []
        while (node = list.shift()) {
            // 要过滤一下没有prop的，没有prop的列不参与最终的宽度计算
            if(node.prop){
                nodes.push(node)
            }
            node.children && list.unshift(...node.children)
        }

        return nodes

        // 递归会报警告，占内存
        // if(columnsItem.length === 0){
        //     return
        // }

        // columnsItem.forEach((item:columnsType)=>{
        //     if(item.children){
        //         flatColumnsItemChildren(item.children)
        //     }else{
        //         flatChildrenList.value.push(item)
        //     }
        // })

    }



    /**
     * @description 递归扁平化配置数组，得到渲染表头的数组以及横跨的的行数
     * @param columns children
     */
    function handleRenderHeaderList(columns:columnsType[]) {
        // 用于记录深度
        headerIndex.value += 1

       if (renderHeaderList.value.length <= headerIndex.value) {
            renderHeaderList.value.push(columns)
       } else {
            renderHeaderList.value[headerIndex.value] = [...renderHeaderList.value[headerIndex.value],...columns]
       }

       // 用于记录是否重置深度
       let isClearIndex = true

        columns.forEach((item: columnsType) => {
            // 判断是否还有子集
            if (item.children && item.children.length > 0 ) {
                isClearIndex = false
                handleRenderHeaderList(item.children)
            }
        });

        if(isClearIndex){
            headerIndex.value = 0
        }
    }


    function flatChildren(childrenList:columnsType[]){
        if(childrenList.length ===0){
            return
        }
        childrenList?.forEach((col: columnsType) => {
            if(col.children){
                flatChildren(col.children)
            }else{
                renderDataList.value.push(col);
            }
        });
    }



    onBeforeMount(() => {
        renderHeaderList.value.push(props.columns);

        props.columns.forEach((item: columnsType) => {
            // 将二级表头转化一下
            if (item.children && item.children.length > 0 ) {
                handleRenderHeaderList(item.children)
                flatChildren(item.children)
            }else {
                renderDataList.value.push(item);
            }
    
        });

        // handleRenderHeaderList();
    });

    return {
        maxHeaderRowSpan,
        maxHeaderColSpan,
        renderHeaderList,
        tableData,
        renderDataList,
        computedTdColspan,
        computedHeaderRowSpan,
        computedHeaderColSpan,
        computedTdRowspan
    };
}
