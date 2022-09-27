<template>

<form @submit.prevent="submitPost()" class="post-form bg-light rounded">
<h3>Create Post</h3>
<div class="row">

    <div class="col-12">
        <label class="form-label" for="title">Title</label>
        <input class="form-control" type="text" minlength="5" id="title" name="title" v-model="editable.title">
    </div>

    <div class="col-12">
        <label class="form-label" for="body">Body</label>
        <input class="form-control" type="text" minlength="5" id="body" name="body" v-model="editable.body">
    </div>

    <div class="col-12">
        <label class="form-label" for="img">Img</label>
        <input class="form-control" type="text" minlength="5" id="img" name="img" v-model="editable.imgUrl">
    </div>

    <div>
        <button class="btn" type="submit">Create Post</button>
    </div>




</div>

</form>




</template>
<script>
import { ref, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
setup() {

const editable = ref({})

watchEffect(()=>{
    editable.value = {...AppState.posts}
})
  return {
    editable,
    async submitPost(){
        try {
        postsService.createPost(editable.value)   
        } catch (error) {
        logger.error('[Creating Post]',error)
        Pop.error(error)    
        }
    
    }
    }
  }
}

</script>
<style>
</style>