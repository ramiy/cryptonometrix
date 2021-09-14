<template>
  <aside>
    <ul>
      <li v-for="(item, index) in nav" :key="`sidebar-${index}`">
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
import stocks from "@/data/stocks.js";

export default {
  data() {
    return {
      stocks: stocks,
      nav: [
        {
          id: "sidebar-btc-production",
          label: "BTC Production",
          link: "/btc-production/",
          suffix: "New",
          stocks: true,
        },
        {
          id: "sidebar-btc-hodl-position",
          label: "BTC HODL Position",
          link: "/btc-hodl-position/",
          suffix: "New",
          stocks: true,
        },
        {
          id: "sidebar-hashrate",
          label: "Hashrate",
          suffix: "Soon",
        },
        {
          id: "sidebar-market-cap",
          label: "Market Cap",
          suffix: "Soon",
        },
        {
          id: "sidebar-number-of-shares",
          label: "Number of Shares",
          suffix: "Soon",
        },
      ],
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

  padding: calc( var(--gap) * 0.33);
  border-right: 1px solid #ddd;
  background-color: #fff;
  overflow: auto;
  user-select: none;
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
aside ul > li > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
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
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-left: 1rem;
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
