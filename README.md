# Redirect for view unprotected <a href="https://plugins.jenkins.io/embeddable-build-status/" target="_blank">Jenkins Build Status</a> for branch names with slashes 🔀

## Use case 🎯
You want to automatically show badges in gitlab mr description <a href="https://docs.gitlab.com/ee/user/project/description_templates.html" target="_blank">templates</a> with using environment %{source_branch}, but your branches has slashes.
You cant's pass branches with slashes to jenkins, they must be escaped. So this redirect will do it for you. 🛠️

## Site 🌐
https://jenkins-badge-redirect.geminixandroid.com

## Redirect path 🔁
[https://jenkins-badge-redirect.geminixandroid.com/icon?](https://jenkins-badge-redirect.geminixandroid.com/icon?)

## Query params 📋
- host - jenkins.domain.com 🖥️
- job - pipeline-tests 📦
- branch - bugfix/task-sample (slash here will be escaped for jenkins plugin) 🔄
- all other query params also will be passed 📤

## Example 📝
[https://jenkins-badge-redirect.geminixandroid.com/icon?host=jenkins.domain.com&job=pipeline-tests&branch=bugfix/task-sample&subject=Some+tests](https://jenkins-badge-redirect.geminixandroid.com/icon?host=jenkins.domain.com&job=pipeline-tests&branch=bugfix/task-sample&subject=Some+tests)

will be redirected to ➡️

https://jenkins.domain.com/buildStatus/icon?job=pipeline-tests%2Fbugfix%252Ftask-sample&subject=Some+tests
 
## Run 🚀
```
npm install 📦
npm start ⚡
```
