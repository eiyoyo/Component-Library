<template>
  <div>
    <div class="select-model clearfix">
      <el-menu
        default-active="1"
        class="el-menu-vertical"
        @select="handleSelect"
      >
        <el-menu-item index="1">
          <i class="el-icon-location"></i>
          <span slot="title">二级联动</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">三级联动</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-cpu"></i>
          <span slot="title">多级联动</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">单选</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-ice-drink"></i>
          <span slot="title">多选</span>
        </el-menu-item>
      </el-menu>
      <div class="display-box">
        <LinkageSelector
          ref="linkageselector"
          v-show="currentItem == 3"
          @showNext="getProjectDepartment"
          :selectorData="departmentOptions"
        ></LinkageSelector>
        <Select :function-number="1" v-show="currentItem == 1"></Select>
        <Select :function-number="2" v-show="currentItem == 2"></Select>
        <Select :function-number="4" v-show="currentItem == 4"></Select>
        <Select :function-number="5" v-show="currentItem == 5"></Select>
      </div>
    </div>
    <CodeBox>
      <template v-slot:codeIntro>
        <div class="description">
          <p>
            详情参考elementUI官网和和select.vue模块,单选，多选，多级联动模块许设置token：localStorage.setItem('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyYW5kb20iOiI4NTQwMjM2LTAxYzQwMzBlLWMxZTktNDk0Yi1iNTZkLWY5ODk5ZTMyNzU5Zi01NTc2MjgyIiwiaXNzIjoiZWZhbmdzc28iLCJoZWxsbyI6ImVoYW9mYW5nIiwiaWF0IjoxNTYxNDI2OTM1LCJqdGkiOiI2OTYwNTA1LTczMjk4NjA4LWU2YjItNDEwMi04ZjU0LTllODQ4MDkyMDExYy01NzA5MjU4In0.eZjzSwRMxsNqWR_VkG2X_-6hnJ27DPfvUXrKqxEdkZM')
          </p>
        </div>
      </template>
    </CodeBox>
  </div>
</template>

<script>
// @ is an alias to /src
import LinkageSelector from "@/components/linkageSelector.vue";
import Select from "@/components/select.vue";
import CodeBox from "@/components/CodeBox.vue";

export default {
  components: {
    LinkageSelector,
    Select,
    CodeBox
  },
  data() {
    return {
      // 项目部列表数据
      departmentOptions: [],
      // 当期目录项
      currentItem: 1
    };
  },
  created() {
    this.getProjectDepartment();
  },
  updated() {
    this.$nextTick(() => {
      if (!this.$refs.linkageselector) return;
      this.$refs.linkageselector.addListener();
    });
  },
  methods: {
    // 获取项目部列表
    getProjectDepartment(id) {
      this.$axios
        .get("http://xmjyapi.ehaofang.net/api/projectDepartment/v1", {
          params: {
            parentId: id || 0
          },
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(res => {
          if (res.data.code === 200) {
            this.departmentOptions = res.data.data;
          }
        });
    },
    // select导航栏
    handleSelect(index) {
      this.currentItem = index;
    }
  }
};
</script>

<style lang="less" scoped>
@import "./../assets/less/common.less";
.select-model {
  border-bottom: 50px solid #e6e6e6;
}
.el-menu-vertical {
  width: 250px;
  float: left;
  border-right: solid 1px #e6e6e6;
}
.display-box {
  margin: 20px auto;
  height: 200px;
  width: 400px;
  border-radius: 10px;
  border: 1px solid #dddddd;
  background-color: rgba(221, 221, 221, 0.08);
  box-shadow: 0 0 10px 10px #dddddd;
  .e-selector {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
