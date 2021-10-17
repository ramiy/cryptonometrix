<template>
  <h1>{{ company.label }}</h1>

  <Card heading="BTC Production" :brand="true">
    <DataChart
      :id="`btc-production-${route}`"
      :labels="['Period', 'BTC Production']"
      :data="productionItemsForDisplay"
      :maxVal="maxValProduction"
      measurement="BTC"
      unit="btc"
    ></DataChart>
    <br />
    <p>
      <router-link :to="`/btc-production/${route}`">
        See the full BTC production report
      </router-link>
    </p>
  </Card>

  <Card heading="BTC HODL Position" :brand="true">
    <DataChart
      :id="`btc-hodl-position-${route}`"
      :labels="['Period', 'BTC HODL Position']"
      :data="hodlPositionItemsForDisplay"
      :maxVal="maxValHodlPosition"
      measurement="BTC"
      unit="btc"
    ></DataChart>
    <br />
    <p>
      <router-link :to="`/btc-hodl-position/${route}`">
        See the full BTC hodl position report
      </router-link>
    </p>
  </Card>

  <Card heading="Hashrate" :brand="true">
    <DataChart
      :id="`hashrate-${route}`"
      :labels="['Period', 'Hashrate']"
      :data="hashrateItemsForDisplay"
      :maxVal="maxValHashrate"
      measurement="EH/s"
      unit="hashrate"
    ></DataChart>
    <br />
    <p>
      <router-link :to="`/hashrate/${route}`">
        See the full hashrate report
      </router-link>
    </p>
  </Card>

  <Card heading="Metric Description">
    <DataMetrics
      :id="`btc-production-${route}`"
      info="Information about the company."
      :metrics="[
        { name: 'Company', description: company.name },
        { name: 'Website', description: company.website },
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
import DataMetrics from "@/components/data/DataMetrics.vue";
import btcProduction from "@/data/btc-production.js";
import btcHodlPosition from "@/data/btc-hodl-position.js";
import btcHashrate from "@/data/hashrate.js";

export default {
  name: "Company",
  components: {
    Card,
    DataChart,
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

    let itemsProduction = reactive({ data: [] });
    const updateProductionData = () => {
      const hasCompany = route.value ? true : false;
      const validCompany = stocks.some((stock) => stock.id === route.value);
      if (hasCompany && validCompany) {
        itemsProduction.data = btcProduction
          .find((item) => item.name === route.value)
          .stats.filter((item) => item.type === filterResolution.value);
      }
    };

    let itemsHodlPosition = reactive({ data: [] });
    const updateHodlPositionData = () => {
      const hasCompany = route.value ? true : false;
      const validCompany = stocks.some((stock) => stock.id === route.value);
      if (hasCompany && validCompany) {
        itemsHodlPosition.data = btcHodlPosition
          .find((item) => item.name === route.value)
          .stats.filter((item) => item.type === filterResolution.value);
      }
    };

    let itemsHashrate = reactive({ data: [] });
    const updateHashrateData = () => {
      const hasCompany = route.value ? true : false;
      const validCompany = stocks.some((stock) => stock.id === route.value);
      if (hasCompany && validCompany) {
        itemsHashrate.data = btcHashrate
          .find((item) => item.name === route.value)
          .stats.filter((item) => item.type === filterResolution.value);
      }
    };

    updateProductionData();
    updateHodlPositionData();
    updateHashrateData();

    watch(
      route,
      () => {
        updateProductionData();
        updateHodlPositionData();
        updateHashrateData();
      },
      { deep: true }
    );
    watch(
      filterResolution,
      () => {
        updateProductionData();
        updateHodlPositionData();
        updateHashrateData();
      },
      { deep: true }
    );

    const productionItemsForDisplay = computed(() =>
      itemsProduction.data
        .filter((item) => item.type === filterResolution.value)
        .map((item) => ({
          company: company.value.label,
          label: chartLabel(item, filterResolution),
          btc: item.btc,
        }))
    );
    const hodlPositionItemsForDisplay = computed(() =>
      itemsHodlPosition.data
        .filter((item) => item.type === filterResolution.value)
        .map((item) => ({
          company: company.value.label,
          label: chartLabel(item, filterResolution),
          btc: item.btc,
        }))
    );
    const hashrateItemsForDisplay = computed(() =>
      itemsHashrate.data
        .filter((item) => item.type === filterResolution.value)
        .map((item) => ({
          company: company.value.label,
          label: chartLabel(item, filterResolution),
          hashrate: item.hashrate,
        }))
    );

    const maxValProduction = computed(() =>
      Math.max(...itemsProduction.data.map((item) => item.btc))
    );
    const maxValHodlPosition = computed(() =>
      Math.max(...itemsHodlPosition.data.map((item) => item.btc))
    );
    const maxValHashrate = computed(() =>
      Math.max(...itemsHashrate.data.map((item) => item.hashrate))
    );

    return {
      filterResolution,
      route,
      company,
      productionItemsForDisplay,
      hodlPositionItemsForDisplay,
      hashrateItemsForDisplay,
      maxValProduction,
      maxValHodlPosition,
      maxValHashrate,
    };
  },
};
</script>
