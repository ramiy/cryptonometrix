<template>
  <main>
    <router-view />
  </main>
</template>

<script>
export default {
  name: "appContent",
};
</script>

<style scoped>
main {
  flex: 1;
  width: 100%;
  max-width: 960px;
  padding: var(--gap);
  margin: 0 auto;
}
</style>