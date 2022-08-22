<template>
  <header>
    <Navbar />
  </header>
  <main>
<div class="container">
  <div class="row">
    <div class="col-10"><router-view /></div>
    <div class="col-2 text-center">
      <div class="right-bar bg-dark">
        <div class="flex-column justify-content-between h-100">
          ads in here
        </div>
      </div>
    </div>
  </div>
</div>
</main>
</template>

<script>
import { computed } from 'vue';
import { AppState } from './AppState';

export default {
    name: "App",
    setup() {
        return {
            appState: computed(() => AppState)
        };
    },
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.right-bar{
  height: 100vh;
  width: 200px;
}


</style>
