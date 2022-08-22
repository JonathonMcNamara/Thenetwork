<template>
  <header>
    <Navbar />
  </header>
<main class="container">

<div class="row container-fluid">
  <div class="offset-2 col-12 col-md-8"><router-view/></div>
  <div class="col-2">
    <div class= "right-bar">
      <div class="flex-column h-50" v-for="a in ads" :key="a.id">
      <AdCard :ad="a"/>
      </div>
    </div>
  </div>
  </div>
</main>
</template>

<script>

import AdCard from './components/AdCard.vue';
import { adsService } from './services/AdsService.js';
import { computed, onMounted } from 'vue';
import { logger } from './utils/Logger.js';
import { AppState } from './AppState.js';

export default {
    name: "App",
    setup() {

    onMounted(async () => {
      try {
      await adsService.getAds()
      } catch (error) {
      logger.error('[Getting ads]',error) 
      }
    })
    return {
      ads: computed(()=> AppState.ads)
    }

    },
    components: { AdCard }
    
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.right-bar{
  height: 100vh;
  width: 200px;
  margin-right: 0;
}




</style>
