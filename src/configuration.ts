import { workspace } from 'vscode'

// extension name
const EXTENSION_NAME = 'gitMRNotice'

// get setting config
const SETTING_CONFIG = workspace.getConfiguration(EXTENSION_NAME)

// gitlab api version
const GITLAB_API_VERSION = '/api/v3'

export default {
  EXTENSION_NAME,
  SETTING_CONFIG,
  GITLAB_API_VERSION
}
