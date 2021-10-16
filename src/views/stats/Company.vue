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
    <br>
    <p><router-link :to="`/btc-production/${route}`">See the full BTC production report</router-link></p>
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
    <br>
    <p><router-link :to="`/btc-hodl-position/${route}`">See the full BTC hodl position report</router-link></p>
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
    <br>
    <p><router-link :to="`/hashrate/${route}`">See the full hashrate report</router-link></p>
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
  inject: ["stocks", "filterResolution"],
  data() {
    return {
      itemsProduction: [],
      itemsHodlPosition: [],
      itemsHashrate: [],
    };
  },
  computed: {
    route() {
      return this.$route.params.company;
    },
    company() {
      return this.stocks.find((stock) => stock.id === this.route);
    },
    productionItemsForDisplay() {
      return this.itemsProduction.map((item) => ({
        company: this.company.label,
        label: this.label(item),
        btc: item.btc,
      }));
    },
    hodlPositionItemsForDisplay() {
      return this.itemsHodlPosition.map((item) => ({
        company: this.company.label,
        label: this.label(item),
        btc: item.btc,
      }));
    },
    hashrateItemsForDisplay() {
      return this.itemsHashrate.map((item) => ({
        company: this.company.label,
        label: this.label(item),
        hashrate: item.hashrate,
      }));
    },
    maxValProduction() {
      return Math.max(...this.itemsProduction.map((item) => item.btc));
    },
    maxValHodlPosition() {
      return Math.max(...this.itemsHodlPosition.map((item) => item.btc));
    },
    maxValHashrate() {
      return Math.max(...this.itemsHashrate.map((item) => item.hashrate));
    },
  },
  methods: {
    label(item) {
      let label = "";
      if (this.filterResolution.value === "monthly") {
        label = `${item.month}/${item.year}`;
      } else if (this.filterResolution.value === "quarterly") {
        label = `Q${item.quarter} / ${item.year}`;
      }
      return label;
    },
    updateProductionData() {
      const hasCompany = this.route ? true : false;
      const validCompany = this.stocks.some((stock) => stock.id === this.route);
      if (hasCompany && validCompany) {
        this.itemsProduction = btcProduction
          .find((item) => item.name === this.route)
          .stats.filter((item) => item.type === this.filterResolution.value);
      }
    },
    updateHodlPositionData() {
      const hasCompany = this.route ? true : false;
      const validCompany = this.stocks.some((stock) => stock.id === this.route);
      if (hasCompany && validCompany) {
        this.itemsHodlPosition = btcHodlPosition
          .find((item) => item.name === this.route)
          .stats.filter((item) => item.type === this.filterResolution.value);
      }
    },
    updateHashrateData() {
      const hasCompany = this.route ? true : false;
      const validCompany = this.stocks.some((stock) => stock.id === this.route);
      if (hasCompany && validCompany) {
        this.itemsHashrate = btcHashrate
          .find((item) => item.name === this.route)
          .stats.filter((item) => item.type === this.filterResolution.value);
      }
    },
  },
  created() {
    this.updateProductionData();
    this.updateHodlPositionData();
    this.updateHashrateData();
  },
  watch: {
    $route() {
      this.updateProductionData();
      this.updateHodlPositionData();
      this.updateHashrateData();
    },
    filterResolution: {
      handler() {
        this.updateProductionData();
        this.updateHodlPositionData();
        this.updateHashrateData();
      },
      deep: true
    },
  },
};
</script>
