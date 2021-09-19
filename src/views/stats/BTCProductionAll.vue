<template>
  <h1>BTC Production</h1>

  <Card heading="Monthly BTC Production Chart">
    <DataComparisonChart
      id="btc-production-all"
      link="btc-production"
      :labels="['Month', 'BTC Production']"
      :data="items"
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
      maxVal: 500,
    };
  },
  created() {
    this.items = btcProduction.map((item) => {
      return {
        name: item.name,
        stats: item.stats.filter(
          (stats) =>
            stats.type === this.filterResolution.value &&
            stats.year === this.filterYear.value
        ),
      };
    });
  },
};
</script>
