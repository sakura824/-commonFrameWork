<template>
    <div>
        <form-search v-model="requestParams" :config="formConfig" :tableRef="tableRef">
        </form-search>
        <Table 
        :pageAttrs="pageAttrs" 
        :requestParams="requestParams" 
        :tableColumns="tableColumns" 
        ref="tableRef"
        :requestFn="userList"
        :responseAdapterFn="responseAdapterFn"
        >
            <!-- <template #top>
                <el-button>按钮</el-button>
            </template> -->
            <template #btns = "row">
            <el-button 
            size="small"
            type="primary" 
            icon="Pointer" 
            @click="assignRoles(row)"
            >{{ commonRolesBtn }}</el-button>
            <el-button 
            v-preventReClick
            size="small"
            type="primary" 
            icon="Edit" 
            @click="editInfo(row)"
            >{{ commonEditBtn }}</el-button>
            <el-button 
            size="small"
            type="primary" 
            icon="Delete" 
            @click="deleteInfo(row)"
            >删除</el-button>
          </template>
        </Table>
        <Dialog :title="dialogTitle" ref="dialogRef">
          <div>
            自定义内容
          </div>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults';
import { userList, setUserRole } from '@/api/modules/user'
import { ResponseParams } from '@/interfaces/common'
//组件ref
const tableRef = ref(null)
const dialogRef = ref(null)
//组件相关参数
const requestParams = ref({})
const pageAttrs = ref({
  background: true,
})
const formConfig = reactive([
    {
      type: 'text',
      label: '用户名字',
      key: 'username'
    },
    {
      type: 'buttons',
      value: ['search', 'reset']
    }
])
const responseAdapterFn = (data: any) => {
  return data.records
}
//这样定义类型是为了方便在对象里添加属性时提示框可以直接提示属性名
const tableColumns = reactive<(TableColumnCtx<Record<string, any>>[] | Record<string, any>)>([
    { label: 'ID', prop: 'id' },
    { label: '用户名字', prop: 'username' },
    { label: '用户名称', prop: 'name' },
    { label: '用户角色', prop: 'roleName' },
    { label: '创建时间', prop: 'createTime' },
    { label: '更新时间', prop: 'updateTime' },
    { label: '操作', slot: 'btns', align: "center", width: 270 },
])

//弹窗参数
const dialogTitle = ref('')
//其他参数
const commonRolesBtn = ref('分配角色')
const commonEditBtn = ref('编辑')
//分配角色
const assignRoles = async ({row}: any) => {
  dialogTitle.value = commonRolesBtn.value
  dialogRef.value.open()
  const {code, data}: ResponseParams = await setUserRole(row.id)
  if(code === 200 && data) {

  } 
}
//编辑
const editInfo = (row) => {
  dialogTitle.value = commonEditBtn.value
  dialogRef.value.open()
}
//删除
const deleteInfo = (row) => {
  
  
}
</script>

<style scoped>

</style>