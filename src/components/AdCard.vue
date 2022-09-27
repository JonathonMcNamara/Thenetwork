<template>

<div class="card ad-card">
<div class="card-body text-dark">
    <h4 class="card-title">{{ad.title}}</h4>
    <img class="card-img-top img-fluid" :src="ad.banner" alt="Title">
</div>
</div>

</template>
<script>
import { computed } from '@vue/reactivity';

import { Ad } from '../models/Ad.js';

export default {
props: {
    ad: {type: Ad, required: true}
},
setup(props) {


      return {
        appState: computed(() => AppState),
        ads: computed(()=> AppState.ads)
      };
}
}
</script>
<style>

img{
  height: 50px;
  width: 50px;
  object-fit: cover;
  object-position: center;
}

</style>