import CONFIG from './configuration'
import { genMessage } from './messager'

export class ConfigValidator {
  // get setting config
  private SETTING_CONFIG = CONFIG.SETTING_CONFIG

  // validate result
  private validResult = {
    result: false,
    msg: ''
  }

  // validator function
  validConfig = (settingKey: string) => {
    // config not exists
    if (!this.SETTING_CONFIG[settingKey]) {
      this.validResult = genMessage(this.SETTING_CONFIG[settingKey], `gitlab-mr-notice-vscode提示：${settingKey} 不能为空`)
    }

    return this.SETTING_CONFIG[settingKey] ? true : false
  }

  // export result and msg after validated
  configValidator = () => {

    // config validator result
    const validResult = this.validConfig('gitlabUrl') && this.validConfig('privateToken')

    // validResult return true
    if (validResult === true) {
      this.validResult = genMessage(validResult, '')
    }

    return this.validResult
  }
}