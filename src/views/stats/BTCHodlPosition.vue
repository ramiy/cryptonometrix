<template>
  <h1>
    <router-link :to="`/company/${route}`">{{ company.label }}:</router-link>
    BTC HODL Position
  </h1>

  <Card heading="BTC HODL Position" :brand="true">
    <DataChart
      :id="`btc-hodl-position-chart-${route}`"
      :labels="['Period', 'HODL Position (BTC)']"
      :data="itemsForDisplay"
      :maxVal="maxVal"
      measurement="BTC"
      unit="btc"
    ></DataChart>
  </Card>

  <Card heading="HODL Position Data">
    <DataTable
      :id="`btc-hodl-position-data-${route}`"
      :labels="['Company', 'Period', 'HODL (BTC)', 'Change (%)', 'Notes']"
      :data="itemsForDisplay"
      :route="route"
      measurement="BTC"
      unit="btc"
    ></DataTable>
  </Card>

  <Card heading="Metric Description">
    <DataMetrics
      :id="`btc-hodl-position-description-${route}`"
      info="The number of bitcoins the company held on its balance sheet."
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
import btcHodlPosition from "@/data/btc-hodl-position.js";

export default {
  name: "BTCHodlPosition",
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
        items = btcHodlPosition.find((item) => item.name === route.value).stats;
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
            prev === 0 || item.btc === 0 || isNaN(prev) || isNaN(item.btc)
              ? 0
              : (item.btc / prev - 1) * 100;
          prev = item.btc;
          return {
            company: company.value.label,
            label: chartLabel(item, filterResolution),
            btc: item.btc,
            change: parseFloat(change),
            source: item.source,
          };
        });
    });

    const maxVal = computed(() =>
      Math.max(...itemsForDisplay.value.map((item) => item.btc))
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
