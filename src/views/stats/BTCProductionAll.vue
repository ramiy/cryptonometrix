<template>
  <h1>BTC Production</h1>

  <Card heading="BTC Production Chart" :brand="true">
    <DataComparisonChart
      id="btc-production-all-chart"
      link="btc-production"
      :labels="['Period', 'Production (BTC)']"
      :data="itemsForDisplay"
      :maxVal="maxVal"
      measurement="BTC"
      unit="btc"
    ></DataComparisonChart>
  </Card>

  <Card heading="Metric Description">
    <DataMetrics
      id="btc-production-all-description"
      info="The number of bitcoins each company produced."
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
import btcProduction from "@/data/btc-production.js";

export default {
  name: "BTCProductionAll",
  components: {
    Card,
    DataComparisonChart,
    DataMetrics,
  },
  setup() {
    const filterResolution = inject("filterResolution", []);
    let itemsForDisplay = computed(() => {
      return btcProduction.map((item) => {
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
        ...btcProduction.map((item) =>
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
