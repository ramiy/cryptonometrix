<template>
  <table class="data-table">
    <thead>
      <tr>
        <th v-for="(label, index) in labels" :key="`${id}-label-${index}`">
          {{ label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="`${id}-data-${index}`">
        <td :data-mobile-label="labels[0]">
          <router-link :to="`/company/${route}`">
            {{ item.company }}
          </router-link>
        </td>
        <td :data-mobile-label="labels[1]">{{ item.label }}</td>
        <td :data-mobile-label="labels[2]">
          <strong v-if="item[unit] != 0">
            {{ item[unit].toLocaleString("en-US") }}
            <small>{{ measurement }}</small>
          </strong>
        </td>
        <td :data-mobile-label="labels[3]">
          <strong
            v-if="item.change != 0"
            :class="{
              'negative-change': item.change < 0,
              'positive-change': item.change > 0,
            }"
          >
            <small v-if="item.change < 0">▼</small>
            <small v-if="item.change > 0">▲</small>
            {{ item.change.toFixed(2) }} <small>%</small>
          </strong>
        </td>
        <td :data-mobile-label="labels[4]">
          <sub v-if="item.source">
            <a :href="item.source" target="_blank"> [source] </a>
          </sub>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "DataTable",
  props: {
    id: String,
    labels: Array,
    data: Array,
    route: String,
    measurement: String,
    unit: String,
  },
};
</script>

<style>
.data-table {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
}
.data-table th {
  text-align: left;
}
.data-table thead {
  background-color: #f6f6f6;
}
.data-table small {
  font-size: smaller;
}
.negative-change {
  color: #dc3545;
}
.positive-change {
  color: #28a745;
}
@media screen and (max-width: 768px) {
  .data-table thead {
    display: none;
  }
  .data-table tbody th,
  .data-table tbody td {
    display: block;
  }
  .data-table tbody td:before {
    content: attr(data-mobile-label);
    display: block;
    width: 45%;
    float: left;
    font-weight: bold;
  }
  .data-table tbody tr:nth-child(even) {
    background-color: #f3f3f3;
  }
}
</style>
