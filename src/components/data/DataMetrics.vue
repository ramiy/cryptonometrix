<template>
  <div class="metrics">
    <p>{{ info }}</p>
    <dl>
      <template
        v-for="(item, index) in metrics"
        :key="`${id}-metrics-${index}`"
      >
        <dt>{{ item.name }}</dt>
        <dd :class="item.class">{{ item.description }}</dd>
      </template>
    </dl>
  </div>
</template>

<script>
export default {
  name: "DataMetrics",
  props: {
    id: String,
    info: String,
    metrics: Array,
  },
};
</script>

<style>
.metrics dl {
  margin-top: 1rem;
  font-size: 0.85rem;
  line-height: 1.5;
}
.metrics dt {
  font-weight: bold;
}
.metrics dd:not(:last-of-type) {
  margin-bottom: 1rem;
}
.metrics dd.capitalize {
  text-transform: capitalize;
}
</style>
