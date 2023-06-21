<template>
    <el-card>
        <div>
            <slot name="top"></slot>
        </div>
        <el-table v-bind="$attrs" :data="tableData">
            <TableColumn v-for="colData in tableColumns" :colData="colData">
              <template v-if="colData.slot" #="{row}">
                <slot :name="colData.slot" :row="row"></slot>
              </template>
            </TableColumn>
        </el-table>

        <div v-if="isPaginated" class="page">
          <el-pagination
            v-bind="pageAttrs"
            v-model:current-page="pageNum"
            v-model:page-size="pageSize"
            :layout="layout || pageAttrs.layout"
            :total="totalCount"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            />
        </div>
    </el-card>
</template>

<script setup lang="ts">
import TableColumn from './TableColumn/index.vue'
import { ref, onMounted } from "vue";
import { ResponseParams } from '@/interfaces/common'
//分页layout默认值
const layout = 'sizes, prev, pager, next'

const props = defineProps({
    //表格列配置
    /*[
      { label: '时间', prop: 'date' },
      { label: '姓名', prop: 'name' },
      { label: '地址', prop: 'address' },
    ]
    */
    tableColumns: {
        type: Array<Record<string, any>>,
        default: () => []
    },
    //form搜索参数
    requestParams: {
      type: Object,
      default: () => {}
    },
    //请求接口
    requestFn: {
      type: Function,
      required: true
    },
    //响应适配器函数，用来对响应的数据进行处理，在requestFn请求成功之后调用
    responseAdapterFn: {
      type: Function,
      default: (data: any) => data
    },
     //是否开启分页
     // true：开启，false:关闭
     isPaginated: {
      type: Boolean,
      default: true
    },
    //配置分页属性
    pageAttrs: {
      type: Object,
      default: {}
    },
     //是否开启初始的默认请求
     // true：开启，false:关闭
     isAuto: {
      type: Boolean,
      default: true
    }

})
let tableData = ref<Record<string, any>[]>([])  //列表数据
const totalCount = ref<number | undefined>(0) //  总条数
const pageNum = ref<number>(1)  //当前页
const pageSize = ref<number>(10)  //一页几条

onMounted(async () => {
  await props.isAuto && fetch()
})

//查询
const fetch = async () => {
  let params = {}
  if(props.isPaginated) {
    params = { ...props.requestParams, pageSize: pageSize.value, pageNum: pageNum.value}
  } else {
    params = props.requestParams
  }
  const { code, data, total }: ResponseParams = await props.requestFn(params)
  if(code === 200 && data) {
    if(props.isPaginated) {
      totalCount.value = total || data.total
    }
    tableData.value = props.responseAdapterFn(data).map((item: any) => {
      return item
    })
  } else {
    tableData.value = []
    totalCount.value = 0
  }
}
//抛出供form组件使用
defineExpose({fetch})

const handleSizeChange = (val: number) => {
  pageSize.value = val
  fetch()
}
const handleCurrentChange = (val: number) => {
  pageNum.value = val
  fetch()
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>