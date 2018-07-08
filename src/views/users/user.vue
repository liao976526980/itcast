<template>
    <el-card class="box-card">
      <!-- 面包屑 -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>用户管理</el-breadcrumb-item>
              <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
            <!-- 搜索区域 -->
            <el-row class="searchArea">
              <el-col :span="24">
                <el-input placeholder="请输入内容" class="searchInput">
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <el-button type="success" plain>添加用户</el-button>
              </el-col>
            </el-row>

            <!-- 表格 -->
            <el-table
              v-loading="loading"
              :data="list"
              stripe
              border
              style="width: 100%">
              <el-table-column
                type="index"
                width="50">
              </el-table-column>
              <el-table-column
                prop="username"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="email"
                label="邮箱"
                width="180">
              </el-table-column>
              <el-table-column
                prop="mobile"
                label="电话">
              </el-table-column>
            </el-table>
    </el-card>
</template>

<script>
export default {

};
</script>

<style>
.box-card {
  height: 100%;
}
.searchArea {
  margin-top: 10px;
  margin-bottom: 10px;
}
.searchArea .searchInput {
  width: 300px;
}
</style>
