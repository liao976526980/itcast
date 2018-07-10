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
          <!-- 搜索功能
              1.绑定搜索文本框
              2.给按钮搜索绑定事件
            -->
          <el-input v-model="searchValue" placeholder="请输入内容" class="searchInput" clearable>
            <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <el-button @click="addUserDialogVisible = true" type="success" plain>添加用户</el-button>
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
              @change="handleSwitchChange(scope.row)"
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
                @click="handleDelete(scope.row.id)"
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
        :page-sizes="[ 4, 6, 8]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <!-- 添加用户的弹出框 -->
      <el-dialog title="添加用户" :visible.sync="addUserDialogVisible">
        <el-form
          label-width="100px"
          :model="formData">
          <el-form-item label="用户名">
            <el-input v-model="formData.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="formData.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="formData.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="formData.mobile" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addUserDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd">确 定</el-button>
        </div>
      </el-dialog>
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
      pageSize: 4,
      currentPage: 1,
      // 总共的数据条数,从服务器获取
      total: 0,
      // 绑定搜索文本框
      searchValue: '',
      // 控制添加用户的对话显示和隐藏
      addUserDialogVisible: false,
      formData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
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
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loadData();
      // 页码发生变化
      // console.log(`当前页: ${val}`);
    },
    // 发送异步请求获取数据
    async loadData() {
      // 发送异步请求之前
      this.loading = true;
      // 发送请求之前, 获取token
      const token = sessionStorage.getItem('token');
      // 在请求头中设置token
      this.$http.defaults.headers.common['Authorization'] = token;

      const res = await this.$http.get(`users?pagenum=${this.currentPage}&pagesize=${this.pageSize}&query=${this.searchValue}`);

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
    },
    // 搜索按钮
    handleSearch() {
      // 带上查询参数
      this.loadData();
    },
    // 当开关的状态发生改变
    async handleSwitchChange(user) {
      // console.log(user);
      const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`);
      // console.log(res);
      // 响应对象 res = { data, status }
      // 服务器返回的数据格式 res.data = {data:{}, meta: {} }
      const data = res.data;
      const { meta: {status, msg} } = data;
      if (status === 200) {
        this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }
    },
    // 删除
    // 1.给删除按钮,注册事件
    // 2.提示是否删除
    // 3.发生请求
    async handleDelete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 包裹await的函数都要加上 async
        // 点击确认按钮执行
        const res = await this.$http.delete(`users/${id}`);
        // console.log(res);
        // 服务器返回的数据
        const data = res.data;
        // meta内部的status和msg
        const { meta: { status, msg } } = data;
        if (status === 200) {
          // 删除成功加载数据
          this.currentPage = 1;
          this.loadData();
          this.$message({
            type: 'success',
            message: msg
          });
        };
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 添加用户的对话框中的确认按钮,要执行添加用户语句
    async handleAdd() {
      const res = await this.$http.post('users', this.formData);
      const data = res.data;
      console.log(res);
      const { meta: { status, msg } } = data;
      if (status === 201) {
        // 添加成功
        // 隐藏对话框
        this.addUserDialogVisible = false;
        // 提示成功
        this.$message.success(msg);
        // 重新加载数据
        this.loadData();
        for (let key in this.for) {
          this.formData[key] = '';
        }
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
