<template>
  <transition enter-active-class="slideInLeft" leave-active-class='slideOutRight'>
    <div id="reg" class="animated">
      <div class="row col-lg-6">
        <h1>欢迎注册</h1>
        <div class="form-group">
          <label for="username">用户名</label>
          <input type="text" name="username" class="form-control" id="username" placeholder="请输入你的用户名,不能重复" v-model="inputtext.username">
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input type="password" name="password" class="form-control" id="password" placeholder="请输入你的密码,至少要六位" v-model="inputtext.userpwd">
        </div>
        <div class="form-group">
          <label>性别:</label>
          <label>
            <input name="sex" type="radio" value="男" checked v-model="inputtext.usersex" /> 男</label>
          <label>
            <input name="sex" type="radio" value="女" style="margin-left: 24px" v-model="inputtext.sex" /> 女</label>
        </div>
        <div class="form-group">
          <label for="age">年龄</label>
          <input type="text" name="age" class="form-control" id="age" placeholder="请输入你的年龄" v-model="inputtext.userage">
        </div>
        <div class="checkbox">
          <label for="check">
            <input type="checkbox" checked id="check"> 我接受用户协议
          </label>
        </div>
        <div class="form-group">
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bs-example-modal-sm" @click='submit'>注册</button>
        </div>
        <!-- Small modal -->
        <div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="gridSystemModalLabel">注册情况</h4>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-10 col-md-offset-2">{{msg}}</div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" @click='resucess'>确定</button>
              </div>
            </div>
            <!-- /.modal-content -->
          </div>
          <!-- /.modal-dialog -->
        </div>
        <!-- /.modal -->
      </div>
    </div>
  </transition>
</template>
<script>
import {register} from '@/api'
export default {
  data () {
    return {
      inputtext: {},
      msg: '请稍后...',
      ok: 0
    }
  },
  methods: {
    submit () {
      this.result(this.inputtext)
    },
    resucess () {
      if (this.ok === 1) {
        this.inputtext = ''
      }
    },
    async result (data) {
      let res = await register(data)
      if (res) {
        this.msg = res.msg
        if (res.ok === 1) {
          this.ok = 1
        }
        return
      }
      this.msg = '注册失败,没开服务器'
    }
  }
}
</script>
<style>
#reg {
  margin: 50px
}
</style>
