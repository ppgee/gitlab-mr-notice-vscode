[![Board Status](https://dev.azure.com/atlestroms0321/bcb96420-5f60-4845-ad1f-ca9bc1394777/d1d11b62-ba4e-4ee5-adb7-29c01edb6034/_apis/work/boardbadge/c443da14-8efa-424c-ae0a-dfc27c9f37ed)](https://dev.azure.com/atlestroms0321/bcb96420-5f60-4845-ad1f-ca9bc1394777/_boards/board/t/d1d11b62-ba4e-4ee5-adb7-29c01edb6034/Microsoft.RequirementCategory)
# gitlab-mr-notice-vscode

This is a reminder widget for gitlab merge requests

[Chinese readme](./Readme-cn.md)

## Features

Configure your gitlab domain name, private license and account name in vscode.

After the configuration is successful, the tool will prompt with the number of merge requests assigned to the current user on gitlab, saving some chat time between developers.

## Configuration

`ctrl/cmd + ,` to configure your gitlab settings:

- `gitMRNotice.gitlabUrl`: User's gitlab domain name, must be set
- `gitMRNotice.gitlabVersion`: User gitlab version, default v4, optional, fill in, for example, v3
- `gitMRNotice.privateToken`: User's private authorization, mandatory
- `gitMRNotice.timeout`: notification interval, optional, default 60 seconds

Alternatively: `Preferences` -> `Settings` in the VS Code top menu

## Issues

Submit the [issues](https://github.com/ppgee/gitlab-mr-notice-vscode/issues) if you find any bug or have any suggestion.

## Contribution

Fork the [repo](https://github.com/ppgee/gitlab-mr-notice-vscode) and submit pull requests.

**Enjoy!**
