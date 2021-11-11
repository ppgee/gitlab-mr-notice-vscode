'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { ConfigValidator } from './validator'
import { GitLabMR } from './gitlab'
import CONFIG from './configuration'

function sleep () {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, CONFIG.SETTING_CONFIG.timeout * 1000)
  });
}

// main application
async function main () {
  try {
    while (1) {
      const gitlabMR = new GitLabMR()
      await gitlabMR.start()
      await sleep()
    }
  } catch (error: any) {
    // if the error from request show the error and restart
    const { result, msg } = error
    if (result === false) {
      vscode.window.showErrorMessage(msg)
      await sleep()
      main()
    }
  }
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate () {

  // get the response for validator
  const configValidatorResp = (new ConfigValidator()).configValidator()
  if (!configValidatorResp.result) {
    // display a error message box to the user
    vscode.window.showErrorMessage(configValidatorResp.msg)
    return
  }
  console.log('Congratulations, your extension "gitlab-mr-notice-vscode" is now active!')

  // start
  vscode.window.setStatusBarMessage('gitlab-mr-notice-vscode 正在运行...', 1500)
  main()
}

// this method is called when your extension is deactivated
export function deactivate () { }
