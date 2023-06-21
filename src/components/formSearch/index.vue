<template>
        <el-card class="box">
            <el-form :model="formModel" :inline="true" class="form" v-bind="$attrs">

                <template v-for="item in props.config">
                    <template v-if="item.type === 'slot'">
                        <slot :name="item.key" :slotItem="item" :model="formModel" :slotKey="item.key"></slot>
                    </template>
                    <template v-else-if="item.type === 'buttons'">
                        <template v-for="(btnItem, btnIndex) in item.value">
                            <el-button 
                            :key="'search' + btnIndex" 
                            v-if="btnItem === 'search'" 
                            type="primary" 
                            icon="Search" 
                            @click="search"
                            >搜索</el-button>
                            <el-button 
                            :key="'reset' + btnIndex" 
                            v-else-if="btnItem === 'reset'" 
                            type="primary" 
                            plain
                            icon="Refresh" 
                            @click="reset"
                            >重置</el-button>
                        </template>
                        <!-- 自定义 -->
                        <slot></slot>
                    </template>
                    <el-form-item v-else class="form-item" :label="item.label">
                        <!-- 普通输入框 -->
                        <template v-if="item.type === 'text'">
                            <el-input class="form-item-component" v-bind="item.props" :placeholder="`请输入${item.label}`" v-model.trim="formModel[item.key]"></el-input>
                        </template>
                        <!-- 时间搜索 -->
                        <template v-else-if="item.type === 'date'">
                          <el-date-picker
                            class="form-item-component"
                            v-model="formModel[item.key]"
                            v-bind="item.props"
                          >
                          </el-date-picker>
                        </template>
                        <!-- 下拉框 -->
                        <template v-else-if="item.type === 'select'">
                          <el-select class="form-item-component" v-model="formModel[item.key]" v-bind="item.props" :placeholder="`请选择${item.label}`">
                            <el-option
                              v-for="option in item.options"
                              :key="option.value"
                              :label="option.label"
                              :value="option.value"
                            >
                            </el-option>
                          </el-select>
                        </template>
                        <!-- 自定义 -->
                        <slot
                          v-else-if="item.type === 'slot'"
                          :name="item.key"
                          :model="formModel"
                          :slotKey="item.key"
                        ></slot>
                    </el-form-item>
                </template>
            </el-form>
        </el-card>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { FormConfigItem } from '@/interfaces/componentIntefaces';

//初始化form数据
const defaultValue: Record<string, string> = {
  text: '',
  date: '',
  select: '',
  slot: ''
}

const props = defineProps({
    // 查询数据
    config: {
        type: Array<FormConfigItem>,
            required: true
        },
    // 关联table的ref
    tableRef: null,
    //是否自动查询
    autoFetch: {
        type: Boolean,
        default: true
    },
    //v-model绑定的值
    modelValue: {
      type: Object,
      default: () => {}
    },

})
const emit = defineEmits(['search', 'reset', 'update:modelValue'])
// const emit = defineEmits<{
//   (event: 'search', row: Record<string, any>): void;
//   (event: 'reset', row: Record<string, any>): void;
//   (event: 'update:modelValue', value: Record<string, any>): void
// }>()

const formModel: Record<string, any> = reactive({})
const resetFormModel: Record<string, any> = reactive({})

onMounted(() => {
    init()    
})
//初始化
const init = async () => {
    props.config.forEach((el: FormConfigItem) => {
        if(el.type !== 'buttons') {
            formModel[el.key] = props.modelValue[el.key] || defaultValue[el.type]
            resetFormModel[el.key] = el.resetValue || defaultValue[el.type]
        }
    });
    emit('update:modelValue', formModel)
}
//查询事件
const tableFetch = () => {
    if(props.autoFetch && props.tableRef) {
        props.tableRef.fetch()
    }
}
//搜索
const search = () => {
    tableFetch()
    emit('search', formModel)
}
//重置
const reset = () => {
    Object.keys(formModel).forEach(item => {
        formModel[item] = resetFormModel[item]
    })
    tableFetch()
    emit('reset', formModel)
}
</script>

<style lang="scss" scoped>
.box {
    margin-bottom: 20px;
    .form {
    &-item {
        &-component {
            width: 280px;
            max-width: 100%;
        }
    }
}
}

.el-form--inline .el-form-item {
    margin-bottom: 0px;
    margin: 10px;
}
</style>