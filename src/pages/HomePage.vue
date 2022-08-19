<template>
.<div class="container d-flex justify-content-center">
  <div class="row">
    <div class="col-4" v-for="p in posts" :key="p.id">
      <PostCard :post="p"/>
    </div>
  </div>
</div>

</template>
<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { Post } from '../models/Post.js';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {

setup() {
    onMounted(async ()=>{
      try {
      await postsService.getPosts()  
      } catch (error) {
      logger.error('[Getting Posts]',error)
      Pop.error(error) 
      }
    })
  return {
    posts: computed(()=> AppState.posts),
  };
}
}
</script>
<style>
</style>