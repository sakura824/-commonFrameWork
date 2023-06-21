<script setup lang="ts">
defineProps({
  style: {
    type: Object,
    default: () => {
      return {
        width: '30px',
        height: '30px',
      }
    }
  },
  iconName: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <svg :style="style">
    <use :xlink:href="`#icon-${iconName}`" :fill="color"></use>
  </svg>
</template>

<style scoped>

</style>
