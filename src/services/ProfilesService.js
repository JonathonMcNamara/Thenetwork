import { AppState } from "../AppState.js"
import { bcwSandbox } from "./AxiosService.js"
import { Profile } from "../models/Profile.js"
import { Post } from "../models/Post.js"

class ProfilesService{
    async getProfileById(id){
    const res = await bcwSandbox.get(`api/profiles/${id}`)
        AppState.activeProfile = new Profile(res.data)
    }

    async searchPosts(searchWord){
        const res = await bcwSandbox.get('/api/posts', { 
        params:{
            query: searchWord
        }
        })
    AppState.posts = res.data.posts.map(p => new Post(p))
    }
}

export const profilesService = new ProfilesService()