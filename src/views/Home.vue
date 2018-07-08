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
                    <a href="#" class="logout">退出</a>
                    </div></el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside class="aside" width="200px">Aside</el-aside>
            <el-main class="main">Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {};
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

.main {
  background-color: #e9eef3;
  height: 100%;
}
</style>
