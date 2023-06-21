<template>
    <div>
        <Table 
        row-key="id"
        :pageAttrs="pageAttrs" 
        :requestParams="requestParams" 
        :tableColumns="tableColumns" 
        ref="tableRef"
        :isPaginated="false"
        :requestFn="getPermission"
        >
            <template #btns = "row">
            <el-button 
            size="small"
            type="primary" 
            icon="Pointer" 
            @click="assignRoles(row)"
            >{{ commonRolesBtn }}</el-button>
            <el-button 
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
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { getPermission } from '@/api/modules/user'
//组件相关参数
const requestParams = ref({})
const pageAttrs = ref({
  background: true,
})
//这样定义类型是为了方便在对象里添加属性时提示框可以直接提示属性名
const tableColumns = reactive([
    { label: '名称', prop: 'name' },
    { label: '权限值', prop: 'code' },
    { label: '修改时间', prop: 'updateTime' },
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
}
//编辑
const editInfo = (row) => {
  dialogTitle.value = commonEditBtn.value
}
//删除
const deleteInfo = (row) => {
  
  
}
</script>

<style scoped>

</style>