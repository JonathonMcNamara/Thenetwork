<template>

<div class="profile-page" v-if="profile">

<div class="container">
  <div class="row cover-img">
  </div>
  <div class="row">
    <h1 class="col-md-12">{{profile.name}}<i v-if="profile.graduated" class="mdi mdi-school"></i></h1>
    <div class="col-md-12"><img :src="profile.picture" alt=""></div>
    <h3 class="col-md-12">Connect with me below</h3>
    <div class="col-md-12">GitHub: {{profile.github}}</div>
    <div class="col-md-12">LinkedIn: {{profile.linkedIn}}</div>
    <h3 class="col-md-12">Bio</h3>
    <div class="col-md-12">{{profile.bio}}</div>
  </div>


</div>


<div class="container">
  <div class="row">
    <h1 class="pt-5 text-center">{{profile.name}}'s Posts: </h1>
    <div class=" offset-3 col-md-6" v-for="p in posts" :key="p.id">
      <PostCard :post="p"/>
    </div>
  </div>
</div>


</div>



</template>
<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import { profilesService } from '../services/ProfilesService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
setup() {

  const route = useRoute()

  async function getProfileById(){
    try {
    await profilesService.getProfileById(route.params.profileId)  
    } catch (error) {
    logger.error('[Getting Profile]',error)
    Pop.error(error)  
    }
  }
  
  async function getPostsByCreatorId(){
    try {
    await postsService.getPostsByCreatorId(route.params.profileId)  
    } catch (error) {
    logger.error('[Getting Posts]',error)  
    Pop.error(error)
    }
    }


    onMounted(()=>{
      getProfileById()
      getPostsByCreatorId()
    })

  return {
    account: computed(()=> AppState.account),
    profile: computed(()=> AppState.activeProfile),
    posts: computed(()=> AppState.profilePosts),
    cover: computed(()=> `url(${AppState.activeProfile?.coverImg}`)
  };
}
}
</script>
<style lang="scss" scoped>

.cover-img{
  height: 300px;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  display: grid;
  place-content: center;
  background-image: v-bind(cover);
}

</style>