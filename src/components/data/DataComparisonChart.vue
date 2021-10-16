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
          :style="'--size: calc(' + stock[unit] + ' / ' + maxVal + ')'"
        >
          <span class="tooltip" v-if="stock[unit] > 0">
            <strong> {{ chartLabel(stock, filterResolution) }} </strong> <br />
            {{ stock[unit].toLocaleString("en-US") }} {{ measurement }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { inject } from "vue";
import { chartLabel } from "@/utils";

export default {
  name: "DataComparisonChart",
  props: {
    id: String,
    labels: Array,
    data: Array,
    maxVal: Number,
    link: String,
    measurement: String,
    unit: String,
  },
  setup() {
    const filterResolution = inject("filterResolution", []);
    const chartsCssClasses =
      "charts-css column multiple data-spacing-3 datasets-spacing-1 show-labels show-primary-axis show-5-secondary-axes show-data-axes";

    return {
      filterResolution,
      chartsCssClasses,
      chartLabel,
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
