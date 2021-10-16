<template>
  <h1>Hashrate</h1>

  <Card heading="Hashrate Chart" :brand="true">
    <DataComparisonChart
      id="hashrate-all-chart"
      link="hashrate"
      :labels="['Period', 'Hashrate (EH/s)']"
      :data="itemsForDisplay"
      :maxVal="maxVal"
      measurement="Eh/s"
      unit="hashrate"
    ></DataComparisonChart>
  </Card>

  <Card heading="Metric Description">
    <DataMetrics
      id="hashrate-all-description"
      info="The total hashrate each company has."
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
import Hashrate from "@/data/hashrate.js";

export default {
  name: "HashrateAll",
  components: {
    Card,
    DataComparisonChart,
    DataMetrics,
  },
  setup() {
    const filterResolution = inject("filterResolution", []);
    let itemsForDisplay = computed(() => {
      return Hashrate.map((item) => {
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
        ...Hashrate.map((item) =>
          Math.max(
            ...item.stats
              .filter((stat) => stat.type === filterResolution.value)
              .map((stats) => stats.hashrate)
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
