import { AppState } from "../AppState.js"
import { Ad } from "../models/Ad.js"
import { bcwSandbox } from "./AxiosService.js"


class AdsService{
    async getAds(){
    const res = await bcwSandbox.get('/api/ads')
    console.log('Getting ads',res.data)
    AppState.ads = res.data.map(a => new Ad(a))
    console.log(AppState.ads)
    }

}


export const adsService = new AdsService()