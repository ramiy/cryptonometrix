<template>
  <h1>Hashrate</h1>

  <Card heading="Hashrate Chart">
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
import Hashrate from "@/data/hashrate.js";

export default {
  name: "HashrateAll",
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
        ...Hashrate.map((item) =>
          Math.max(
            ...item.stats
              .filter((stat) => stat.type === this.filterResolution.value)
              .map((stats) => stats.hashrate)
          )
        )
      );
    },
  },
  created() {
    this.items = Hashrate;
  },
};
</script>
