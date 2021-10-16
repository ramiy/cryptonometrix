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
        <td :style="'--size: calc(' + item[unit] + ' / ' + maxVal + ')'">
          <span class="tooltip" v-if="item[unit] > 0">
            <strong> {{ item.label }} </strong> <br />
            {{ item[unit].toLocaleString("en-US") }} {{ measurement }}
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
    measurement: String,
    unit: String,
  },
  setup() {
    const chartsCssClasses =
      "charts-css column data-spacing-5 show-labels show-primary-axis show-5-secondary-axes";

    return {
      chartsCssClasses,
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
.charts-css tbody::before {    
  content: '';
  background-image: url(/assets/img/logo.svg);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  opacity: 0.1;
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
