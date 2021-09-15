<template>
  <appNav></appNav>
  <appView>
    <appContent></appContent>
    <appSidebar></appSidebar>
  </appView>
</template>

<script>
import appNav from "@/components/layout/appNav.vue";
import appView from "@/components/layout/appView.vue";
import appSidebar from "@/components/layout/appSidebar.vue";
import appContent from "@/components/layout/appContent.vue";
import stocks from "@/data/stocks.js";

export default {
  name: "App",
  components: {
    appNav,
    appView,
    appSidebar,
    appContent,
  },
  provide: {
    stocks: stocks,
  },
};
</script>

<style>
:root {
  --gap: 2rem;
  --nav-size: 60px;
}
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  color: #333;
  font-size: 16px;
}
* {
  box-sizing: border-box;
}
h1 {
  font-size: 2rem;
}
h2 {
  font-size: 1.75rem;
}
h3 {
  font-size: 1.5rem;
}
h4 {
  font-size: 1.25rem;
}
h5 {
  font-size: 1rem;
}
p {
  font-size: 0.85rem;
  margin-top: 0;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-bottom: var(--gap);
}
p {
  margin-bottom: calc(var(--gap) / 2);
  line-height: 1.5;
}
strong {
  font-weight: bold;
}
a {
  text-decoration: none;
  color: #666;
}
a:hover,
a:focus {
  color: #333;
}
img {
  max-width: 100%;
}
table td,
table th {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}
</style>
