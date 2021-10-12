<template>
  <h1>BTC HODL Position</h1>

  <Card heading="BTC HODL Position Chart">
    <DataComparisonChart
      id="btc-hodl-position-all-chart"
      link="btc-hodl-position"
      :labels="['Period', 'HODL Position (BTC)']"
      :data="itemsForDisplay"
      :maxVal="maxVal"
    ></DataComparisonChart>
  </Card>

  <Card heading="Metric Description">
    <DataMetrics
      id="btc-hodl-position-all-description"
      info="The number of bitcoins each company held on its balance sheet."
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
import btcHodlPosition from "@/data/btc-hodl-position.js";

export default {
  name: "BTCHodlPositionAll",
  components: {
    Card,
    DataComparisonChart,
    DataMetrics,
  },
  inject: ["filterResolution"],
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
            (stat) => stat.type === this.filterResolution.value
          ),
        };
      });
    },
    maxVal() {
      return Math.max(
        ...btcHodlPosition.map((item) =>
          Math.max(...item.stats.map((stats) => stats.btc))
        )
      );
    },
  },
  created() {
    this.items = btcHodlPosition;
  },
};
</script>
