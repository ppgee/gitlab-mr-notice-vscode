import Axios, {
  AxiosInstance as AXIOS_INSTANCE
} from 
import CONFIG from './configuration'
import { genMessage } from './messager'

export class AxiosInstance {
  axiosInstance: AXIOS_INSTANCE
  private privateToken: any

  constructor (
    gitlabUrl: string,
    privateToken: string
  ) {
    this.privateToken = privateToken

    this.axiosInstance = Axios.create({
      baseURL: `${gitlabUrl}${CONFIG.GITLAB_API_VERSION}`,
      withCredentials: true,
      headers: {
        'PRIVATE-TOKEN': this.privateToken
      }
    })

    this.axiosInstance.interceptors.response.use()=> {
      return 
    }, error => 
      const errorDetail = this.genErrorDetailFromResponse(error)
      const errorMessager = genMessage(false, errorDetail)
      
      return Promise.reject(errorMessager)
    })
  }

  // generates the error detail from api response
  genErrorDetailFromResponse (error: any) {
    const { config, response } = error

    // response is not exists
    if (!response) {
      return `something error happened`
    }
    // get the baseURL and url to split api detail
    const { baseURL, url } = config
    const splitArray = url.replace(baseURL, '').substring(1).split('/') // api detail
    const apiDetail = `api ${splitArray.shift() || ''} ${splitArray.shift() || ''}: ${response.data.message}`

    return apiDetail
  }

  getUsername() {
    return this.axiosInstance.get('/user').then(res => {
      return res.data.username
    })
  }

  /**
   * get opened merge requests by assigned_to_me
   */
  getMRListAssignedToMe () {
    return this.axiosInstance.get('/merge_requests', {
      params: {
        scope: 'assigned_to_me',
        state: 'opened'
      }
    })
  }
}