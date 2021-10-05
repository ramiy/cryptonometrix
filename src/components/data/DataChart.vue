<template>
  <table :class="chartsCssClasses">
    <thead>
      <tr>
        <th
          v-for="(label, index) in labels"
          :key="`${id}-chart-label-${index}`"
        >
          {{ label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="`${id}-chart-data-${index}`">
        <th>{{ item.label }}</th>
        <td :style="'--size: calc(' + item.btc + ' / ' + maxVal + ')'">
          <span class="tooltip" v-if="item.btc > 0">
            <strong> {{ item.label }} </strong> <br />
            {{ item.btc.toLocaleString("en-US") }} BTC
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "DataChart",
  props: {
    id: String,
    labels: Array,
    data: Array,
    maxVal: Number,
  },
  data() {
    return {
      chartsCssClasses:
        "charts-css column data-spacing-5 show-labels show-primary-axis show-5-secondary-axes",
    };
  },
};
</script>

<style scoped>
.charts-css {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  aspect-ratio: 5 / 2;
}
.charts-css .data {
  white-space: nowrap;
  overflow: hidden;
  padding: 5px;
}
.charts-css .data,
.charts-css .tooltip,
.charts-css tbody th {
  font-size: 0.8rem;
}
.charts-css tbody td {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.charts-css .tooltip {
  line-height: 1.25;
}
</style>
