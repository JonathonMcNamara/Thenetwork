<template>
<div class="container">
  <div class="row">
    <div class=" offset-3 col-6">
      <PostForm/>
    </div>
  </div>
</div>
<div class="container">
  <div class="row">
    <div class=" offset-3 col-6" v-for="p in posts" :key="p.id">
      <PostCard :post="p"/>
    </div>
  </div>
  <div class="row">
    <div class="offset-3 col-2"><button @click="changePage(previousPage)" :disabled="!previousPage" class="btn btn-light">Previous</button></div>
    <div class="offset-3 col-2"><button @click="changePage(nextPage)" class="btn btn-light" :disabled="!nextPage" >Next</button></div>
  </div>
</div>

</template>
<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import PostForm from '../components/PostForm.vue';

export default {
    setup() {
        onMounted(async () => {
            try {
            await postsService.getPosts();
            }
            catch (error) {
                logger.error("[Getting Posts]", error);
                Pop.error(error);
            }
        });
        return {
            posts: computed(() => AppState.posts),
            nextPage: computed(() => AppState.nextPage),
            previousPage: computed(() => AppState.previousPage),
            async changePage(url) {
                await postsService.changePage(url)
            },
            async createPost() {
                await postsService.createPost()
            }
        }
    },
    components: { PostForm }
}
</script>
<style>
</style>