import Axios, {
  AxiosInstance as AXIOS_INSTANCE
} from 'axios'
import CONFIG from './configuration'

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
    return this.axiosInstance.get(`/projects/${projectId}/merge_requests`) // ?state=opened
  }
}