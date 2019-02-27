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
  props: { model: Object, selectedMaterial: String },
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
      this.scene.clearColor = new BABYLON.Color3(0.1, 0.1, 0.1);

      const camera = new BABYLON.ArcRotateCamera(
        "camera2",
        null,
        null,
        0.5,
        new BABYLON.Vector3.Zero(),
        this.scene
      );
      camera.wheelPrecision = 200;
      camera.minZ = 0.01;
      camera.setPosition(new BABYLON.Vector3(0.5, 0.3, 0));
      camera.panningSensibility = 2500;
      camera.panningInertia = 0.5;
      camera.lowerRadiusLimit = 0.1;
      camera.upperRadiusLimit = 2;
      camera.useAutoRotationBehavior = true;
      camera.idleRotationSpeed = 15;

      // Target the camera to scene origin
      camera.attachControl(this.canvas, false);

      BABYLON.SceneLoader.Append(
        this.model.path,
        this.model.file,
        this.scene,
        scene => {
          this.mesh = this.scene.meshes.filter(
            mesh => mesh.name === this.model.id
          )[0];

          this.loadHdr();
        },
        evt => {
          if (evt.lengthComputable) {
            this.engine.loadingUIText =
              "Loading, please wait..." +
              ((evt.loaded * 100) / evt.total).toFixed() +
              "%";
          } else {
            let dlCount = evt.loaded / (1024 * 1024);
            this.engine.loadingUIText =
              "Loading, please wait..." +
              Math.floor(dlCount * 100.0) / 100.0 +
              " MB already loaded.";
          }
        }
      );
    },
    loadHdr: function() {
      const hdr = new BABYLON.HDRCubeTexture(
        "/assets/hdr/hall.hdr",
        this.scene,
        512
      );

      this.scene.materials.forEach(mat => {
        mat.reflectionTexture = hdr;
      });
    }
  },
  watch: {
    selectedMaterial(newVal, oldVal) {
      const material = this.scene.materials.filter(
        mat => mat.name === this.selectedMaterial
      )[0];
      this.mesh.material = material;
    }
  }
};
</script>

<style lang="scss">
canvas:focus {
  outline: none;
}
</style>
