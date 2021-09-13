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
        <td>{{ item.company }}</td>
        <td>{{ item.label }}</td>
        <td>{{ item.btc.toLocaleString("en-US") }}</td>
        <td>
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
</style>
