<template>
  <h1>BTC HODL Position</h1>

  <Card heading="BTC HODL Position Chart" :brand="true">
    <DataComparisonChart
      id="btc-hodl-position-all-chart"
      link="btc-hodl-position"
      :labels="['Period', 'HODL Position (BTC)']"
      :data="itemsForDisplay"
      :maxVal="maxVal"
      measurement="BTC"
      unit="btc"
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
          description: filterResolution,
          class: 'capitalize',
        },
      ]"
    >
    </DataMetrics>
  </Card>
</template>

<script>
import { inject, computed } from "vue";
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
  setup() {
    const filterResolution = inject("filterResolution", []);
    let itemsForDisplay = computed(() => {
      return btcHodlPosition.map((item) => {
        return {
          name: item.name,
          stats: item.stats.filter(
            (stat) => stat.type === filterResolution.value
          ),
        };
      });
    });
    let maxVal = computed(() => {
      return Math.max(
        ...btcHodlPosition.map((item) =>
          Math.max(
            ...item.stats
              .filter((stat) => stat.type === filterResolution.value)
              .map((stats) => stats.btc)
          )
        )
      );
    });

    return {
      filterResolution,
      itemsForDisplay,
      maxVal,
    };
  },
};
</script>
