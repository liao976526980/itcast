<template>
  <el-card class="box-card">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 表格 -->
      <el-table
        class="tb"
        :data="list"
        border
        stripe
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="authName"
          label="权限名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="path"
          label="路径"
          width="120">
        </el-table-column>
        <el-table-column
          prop="level"
          label="层级">
          <template slot-scope="scope">
            <span v-if="scope.row.level === '0'">一级</span>
            <span v-if="scope.row.level === '1'">二级</span>
            <span v-if="scope.row.level === '2'">三级</span>
          </template>
        </el-table-column>
      </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    // 加载权限列表
    async loadData() {
      // 发送请求之前获取token
      const token = sessionStorage.getItem('token');
      // 在请求头中设置token
      this.$http.defaults.headers.common['Authorization'] = token;
      const res = await this.$http.get('rights/list');
      const data = res.data;
      console.log(data);
      this.list = data.data;
    }
  }
};
</script>

<style>
.box-card {
  height: 100%;
  overflow: auto;
}
.tb {
  margin-top: 10px;
}
</style>
