<template>

<div class="search-users px-2">
    <form @submit.prevent="searchPosts">
    <div class="col-4 input-group">
        <input class="form-control" type="text" required v-model="query"/><button type="submit" class="btn btn-light"><i class="mdi mdi-magnify"></i></button>
    </div>
    </form>
</div>




</template>
<script>
import { profilesService } from '../services/ProfilesService.js';
import { logger } from '../utils/Logger.js';
import { ref } from 'vue';
import Pop from '../utils/Pop.js';

export default {
    setup() {
    const query = ref('')
  
  
  return {
    query,
    async searchPosts(){
        try {
        await profilesService.searchPosts(query.value)   
        } catch (error) {
        logger.error('[Searching Users]',error)    
        Pop.error(error)
        }
    }
  }
}
}
</script>
<style>
</style>