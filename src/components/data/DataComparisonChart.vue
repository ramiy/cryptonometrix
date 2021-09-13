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
        <th>
          <router-link :to="`/${link}/${item.name}`">
            {{ item.name }}
          </router-link>
        </th>

        <td
          v-for="(stock, stockIndex) in item.stats"
          :key="`${id}-chart-data-${index}-${stockIndex}`"
          :style="'--size: calc(' + stock.btc + ' / ' + maxVal + ')'"
        >
          <span class="tooltip" v-if="stock.btc > 0">
            <strong> {{ stock.month }}/{{ stock.year }}: </strong>
            {{ stock.btc.toLocaleString("en-US") }} BTC
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "DataComparisonChart",
  props: {
    id: String,
    labels: Array,
    data: Array,
    maxVal: Number,
    link: String,
  },
  data() {
    return {
      chartsCssClasses:
        "charts-css column multiple data-spacing-3 datasets-spacing-1 show-labels show-primary-axis show-5-secondary-axes show-data-axes",
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
.charts-css tbody th {
  font-size: 0.8rem;
}
.charts-css tbody td {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
</style>
