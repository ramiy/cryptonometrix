<template>
  <header>
    <router-link to="/" class="logo">
      <img src="/assets/img/logo.png" alt="Cryptonometrix Logo" loading="eager" />
    </router-link>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  height: var(--nav-size);
  border-bottom: 1px solid #ddd;
  padding: 5px 20px;
  user-select: none;
}
.logo {
  display: flex;
  align-items: center;
}
img {
  height: 75%;
  width: auto;
}
nav {
  display: flex;
  align-items: center;
  justify-content: center;
}
nav a:not(:last-of-type) {
  margin-right: 20px;
}
</style>