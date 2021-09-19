<template>
  <aside>
    <div class="settings">
      <div>
        <label for="filter-year">Year</label>
        <select
          id="filter-resolution"
          :value="filterYear.value"
          @input="updateYear($event.target.value)"
        >
          <option :value="2020">2020</option>
          <option :value="2021">2021</option>
        </select>
      </div>
      <div>
        <label for="filter-resolution">Resolution</label>
        <select
          id="filter-resolution"
          :value="filterResolution.value"
          @input="updateResolution($event.target.value)"
        >
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
        </select>
      </div>
    </div>

    <ul>
      <li v-for="(item, index) in sidebar" :key="`sidebar-${index}`">
        <div>
          <span class="prefix" v-if="item.prefix"> {{ item.prefix }} </span>
          <span class="label" v-if="item.link">
            <router-link :to="item.link">
              {{ item.label }}
            </router-link>
          </span>
          <span class="label" v-else> {{ item.label }} </span>
          <span class="suffix" v-if="item.suffix"> {{ item.suffix }} </span>
        </div>
        <ul v-if="item.stocks">
          <li v-for="stock in stocks" :key="`sidebar-${item.id}-${stock.id}`">
            <router-link :to="`${item.link}${stock.id}`">
              {{ stock.label }}
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>

<script>
import sidebar from "@/data/sidebar.js";

export default {
  name: "appSidebar",
  inject: [
    "stocks",
    "filterYear",
    "filterResolution",
    "updateYear",
    "updateResolution",
  ],
  data() {
    return {
      sidebar: sidebar,
    };
  },
};
</script>

<style scoped>
aside {
  flex: 0;
  flex-basis: 300px;

  position: sticky;
  height: 100vh;
  top: 0;
  bottom: 0;

  border-right: 1px solid #ddd;
  background-color: #fff;
  overflow: auto;
  user-select: none;
}
aside .settings {
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: calc(var(--gap) * 0.75);
  border-bottom: 1px solid #eee;
}
aside .settings > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
aside label {
  font-weight: bold;
}
aside select {
  width: 60%;
}
aside ul {
  list-style: none;
  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: column;
  gap: 10px;

  line-height: 1.5;
}
aside > ul {
  padding: calc(var(--gap) * 0.75);
}
aside ul > li > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 10px;
  border-radius: 5px;
  transition-duration: 0.3s;
}
aside ul > li > div > span {
  transition-duration: 0.3s;
}
aside ul > li > div > span.label {
  flex: 1;
  font-weight: bold;
}
aside ul > li > div > span.prefix,
aside ul > li > div > span.suffix {
  background-color: #eee;
  border-radius: 5px;
  padding: 0 6px 0 5px;
  font-size: 0.85rem;
}
aside ul > li > div > span.prefix {
  margin-right: 10px;
}
aside ul > li a {
  display: block;
}
aside ul ul {
  margin-bottom: 1rem;
  padding-left: 1rem;
  border-left: 1px solid #ddd;
}

/* Scrollbar */
aside {
  scrollbar-width: auto;
  scrollbar-color: rgba(0, 0, 0, 0.2) #fff;
}
aside::-webkit-scrollbar {
  width: 6px;
}
aside::-webkit-scrollbar-track {
  background-color: #fff;
}
aside::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.2);
}
@media screen and (max-width: 768px) {
  aside {
    height: unset;
    bottom: unset;
    top: unset;
    padding: var(--gap);
    border-right: unset;
  }
}
</style>
