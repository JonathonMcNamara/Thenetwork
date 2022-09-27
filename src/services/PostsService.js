import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { bcwSandbox } from "./AxiosService.js"

class PostsService{

async createPost(postData){
    const res = await bcwSandbox.post('/api/posts',postData)
    AppState.posts.unshift = (new Post(res.data)) 
    // NOTE THIS FUNCTION IN CASE YOU RUN INTO ISSUES WITH YOUR CREATE 
}

async getPosts(){
    const res = await bcwSandbox.get('/api/posts')
    console.log(res.data)
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.previousPage = res.data.newer
    AppState.nextPage = res.data.older
    logger.log('previous page', AppState.previousPage)
    logger.log('next page', AppState.nextPage)
}

async getPostsByCreatorId(creatorId){
    const res = await bcwSandbox.get('/api/posts',
    {params: {
        creatorId
    }
})
    AppState.profilePosts = res.data.posts.map(p => new Post(p))
}

async changePage(url){
    const res = await bcwSandbox.get(url)
    logger.log(res.data)
    AppState.posts = res.data.posts.map(p=> new Post(p))
    AppState.nextPage = res.data.older
    AppState.previousPage = res.data.newer
}

async deletePost(postId){
    const res = await bcwSandbox.delete(`api/posts/${postId}`)
    AppState.posts = AppState.posts.filter(p=> p.id != postId)
}

async likePost(likesData){
    const res = await bcwSandbox.put(`api/posts/${likesData.id}`, likesData)
    let post = new Post(res.data)
    const postIndex = AppState.posts.findIndex(l => l.id == likesData.id)
    AppState.posts.splice(postIndex,1,post)
}


}




export const postsService = new PostsService()