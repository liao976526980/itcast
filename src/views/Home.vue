<template>
    <el-container class="container">
        <!-- 头部样式 -->
        <el-header class="header">
            <!-- 栅格系统布局 -->
            <el-row>
                <el-col :span="4">
                    <div class="grid-content bg-purple"><img src="/static/logo.png" alt=""></div>
                </el-col>
                <el-col :span="19"><div class="grid-content bg-purple-light"><h2 class="middle">电商后台管理系统</h2></div></el-col>
                <el-col :span="1"><div class="grid-content bg-purple">
                    <a href="#" class="logout" @click.prevent="handleLogout">退出</a>
                    </div></el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside class="aside" width="200px">
                <!-- 侧边栏 -->
                <el-menu
                :unique-opened="true"
                :router="true"
                class="menu">
                    <el-submenu index="1">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>用户管理</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item class="el-icon-menu" index="1-1">用户列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>权限管理</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item class="el-icon-menu" index="2-1">角色列表</el-menu-item>
                        <el-menu-item class="el-icon-menu" index="2-2">权限列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>商品管理</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item class="el-icon-menu" index="3-1">商品列表</el-menu-item>
                        <el-menu-item class="el-icon-menu" index="3-2">分类参数</el-menu-item>
                        <el-menu-item class="el-icon-menu" index="3-3">商品分类</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>订单管理</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item class="el-icon-menu" index="4-1">订单列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>数据统计</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item class="el-icon-menu" index="5-1">数据报表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main class="main">Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
  // 判断是否登录
  beforeCreate() {
    // 从sessionStorage 中获取token, 判断是否有token
    console.log(sessionStorage);
    const token = sessionStorage.getItem('token');
    if (!token) {
      // 如果没有token，返回登录页面
      this.$router.push({ name: 'login' });
      // 提示
      this.$message.warning('请先登录');
    }
  }
};
</script>

<style>
.container {
  height: 100%;
}

.header {
  background-color: #b3c0d1;
  padding: 0;
}

.header .middle {
  line-height: 60px;
  color: #fff;
  text-align: center;
}

.header .logout {
  line-height: 60px;
  text-decoration: none;
  color: gold;
}

.aside {
  background-color: #d3dce6;
}
.aside .menu {
  height: 100%;
}
.main {
  background-color: #e9eef3;
  height: 100%;
}
</style>
