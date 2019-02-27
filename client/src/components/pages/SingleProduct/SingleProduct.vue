<template>
  <main class="container">
    <Scene3D class="scene" :model="model" :selectedMaterial="selectedMaterial"/>
    <h2 class="title">{{model.name}}</h2>
    <div class="color-selector">
      <p>Choose your color:</p>
      <ul class="colors">
        <li
          v-for="(color, key) in model.materials"
          :key="key"
          :style="`background: ${color}`"
          @click="() => selectedMaterial = key"
        ></li>
      </ul>
    </div>
  </main>
</template>

<script>
import Scene3D from "./sections/Scene3D";

import models from "../../../models.json";

export default {
  name: "SingleProduct",
  data() {
    return {
      selectedMaterial: null
    };
  },
  components: {
    Scene3D
  },
  computed: {
    model: function() {
      return models[this.$route.params.id];
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  margin-top: 1.2rem;

  -webkit-box-shadow: 5px 5px 30px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 5px 5px 30px 0px rgba(0, 0, 0, 0.2);
  box-shadow: 5px 5px 30px 0px rgba(0, 0, 0, 0.2);

  grid-template-columns: 500px auto;
  grid-template-rows: 80px auto;
  grid-template-areas:
    "scene title"
    "scene colors";

  .scene {
    grid-area: scene;
  }

  .title {
    margin: 0;
    height: 100%;
    display: flex;
    align-items: center;
    grid-area: title;
    font-size: 3rem;
    margin-left: 1rem;
  }

  .color-selector {
    grid-area: colors;
    display: flex;
    flex-direction: column;

    p {
      font-size: 1.5rem;
      color: #555;
      margin: 0 0 1rem 1rem;
    }

    .colors {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      flex-grow: 1;

      li {
        transition: 0.3s;

        &:hover {
          -webkit-box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.75);
          -moz-box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.75);
          box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.75);
          z-index: 9998;
          transform: scale(1.05);
          transition: 0.2s;
          cursor: pointer;
        }
      }
    }
  }
}
</style>


