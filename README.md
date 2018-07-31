# gitlab-mr-notice-vscode

这是一个gitlab合并请求的提醒小工具

## Features

* 在vscode配置好自己的gitlab域名、私有授权还有账号姓名，配置成功后将工具将会提示gitlab上指派给当前用户的合并请求数量，省去一部分开发人员之间的尬聊时间

## Configuration

`ctrl/cmd + ,` 或者自设快捷键 打开 settings:

* `gitMRNotice.gitlabUrl`: 使用者的gitlab域名，必设
* `gitMRNotice.gitlabVersion`: 使用者gitlab版本，默认v4，选填，填入例如 v3
* `gitMRNotice.privateToken`: 使用者的私有授权，必设
* `gitMRNotice.userName`: 使用者在gitlab上的姓名，必设
* `gitMRNotice.timeout`: 通知时间间隔，选填，默认60秒

## Issues
Submit the [issues](https://github.com/ppgee/gitlab-mr-notice-vscode/issues) if you find any bug or have any suggestion.

## Contribution
Fork the [repo](https://github.com/ppgee/gitlab-mr-notice-vscode) and submit pull requests.

**Enjoy!**
