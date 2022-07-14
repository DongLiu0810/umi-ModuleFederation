# umi-ModuleFederation
基于umi3，webpack5搭建的模块联邦demo

app1作为消费方
必须开启umi自带的按需加载功能
不可开启自带的mfsu
必须安装umi-plugin-mf-bootstrap特殊插件，将入口文件更改（此插件存在qiankun兼容问题，所以不可与qiankun插件同时存在）
如果打包失败，将临时文件中的入口文件删除import '@@/core/devScripts';
<img width="741" alt="image" src="https://user-images.githubusercontent.com/47967650/178911788-04bc7ed1-1ddb-41b7-adbd-621af30642ac.png">

app2作为组件提供方
组件提供方可同时被qiankun微服务消费
不可进行拆包操作
