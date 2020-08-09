<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "微軟正黑體", "Microsoft JhengHei", Arial, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
}

.table {
  th {
    text-align: center;
  }

  td {
    text-align: center;
    vertical-align: middle;
  }
}

.icon-green {
  color: #00e000;
}

.icon-red {
  color: red;
}
</style>
