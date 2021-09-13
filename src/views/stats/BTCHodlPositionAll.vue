<template>
  <h1>BTC HODL Position</h1>

  <Card heading="Monthly BTC HODL Position Chart">
    <DataComparisonChart
      id="btc-hodl-position-all"
      link="btc-hodl-position"
      :labels="['Month', 'BTC HODL Position']"
      :data="items"
      :maxVal="maxVal"
    ></DataComparisonChart>
  </Card>

  <Card heading="Metric Description">
    <DataMetrics
      id="`btc-hodl-position"
      info="The number of bitcoins each company held on its balance sheet."
      :metrics="[
        { name: 'Asset', description: 'Bitcoin' },
        { name: 'Resolution', description: 'Monthly' },
      ]"
    >
    </DataMetrics>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";
import DataComparisonChart from "@/components/data/DataComparisonChart.vue";
import DataMetrics from "@/components/data/DataMetrics.vue";
import stocks from "@/data/stocks.js";
import btcHodlPosition from "@/data/btc-hodl-position.js";

export default {
  name: "BTCHodlPositionAll",
  components: {
    Card,
    DataComparisonChart,
    DataMetrics,
  },
  data() {
    return {
      stocks: stocks,
      items: [],
      maxVal: 7000,
    };
  },
  created() {
    this.items = btcHodlPosition;
  },
};
</script>
