<template>
  <main class="container">
    <h1>
      Configurator
      <span>3D</span>
    </h1>
    <ul>
      <li v-for="(model, key) in models" :key="key">
        <router-link class="btn-model" :to="`/product/${key}`">{{model.name}}</router-link>
      </li>
    </ul>
  </main>
</template>

<script>
import models from "../../../models.json";

export default {
  name: "Home",
  data() {
    return {
      models
    };
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    float: left;
    line-height: 40px;
    margin: 0;
    font-size: 3rem;

    span {
      color: #5a8ab9;
    }
  }

  ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 4rem;
    width: 60%;
    justify-items: center;

    .btn-model {
      text-decoration: none;
      padding: 0.4rem 1rem;
      font-size: 1.5rem;
      border: #5a8ab9 1.5px solid;
      color: #5a8ab9;
      font-weight: 500;
      border-radius: 3px;
      transition: 0.3s;

      &:hover {
        background: #5a8ab9;
        color: #eee;
        transition: 0.3s;
        cursor: pointer;
      }
    }
  }
}
</style>

