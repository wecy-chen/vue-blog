# demo

> A Vue.js project

## Build Setup 使用说明

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

#启动数据库
cd node-server/mongoodb-data
mongod -dbpath=/

#启动node服务器
cd node-server
npm install
npm run start 或 node index.js

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
