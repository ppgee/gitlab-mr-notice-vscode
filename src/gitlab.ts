import CONFIG from './configuration'
import { AxiosInstance } from './api'
import { window, commands, Uri } from 'vscode'
import { isArray } from './utils'

export class GitLabMR {
  private gitlabUrl: string
  private userName: string
  private privateToken: string
  private apiInstance: AxiosInstance

  userInfo: object = {}
  projectIds: string[] = []
  mergeRequests: object[] = []

  constructor () {
    this.gitlabUrl = CONFIG.SETTING_CONFIG.gitlabUrl
    this.userName = CONFIG.SETTING_CONFIG.userName
    this.privateToken = CONFIG.SETTING_CONFIG.privateToken

    this.apiInstance = new AxiosInstance(this.gitlabUrl, this.privateToken, this.userName)
  }

  // get userinfo
  async getCurrUserInfo () {
    const resp = (await this.apiInstance.getCurrUserInfo()).data

    // user only one 
    if (!isArray(resp) || resp.length > 1) {
      throw new Error('请检查配置项是否正确填写')
    }

    // get userinfo from array
    this.userInfo = resp.shift()
  }

  // get owned projects
  async getOwnProjects () {
    const resp = (await this.apiInstance.getOwnProjects()).data

    // result ids push to projectIds
    for (const project of resp) {
      this.projectIds.push(project.id)
    }
  }

  // get merge requests for self
  async getAllMergeRequests () {
    // add merge request to instance
    const addMergeRequests = (mergeRequests: object[]) => {
      const userId = (this.userInfo as any).id
      for (const mergeRequest of mergeRequests) {
        const assignee = (mergeRequest as any).assignee
        // assignee is not exists
        if (!assignee || assignee.id !== userId) {
          continue
        }
  
        this.mergeRequests.push(mergeRequest)
      }
    }

    for (const projectId of this.projectIds) {
      const resp = (await this.apiInstance.getMergeRequestsById(projectId)).data
      isArray(resp) && (resp.length > 0) && (addMergeRequests(resp))
    }
  }

  // start
  start () {
    return new Promise(async (resolve, reject) => {
      try {
        await this.getCurrUserInfo()
  
        await this.getOwnProjects()
        await this.getAllMergeRequests()
  
        if (this.mergeRequests.length > 0) {
          const hasMergeRequestsTxt = `你的小弟们发给你${this.mergeRequests.length}个合并请求，快去合并代码取悦他们吧！`
          const openGitLabBtnTxt = '打开gitlab'
          window.showInformationMessage(hasMergeRequestsTxt, openGitLabBtnTxt).then(selected => {
            selected === openGitLabBtnTxt && commands.executeCommand('vscode.open', Uri.parse(CONFIG.SETTING_CONFIG.gitlabUrl))
          })
        }

        resolve()
      } catch (error) {
        // if the status exists
        const { response } = error
        // throw the response message
        if (response) {
          error = response.data.message
        }
        reject(error)
      }
    })
  }
}