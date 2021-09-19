<template>
  <h1>BTC HODL Position</h1>

  <Card heading="Monthly BTC HODL Position Chart">
    <DataComparisonChart
      id="btc-hodl-position-all"
      link="btc-hodl-position"
      :labels="['Month', 'BTC HODL Position']"
      :data="itemsForDisplay"
      :maxVal="maxVal"
    ></DataComparisonChart>
  </Card>

  <Card heading="Metric Description">
    <DataMetrics
      id="`btc-hodl-position"
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
        maxValue = 7000;
      } else if (this.filterResolution.value === "quarterly") {
        maxValue = 20000;
      }
      return maxValue;
    },

  },
  created() {
    this.items = btcHodlPosition;
  },
};
</script>
