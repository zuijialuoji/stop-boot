<template>
    <div class="app-container">
        <!--分页过滤条件-->
        <div class="filter-container">
            <el-input v-model="pageQuery.title" placeholder="名称" style="width: 200px;" class="filter-item"
                      @keyup.enter.native="handleFilter"/>
            <el-select v-model="pageQuery.status" placeholder="状态" clearable style="width: 90px" class="filter-item">
                <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item"/>
            </el-select>
            <!--      @click="cleanFilter"-->
            <el-button class="filter-item" type="danger" icon="el-icon-close" circle/>
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter" circle/>
            <el-button class="filter-item" style="margin-left: 10px;" type="success" icon="el-icon-plus" @click="preCreate"
                       circle>
            </el-button>
        </div>
        <!--表格-->
        <el-table
                :key="tableKey"
                v-loading="listLoading"
                :data="list"
                border
                stripe
                empty-text
                fit
                highlight-current-row
                style="width: 100%;"
                @sort-change="sortChange"
        >

            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="ID">
                            <span>{{ scope.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="商品名称21">
                            <span>{{ scope.row.name }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>

            <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80"
                             :class-name="getSortClass('id')">
                <template slot-scope="scope">
                    <span>{{ scope.row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column label="封面图22" width="80px" align="center">
                <template slot-scope="scope">
                    <el-image style="width: 50px; height: 40px"
                              :src="scope.row.headImg" :lazy="true"
                              :preview-src-list="[scope.row.headImg]">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column label="名称" width="100px" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="年龄" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.age}}</span>
                </template>
            </el-table-column>
            <el-table-column label="生日" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.birthday}}</span>
                </template>
            </el-table-column>


            <el-table-column label="Actions" align="center" class-name="small-padding fixed-width">
                <template slot-scope="{row}">
                    <el-button type="primary" size="mini" @click="preEdit(row)">
                        Edit
                    </el-button>
                    <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row)">
                        Delete
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--分页组件-->
        <pagination v-show="total>0" :total="total" :page.sync="pageQuery.pageNum" :limit.sync="pageQuery.pageSize"
                    @pagination="getList"/>

        <!--新增组件-->
        <create-form ref="createForm"></create-form>

        <!--编辑组件-->
        <edit-form ref="editForm" :row='updateRowData'></edit-form>

        <!--删除-->
        <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
            <!--      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">-->
            <!--        <el-table-column prop="key" label="Channel"/>-->
            <!--        <el-table-column prop="pv" label="Pv"/>-->
            <!--      </el-table>-->
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>
    import Pagination from '@/components/Pagination'
    //接口
    import {TestPageRequest, testPage} from '@/sdk/api/test/test1/page'
    //新增组件
    import createForm from './create'
    //编辑组件
    import editForm from './edit'

    export default {
        name: 'PageTable',
        components: {Pagination, createForm, editForm},
        filters: {
            statusFilter(status) {
                const statusMap = {
                    published: 'success',
                    draft: 'info',
                    deleted: 'danger'
                }
                return statusMap[status]
            },
            typeFilter(type) {
                return calendarTypeKeyValue[type]
            }
        },
        data() {
            return {
                tableKey: 0,
                list: null,
                total: 0,
                listLoading: true,
                pageQuery: {
                    pageNum: 1,
                    pageSize: 10,
                    importance: undefined,
                    title: undefined,
                    type: undefined,
                    sort: '+id',
                    status: undefined
                },
                importanceOptions: [1, 2, 3],
                sortOptions: [{label: 'ID Ascending', key: '+id'}, {label: 'ID Descending', key: '-id'}],
                showReviewer: false,
                temp: {},
                dialogFormVisible: false,
                dialogPvVisible: false,
                updateRowData: {}
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                this.listLoading = true
                let request = new TestPageRequest()
                request.setPageNum(this.pageQuery.pageNum)
                request.setPageSize(this.pageQuery.pageSize)
                testPage(request).then(res => {
                    this.listLoading = false
                    this.list = res['list']
                    this.total = res['total']
                })
            },
            handleFilter() {
                this.pageQuery.page = 1
                this.getList()
            },
            sortChange(data) {
                const {prop, order} = data
                if (prop === 'id') {
                    this.sortByID(order)
                }
            },
            sortByID(order) {
                if (order === 'ascending') {
                    this.pageQuery.sort = '+id'
                } else {
                    this.pageQuery.sort = '-id'
                }
                this.handleFilter()
            },
            preCreate() {
                this.$refs.createForm.dialogFormVisible = true
            },
            preEdit(row) {
                this.updateRowData = Object.assign({}, row)
                this.$refs.editForm.dialogFormVisible = true
            },
            handleDelete(row) {
                this.$confirm('确认删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    const index = this.list.indexOf(row)
                    this.list.splice(index, 1)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            getSortClass: function (key) {
                const sort = this.pageQuery.sort
                return sort === `+${key}`
                    ? 'ascending'
                    : sort === `-${key}`
                        ? 'descending'
                        : ''
            }
        }
    }
</script>
