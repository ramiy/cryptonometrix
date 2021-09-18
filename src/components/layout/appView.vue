<template>
  <div class="view">
    <slot></slot>
  </div>
</template>

<style scoped>
.view {
  display: flex;
  flex-direction: row-reverse;
  background-color: rgb(247, 248, 250);
}
@media screen and (max-width: 768px) {
  .view {
    display: block;
  }
}
</style>
