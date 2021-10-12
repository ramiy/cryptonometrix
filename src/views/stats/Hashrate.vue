<template>
  <h1>{{ company.label }}: Hashrate</h1>

  <Card heading="Hashrate Chart">
    <DataChart
      :id="`hashrate-chart-${route}`"
      :labels="['Period', 'Hashrate (EH/s)']"
      :data="itemsForDisplay"
      :maxVal="maxVal"
    ></DataChart>
  </Card>

  <Card heading="Production Data">
    <DataTable
      :id="`hashrate-data-${route}`"
      :labels="['Company', 'Period', 'Hashrate (EH/s)', 'Change (%)', 'Notes']"
      :data="itemsForDisplay"
    ></DataTable>
  </Card>

  <Card heading="Metric Description">
    <DataMetrics
      :id="`hashrate-description-${route}`"
      info="The total hashrate the company has."
      :metrics="[
        { name: 'Company', description: company.name },
        { name: 'Asset', description: 'Bitcoin' },
        {
          name: 'Resolution',
          description: filterResolution.value,
          class: 'capitalize',
        },
      ]"
    >
    </DataMetrics>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";
import DataChart from "@/components/data/DataChart.vue";
import DataTable from "@/components/data/DataTable.vue";
import DataMetrics from "@/components/data/DataMetrics.vue";
import Hashrate from "@/data/hashrate.js";

export default {
  name: "Hashrate",
  components: {
    Card,
    DataChart,
    DataTable,
    DataMetrics,
  },
  inject: ["stocks", "filterResolution"],
  data() {
    return {
      items: [],
    };
  },
  computed: {
    route() {
      return this.$route.params.company;
    },
    company() {
      return this.stocks.find((stock) => stock.id === this.route);
    },
    itemsForDisplay() {
      let change = 0;
      let prev = 0;
      return this.items
        .filter((item) => item.type === this.filterResolution.value)
        .map((item) => {
          change =
            prev === 0 || item.hashrate === 0 || isNaN(prev) || isNaN(item.hashrate)
              ? 0
              : (item.hashrate / prev - 1) * 100;
          prev = item.hashrate;
          return {
            company: this.company.label,
            label: this.label(item),
            hashrate: item.hashrate,
            change: parseFloat(change),
            source: item.source,
          };
        });
    },
    maxVal() {
      return Math.max(...this.itemsForDisplay.map((item) => item.hashrate));
    },
  },
  methods: {
    label(item) {
      let label = "";
      if (this.filterResolution.value === "monthly") {
        label = `${item.month}/${item.year}`;
      } else if (this.filterResolution.value === "quarterly") {
        label = `Q${item.quarter} / ${item.year}`;
      }
      return label;
    },
    updateData() {
      const hasCompany = this.route ? true : false;
      const validCompany = this.stocks.some((stock) => stock.id === this.route);
      if (hasCompany && validCompany) {
        this.items = Hashrate.find(
          (item) => item.name === this.route
        ).stats;
      }
    },
  },
  created() {
    this.updateData();
  },
  watch: {
    $route() {
      this.updateData();
    },
  },
};
</script>
