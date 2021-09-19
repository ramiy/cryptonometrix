<template>
  <h1>BTC Production</h1>

  <Card heading="Monthly BTC Production Chart">
    <DataComparisonChart
      id="btc-production-all"
      link="btc-production"
      :labels="['Month', 'BTC Production']"
      :data="itemsForDisplay"
      :maxVal="maxVal"
    ></DataComparisonChart>
  </Card>

  <Card heading="Metric Description">
    <DataMetrics
      id="`btc-hodl-position"
      info="The number of bitcoins each company produced."
      :metrics="[
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
import DataComparisonChart from "@/components/data/DataComparisonChart.vue";
import DataMetrics from "@/components/data/DataMetrics.vue";
import btcProduction from "@/data/btc-production.js";

export default {
  name: "BTCProductionAll",
  components: {
    Card,
    DataComparisonChart,
    DataMetrics,
  },
  inject: ["filterResolution", "filterYear"],
  data() {
    return {
      items: [],
    };
  },
  computed: {
    itemsForDisplay() {
      return this.items.map((item) => {
        return {
          name: item.name,
          stats: item.stats.filter(
            (stat) =>
              stat.type === this.filterResolution.value &&
              stat.year === this.filterYear.value
          ),
        };
      });
    },
    maxVal() {
      let maxValue = 0;
      if (this.filterResolution.value === "monthly") {
        maxValue = 500;
      } else if (this.filterResolution.value === "quarterly") {
        maxValue = 1100;
      }
      return maxValue;
    },
  },
  created() {
    this.items = btcProduction;
  },
};
</script>
