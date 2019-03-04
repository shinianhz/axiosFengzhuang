<style scoped>
.layout {
  border       : 1px solid #d7dde4;
  height       : 100%;
  background   : #f5f7f9;
  position     : relative;
  border-radius: 4px;
  /* overflow     : hidden; */
}
.layout-logo {
  width        : 100px;
  height       : 30px;
  background   : #5b6270;
  border-radius: 3px;
  float        : left;
  position     : relative;
  top          : 15px;
  left         : 20px;
}
.layout-nav {
  width       : 620px;
  margin      : 0 auto;
  margin-right: 20px;
}
.tip-box{
  height         : 700px;
  background     : url('./assets/2.jpg') no-repeat;
  background-size: cover
}
.tip{
  font-size  : 30px;
  padding-top: 100px;
  text-align : center;
  color      : #fff;
}
.submit{
  margin-top : 20px;
  margin-left: 60px;
}
.form{
  margin-top : 30px;
  margin-left: 44%;
  /* transform  : translateX(-50%) */
}
</style>
<template>
  <div class="layout">
    <div v-if="login">
      <Layout>
        <Header>
          <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo"> </div>
            <div class="layout-nav">
              <MenuItem name="1">
              <Icon type="ios-navigate" size="30"></Icon>
              首页
              </MenuItem>
              <MenuItem name="2">
              <Icon type="ios-keypad" size="30"></Icon>
              相册
              </MenuItem>
              <MenuItem name="3">
              <Icon type="ios-analytics" size="30"></Icon>
            帮助中心
              </MenuItem>
              <MenuItem name="4">
              <Icon type="ios-paper" size="30"></Icon>
              更多
              </MenuItem>
                <MenuItem name="5">
              <Icon type="md-person" size="28"  ></Icon>
                hello <span>Alen</span>
              </MenuItem>
            </div>
          </Menu>
        </Header>
        <Layout>
          <Sider hide-trigger :style="{background: '#fff'}">
            <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
              <Submenu name="1">
                <template slot="title">
                  <Icon type="ios-navigate" size="20"></Icon>
                  管理信息
                </template>
                <MenuItem name="1-1">
                <Icon type="md-contact" size="15" color="lightgreen"></Icon>
                <router-link to="/user">用户管理</router-link>
                </MenuItem>

                <MenuItem name="1-2">
                <Icon type="ios-list-box"  size="15" color="lightgreen" />
                <router-link to="/cate">分类管理</router-link>
                </MenuItem>
                <MenuItem name="1-3">
                <Icon type="ios-leaf" size="15" color="lightgreen" />
                <router-link to="/news">新闻管理</router-link>
                </MenuItem>
                <MenuItem name="1-4">
                  <Icon type="logo-apple" size="20" color="lightgreen" />

                <router-link to="/product">产品管理</router-link></router-link>
                </MenuItem>
              </Submenu>
              <Submenu name="2">
                <template slot="title">
                  <Icon type="ios-keypad" size="20"></Icon>
                  <router-link to="/news">商品管理</router-link>
                </template>
                <MenuItem name="2-1">
                  <Icon type="ios-cart" size="20" color="lightgreen" />
                <router-link to="/cart">购物车</router-link>
                </MenuItem>
                <MenuItem name="2-2">
                  <Icon type="md-map"  size="20" color="lightgreen"/>
                  <router-link to="/order">订单管理</router-link>
                </MenuItem>
              </Submenu>
              <Submenu name="3">
                <template slot="title">
                  <Icon type="logo-snapchat" size="20"   color="pink" />
                  评论管理
                </template>
                <MenuItem name="3-1">
                <Icon type="ios-chatboxes" size="18" color="lightgreen" />
                  <router-link to="/procomment">产品评论</router-link>
                </MenuItem>
                <MenuItem name="3-2">
                <Icon type="md-chatboxes" size="18" color="lightgreen" />
                  <router-link to="/newscomment">新闻评论</router-link>
                </MenuItem>
              </Submenu>
            </Menu>
          </Sider>
          <Layout :style="{padding: '0 24px 24px'}">
            <Breadcrumb :style="{margin: '24px 0'}">
              <BreadcrumbItem>Home</BreadcrumbItem>
              <BreadcrumbItem>Components</BreadcrumbItem>
              <BreadcrumbItem>Layout</BreadcrumbItem>
            </Breadcrumb>
            <Content :style="{padding: '24px', paddingBottom:'0px', minHeight: '280px', background: '#fff'}">
              <router-view></router-view>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
    <!-- //登陆 -->
    <div v-else class="tip-box">
        <p class="tip">欢迎来到alen后台管理系统，请您先登陆</p>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" class="form" inline>
        <FormItem prop="name">
            <Input type="text" v-model="formInline.name" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <br>
        <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Password">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
          <br>
        <FormItem class="submit">
            <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
        </FormItem>
        <div>{{login}}</div>
    </Form>
    </div>
  </div>


</template>
<script>
import {mapActions} from 'vuex'
export default {
   data() {
            return {
              globalUrl : 'http://10.31.162.52:3000/',
              formInline: {
                    name    : '',
                    password: ''
                },
                ruleInline: {
                    name: [
                        { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            ...mapActions(['checkLogin','setToken']),
            handleSubmit(name) {
              // console.log(`${this.globalUrl}users/login`)
              console.log(this.$store.getters.login)
                this.$refs[name].validate((valid) => {
                    if (valid) {
                      this.axios({
                          url   : `${this.globalUrl}admin/login`,
                          method: 'post',
                          data  : {
                            name    : this.formInline.name,
                            password: this.formInline.password
                          }
                      }).then(res=>{
                        // console.log(res)
                          if(res.data.token){
                            this.checkLogin(true);
                            this.setToken(res.data.token)
                            this.$Message.success('Success!');
                            //存取
                               sessionStorage.setItem('name',this.formInline.name);
                               sessionStorage.setItem('key',res.data.token);
                          }else{
                            this.$Message.error('Fail!');
                          }
                      })
                    } else {
                        this.$Message.error('请输入正确的用户名和密码');
                    }
                })
            },
            checkName(){
              if(sessionStorage.getItem('name')){
               this.checkLogin(true);
               this.setToken(sessionStorage.getItem('key'))
              }
            }
        },
        beforeMount() {
         this.checkName()
        },
        computed:{
          login(){
            return this.$store.getters.login
          },
          globalUrl(){
            return  this.$store.getters.globalUrl
          }
  },
};
</script>
