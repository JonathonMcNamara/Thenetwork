<template>
<div class="post-card card mt-5 w-100">
    <div class="card-body">
        <div class="container">
            <div class="row">
                <router-link :to="{name: 'Profile', params: {profileId: post.creator.id }}">
                <div class="col-1 px-2"><img class="profilepic" :src="post.creator.picture" alt=""></div>
                </router-link>
                <div class="col-md-6 text-start " >{{post.creator.name}} <i v-if="post.creator.graduated" class="mdi mdi-school"></i></div>
                <div v-if="post.creator.id == account.id" class="col-4 text-end"><button @click="deletePost(post)"><i class="mdi mdi-trash-can"></i></button></div>
            </div>
                <div>{{new Date(post.createdAt).toLocaleDateString('en-us')}}</div>
                <div>{{post.body}}</div>
                <div v-if="post.imgUrl"><img class="mt-2 w-100 img-fluid picture" :src="post.imgUrl" alt=""></div>
                <h4 class="text-end"><i @click="likePost()" class="mdi mdi-heart">{{post.likes.length}}</i></h4>
        </div>
    </div>
</div>



</template>


<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import { Post } from '../models/Post.js';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';



export default {
props:{
    post: {type: Post, required: true}
},
setup(props) {
  return {
    account: computed(()=> AppState.account),
    async deletePost(post){
        try {
        const yes = await Pop.confirm('Delete post?')
        if (!yes) {return}
        await postsService.deletePost(post.id)    
        } catch (error) {
        logger.error('[Deleting Post]',error)
        Pop.error(error)   
        }
    },

    async likePost(){
    try {
    if (!props.post.likeIds.includes(AppState.account.id)){
    await props.post.likeIds.push(AppState.account.id)
    } else {
    await props.post.likeIds.pop(AppState.account.id)
    }
    console.log('Props data', props.post)
    let postData = props.post
    await postsService.likePost(postData)
    } catch (error) {
    logger.error(error)        
    }

    }
  }
}
}
</script>
<style lang="scss" scoped>
.profilepic{
    border-radius: 50%;
    height: 45px;
    width: 45px;
    object-fit: cover;
}
.picture{
    height: 400px;
    object-fit: cover;
    object-position: top;
}


</style>