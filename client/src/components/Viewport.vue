<template>
  <div id="viewport"></div>
</template>

<script lang="ts">
let camera: THREE.Camera, scene: THREE.Scene, renderer: THREE.WebGLRenderer, controls: OrbitControls;
let gridHelper, axesHelper, pointLightHelper;
let pointlight, ambientlight;
let geometry, material, cube;

import Vue from 'vue';

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import Stats from "three/examples/jsm/libs/stats.module";
const stats = Stats();
export default Vue.extend({
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    /** Initializes config.js viewport on element (id=viewport). */
    init(): void {
      const container = document.getElementById('viewport')!;
      // TODO log results
      camera = new THREE.PerspectiveCamera(90,container.clientWidth/container.clientHeight,0.1,1000);
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x3C3C3C);
      camera.position.set(50, 50, 50);
      renderer = new THREE.WebGLRenderer()

      container.appendChild(renderer.domElement);

      renderer.setPixelRatio(1.0);
      renderer.setSize(container.clientWidth, container.clientHeight);

      ambientlight = new THREE.AmbientLight(0xffffff);
      pointlight = new THREE.PointLight(0xffffff);

      geometry = new THREE.BoxGeometry(10, 20, 30);
      material = new THREE.MeshPhongMaterial({color: 0x0000AA});
      cube = new THREE.Mesh(geometry, material);

      controls = new OrbitControls(camera, renderer.domElement);
      gridHelper = new THREE.GridHelper(100, 25);
      axesHelper = new THREE.AxesHelper(5);
      pointLightHelper = new THREE.PointLightHelper(pointlight, 5);

      scene.add(pointlight);
      scene.add(ambientlight);
      scene.add(cube);
      scene.add(pointlight);
      scene.add(ambientlight)
      scene.add(gridHelper);
      scene.add(axesHelper);
      scene.add(pointLightHelper);

      document.body.appendChild(stats.dom);
      this.animate();
    },
    animate(): void {
      requestAnimationFrame(this.animate)
      controls.update();
      stats.update();
      renderer.render(scene, camera);
    }
  },
});
</script>

<style>
#viewport{
  width: 100%;
  height: 100%;
}
</style>
