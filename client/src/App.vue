<template>
  <div id="app">
    <Header/>

    <router-view></router-view>

    <Footer/>
  </div>
</template>

<script>
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans|Roboto");

* {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.btn {
  background: none;
  border: none;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

header {
  background: #333;
  padding: 0.8rem 0.5rem;

  h1 {
    margin: 0;
    color: #eee;
    font-weight: 400;
  }
}

.container {
  margin: auto;
  width: 80%;
}
</style>
