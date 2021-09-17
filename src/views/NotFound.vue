<template>
  <h1>Page Not Found</h1>

  <Card heading="404 Error">
    <p>
      The page you were looking for was not found.
    </p>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";

export default {
  name: "Not Found",
  components: {
    Card,
  },
};
</script>

<style scoped>
main {
  flex: 1;
  padding: 20px;
  background: rgb(247, 248, 250);
}
</style>
