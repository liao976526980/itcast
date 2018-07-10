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
                <el-table-column label="创建日期">
                  <template slot-scope="scope">
                    {{ scope.row.create_time | fmtDate('YYYY-MM-DD') }}
                  </template>
                </el-table-column>
                <el-table-column label="用户状态" width="100">
                  <template slot-scope="scope">
                    <el-switch
                      v-model="scope.row.mg_state"
                      active-color="#13ce66"
                      inactive-color="#ff4949">
                    </el-switch>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                      <el-button
                        plain
                        size="mini"
                        type="primary"
                        icon="el-icon-edit">
                      </el-button>
                      <el-button
                        plain
                        size="mini"
                        type="danger"
                        icon="el-icon-delete">
                      </el-button>
                      <el-button
                        plain
                        size="mini"
                        type="warning"
                        icon="el-icon-check">
                      </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[2, 4, 6, 8]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
    </el-card>
</template>

<script>
export default {
  data() {
    return {
      // 用户列表数据
      list: [],
      // true显示正在加载,false的时候不显示
      loading: true,
      pageSize: 2,
      currentPage: 1,
      total: 0
    };
  },
  created() {
    // 发送请求获取数据
    this.loadData();
  },
  methods: {
  // 分页方法
    handleSizeChange(val) {
      this.pageSize = val;
      // 当分页条数发生变化,修改当前页码为第一页
      this.currentPage = 1;
      this.loadData();
      // size发生变化
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loadData();
      // 页码发生变化
      console.log(`当前页: ${val}`);
    },
    // 发送异步请求获取数据
    async loadData() {
      // 发送异步请求之前
      this.loading = true;
      // 发送请求之前, 获取token
      const token = sessionStorage.getItem('token');
      // 在请求头中设置token
      this.$http.defaults.headers.common['Authorization'] = token;

      const res = await this.$http.get(`users?pagenum=${this.currentPage}&pagesize=${this.pageSize}`);

      // 异步请求结束
      this.loading = false;
      // 获取响应数据
      const data = res.data;
      // meta中的msg和status
      const { meta: { msg, status } } = data;
      if (status === 200) {
        const { data: { users, total } } = data;
        this.list = users;
        // 获取总共多少条数据
        this.total = total;
      } else {
        this.$message.error(msg);
      }
    }
  }
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
