<template>
  <h1>
    <router-link :to="`/company/${route}`">{{ company.label }}:</router-link>
    Hashrate
  </h1>

  <Card heading="Hashrate Chart" :brand="true">
    <DataChart
      :id="`hashrate-chart-${route}`"
      :labels="['Period', 'Hashrate (EH/s)']"
      :data="itemsForDisplay"
      :maxVal="maxVal"
      measurement="Eh/s"
      unit="hashrate"
    ></DataChart>
  </Card>

  <Card heading="Production Data">
    <DataTable
      :id="`hashrate-data-${route}`"
      :labels="['Company', 'Period', 'Hashrate (EH/s)', 'Change (%)', 'Notes']"
      :data="itemsForDisplay"
      :route="route"
      measurement="Eh/s"
      unit="hashrate"
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
          description: filterResolution,
          class: 'capitalize',
        },
      ]"
    >
    </DataMetrics>
  </Card>
</template>

<script>
import { inject, reactive, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { chartLabel } from "@/utils";
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
  setup() {
    const stocks = inject("stocks", []);
    const filterResolution = inject("filterResolution", []);

    const router = useRoute();
    const route = computed(() => router.params.company);

    const company = computed(() =>
      stocks.find((stock) => stock.id === route.value)
    );

    let items = reactive([]);

    const updateData = () => {
      const hasCompany = route.value ? true : false;
      const validCompany = stocks.some((stock) => stock.id === route.value);
      if (hasCompany && validCompany) {
        items = Hashrate.find((item) => item.name === route.value).stats;
      }
    };
    updateData();
    watch(route, () => updateData());

    const itemsForDisplay = computed(() => {
      let change = 0;
      let prev = 0;
      return items
        .filter((item) => item.type === filterResolution.value)
        .map((item) => {
          change =
            prev === 0 || item.hashrate === 0 || isNaN(prev) || isNaN(item.hashrate)
              ? 0
              : (item.hashrate / prev - 1) * 100;
          prev = item.hashrate;
          return {
            company: company.value.label,
            label: chartLabel(item, filterResolution),
            hashrate: item.hashrate,
            change: parseFloat(change),
            source: item.source,
          };
        });
    });

    const maxVal = computed(() =>
      Math.max(...itemsForDisplay.value.map((item) => item.hashrate))
    );

    return {
      filterResolution,
      route,
      company,
      itemsForDisplay,
      maxVal,
    };
  },
};
</script>
