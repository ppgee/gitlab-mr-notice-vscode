import Axios, {
  AxiosInstance as AXIOS_INSTANCE
} from 'axios'
import CONFIG from './configuration'
import { genMessage } from './messager'

export class AxiosInstance {
  axiosInstance: AXIOS_INSTANCE
  private privateToken: any
  private userName: any

  constructor (
    gitlabUrl: string,
    privateToken: string,
    userName: string
  ) {
    this.privateToken = privateToken
    this.userName = userName

    this.axiosInstance = Axios.create({
      baseURL: `${gitlabUrl}${CONFIG.GITLAB_API_VERSION}`,
      withCredentials: true,
      headers: {
        'PRIVATE-TOKEN': this.privateToken
      }
    })

    this.axiosInstance.interceptors.response.use(response => {
      return response
    }, error => {
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

  // get user info api
  getCurrUserInfo () {
    return this.axiosInstance.get('/users', {
      params: {
        search: this.userName
      }
    })
  }

  // get owned projects api
  getOwnProjects () {
    return this.axiosInstance.get('/projects')
  }

  /**
   * get merge requests by project id
   * @param projectId gitlab project id
   */
  getMergeRequestsById (projectId: string) {
    return this.axiosInstance.get(`/projects/${projectId}/merge_requests?state=opened`)
  }
}