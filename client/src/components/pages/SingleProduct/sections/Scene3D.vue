<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
import * as BABYLON from "@babylonjs/core/Legacy/legacy";
import { GLTFFileLoader } from "@babylonjs/loaders";

export default {
  name: "Scene3D",
  computed: {
    canvas: function() {
      return this.$refs.canvas;
    }
  },
  props: { model: Object, color: String },
  mounted() {
    // Load the 3D engine
    this.canvas.style.width = "100%";
    this.canvas.style.height = "600px";

    this.engine = new BABYLON.Engine(this.canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true
    });
    // call the createScene function
    this.createScene();
    // run the render loop
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
    // the canvas/window resize event handler
    window.addEventListener("resize", () => {
      this.engine.resize();
    });
  },
  destroyed() {
    window.removeEventListener("resize", () => {
      this.engine.resize();
    });
    this.engine.stopRenderLoop();
    this.scene.dispose();
    this.engine.dispose();
  },
  methods: {
    createScene() {
      // Create a basic BJS Scene object
      this.scene = new BABYLON.Scene(this.engine);

      const camera = new BABYLON.ArcRotateCamera(
        "camera2",
        null,
        null,
        0.5,
        new BABYLON.Vector3.Zero(),
        this.scene
      );
      camera.wheelPrecision = 100;
      camera.minZ = 0.01;
      camera.setPosition(new BABYLON.Vector3(0, 0.4, 0.4));

      //camera.panningSensibility = 4000;
      // Target the camera to scene origin
      camera.attachControl(this.canvas, false);
      // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
      var light = new BABYLON.HemisphericLight(
        "light1",
        new BABYLON.Vector3(0, 1, 0),
        this.scene
      );

      BABYLON.SceneLoader.Append(
        this.model.path,
        this.model.file,
        this.scene,
        scene => {
          // do something with the scene
          this.modelMaterials = {};

          this.scene.materials.forEach(el => {
            switch (el.id) {
              case "dynamic_light":
                this.modelMaterials["dynamic_light"] = el;
                break;

              case "dynamic":
                this.modelMaterials["dynamic"] = el;
                break;

              case "default":
                el.albedoColor = new BABYLON.Color3(0.01, 0.01, 0.01);
            }
          });
        }
      );
    }
  },
  watch: {
    color(newVal, oldVal) {
      if(!this.modelMaterials) return;

      const c = hexToRgb(newVal);

      const r = normalize(c.r, 255, 0);
      const g = normalize(c.g, 255, 0);
      const b = normalize(c.b, 255, 0);

      this.modelMaterials["dynamic"].albedoColor = new BABYLON.Color3(r, g, b);

      const lightC = hexToRgb(shadeColor(newVal, -40));

      const lr = normalize(lightC.r, 255, 0);
      const lg = normalize(lightC.g, 255, 0);
      const lb = normalize(lightC.b, 255, 0);

      this.modelMaterials["dynamic_light"].albedoColor = new BABYLON.Color3(
        lr,
        lg,
        lb
      );
    }
  }
};

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}

function normalize(val, max, min) {
  return (val - min) / (max - min);
}

function shadeColor(color, percent) {
  var R = parseInt(color.substring(1, 3), 16);
  var G = parseInt(color.substring(3, 5), 16);
  var B = parseInt(color.substring(5, 7), 16);

  R = parseInt((R * (100 + percent)) / 100);
  G = parseInt((G * (100 + percent)) / 100);
  B = parseInt((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
  var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
  var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

  return "#" + RR + GG + BB;
}
</script>
