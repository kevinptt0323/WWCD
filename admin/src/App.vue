<template>
  <div id="app">
      <h1>WWCD - ZyXEL Business Cloud</h1>
        <el-menu
             :default-active="activeIndex2"
             class="el-menu-demo"
             mode="horizontal"
             @select="handleSelect"
             background-color="#212121"
             text-color="#fff"
             active-text-color="#ff7b00ff">
            <el-menu-item index="1" @click="payment">金流設定(Payment)</el-menu-item>
            <el-menu-item index="2" @click="density">密度統計(Density)</el-menu-item>
        </el-menu>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
      payment() {
          this.$router.push('Payment')
      },
      density() {
          this.$router.push('Density')
      },
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
