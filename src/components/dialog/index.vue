<template>
    <el-dialog
      v-model="dialogVisible"
      v-bind="$attrs"
      :title="title"
      :width="width"
      @close="close"
    >
    <template v-if="$slots.header">
        <slot name='header'></slot>
    </template>
      <slot></slot>
      <template #footer>
        <template v-if="$slots.footer">
            <slot name="footer"></slot>
        </template>
        <template v-else>
            <el-button class="cancel-btn" v-if="showCancelBtn" @click="handleCancel">
            {{ cancelText }}
          </el-button>
          <el-button
            class="confirm"
            v-if="showOkBtn"
            type="primary"
            @click="handleConfirm"
            >{{ okText }}</el-button>

        </template>
      </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps({
    //标题
    title: {
        type: String,
        default: ''
    },
    //dialog宽度
    width: {
        type: String || Number,
        default: '50%'
    },
    //是否显示取消按钮
    showCancelBtn: {
        type: Boolean,
        default: true
    },
    showOkBtn: {
        type: Boolean,
        default: true
    },
    cancelText: {
        type: String,
        default: '取消'
    },
    okText: {
        type: String,
        default: '确定'
    },
    dialogData: {
        type: Object,
        default: () => {}
    }
})
const emit = defineEmits(['confirm', 'cancel'])

const dialogVisible = ref(false)

const handleCancel = () => {
    dialogVisible.value = false
    emit('cancel')
}
const handleConfirm = () => {
    emit('confirm')
}

//抛出供外部使用
const open =() => {
    dialogVisible.value = true
}
const close =() => {
    dialogVisible.value = false
}
defineExpose({open, close})

</script>

<style lang="scss" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>