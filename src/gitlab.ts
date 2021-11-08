import CONFIG from './configuration'
import { AxiosInstance } from './api'
import { window, commands, Uri } from 'vscode'
import { isArray } from './utils'
import { AxiosError } from 'axios'

export class GitLabMR {
  private gitlabUrl: string
  private privateToken: string
  private apiInstance: AxiosInstance

  mergeRequests: any[] = []

  constructor () {
    this.gitlabUrl = CONFIG.SETTING_CONFIG.gitlabUrl
    this.privateToken = CONFIG.SETTING_CONFIG.privateToken
    this.apiInstance = new AxiosInstance(this.gitlabUrl, this.privateToken)
  }

  // get merge requests for self
  async getMRListAssignedToMe () {
    try {
      const { data } = await this.apiInstance.getMRListAssignedToMe()

      if (isArray(data) && (data.length > 0)) {
        this.mergeRequests = data
      }
    } catch (error) {
      console.error(error)
    }
  }

  // start
  start () {
    return new Promise(async (resolve, reject) => {
      try {
        await this.getMRListAssignedToMe()
        if (this.mergeRequests.length > 0) {
          const hasMergeRequestsTxt = `你的小弟们发给你${this.mergeRequests.length}个合并请求，快去合并代码取悦他们吧！`
          const openGitLabBtnTxt = '打开gitlab'
          const openUrl = this.mergeRequests.length === 1 ? this.mergeRequests[0].web_url : this.gitlabUrl
          window.showInformationMessage(hasMergeRequestsTxt, openGitLabBtnTxt).then(selected => {
            selected === openGitLabBtnTxt && commands.executeCommand('vscode.open', Uri.parse(openUrl))
          })
        }

        resolve(this.mergeRequests)
      } catch (error) {
        // if the status exists
        const { response } = error as AxiosError
        // throw the response message
        if (response) {
          error = response.data.message
        }
        reject(error)
      }
    })
  }
}