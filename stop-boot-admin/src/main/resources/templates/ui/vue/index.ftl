<template>
    <div class="app-container">
        <!--分页过滤条件-->
        <div v-permission="['${fullPathToPermission}_PAGE']" class="filter-container" >
            <el-form ref="filterForm" :model="tableQuery">
                <el-row>
                    <#list tableColumnsData as colum>
                    <#if colum.searchShow ==true>
                    <el-col :span="4">
                        <el-form-item prop="${colum.camelColumnName}" label="${colum.chineseName}">
                             <#if colum.componentName =='DateTimePicker'>
                                 <el-date-picker
                                         v-model="tableQuery.${colum.camelColumnName}"
                                         type="datetime"
                                         placeholder="${colum.chineseName}">
                                 </el-date-picker>
                             <#elseif colum.componentName =='DatePicker'>
                                 <el-date-picker
                                         v-model="tableQuery.${colum.camelColumnName}"
                                         type="date"
                                         placeholder="${colum.chineseName}">
                                 </el-date-picker>
                             <#elseif colum.componentName =='TimePicker'>
                                 <el-time-select
                                         v-model="tableQuery.${colum.camelColumnName}"
                                         placeholder="${colum.chineseName}">
                                 </el-time-select>
                             <#elseif colum.componentName =='Select'>
                                 <el-select v-model="tableQuery.${colum.camelColumnName}" placeholder="请选择">
                                     <el-option
                                             v-for="item in this.dictValueMap.${colum.dicKey}"
                                             :key="item.id"
                                             :label="item.dicDesc"
                                             :value="item.dicValue">
                                     </el-option>
                                 </el-select>
                             <#else>
                                 <el-input v-model="tableQuery.${colum.camelColumnName}" placeholder="${colum.chineseName}" style="width: 180px;" class="filter-item"
                                           @keyup.enter.native="handleFilter"/>
                             </#if>
                        </el-form-item>
                    </el-col>
                    </#if>
                    </#list>
                    <!--@click="cleanFilter"-->
                    <el-col :span="4">
                        <div class="el-form-item__label" style="width:50px">&nbsp;</div>
                        <div class="el-form-item__content">
                            <div class="filter-item" style="width: 180px;">
                                <el-button v-permission="['${fullPathToPermission}_PAGE']" class="filter-item" type="danger" icon="el-icon-close" @click="cleanFilter" circle/>
                                <el-button v-permission="['${fullPathToPermission}_PAGE']" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter" circle/>
                                <el-button v-permission="['${fullPathToPermission}_ADD']" class="filter-item" type="success" icon="el-icon-plus" @click="preCreate" circle/>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!--表格-->
        <el-table
                v-permission="['${fullPathToPermission}_PAGE']"
                :key="tableKey"
                v-loading="tableLoading"
                :data="tableData"
                border
                stripe
                empty-text
                fit
                highlight-current-row
                style="width: 100%;"
        >
            <#list tableColumnsData as colum>
            <#if colum.pageShow ==true>
            <el-table-column prop="${colum.camelColumnName}" label="${colum.chineseName}" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.${colum.camelColumnName} }}</span>
                </template>
            </el-table-column>
            </#if>
            </#list>

            <el-table-column  class-name="small-padding fixed-width" label="操作" align="center">
                <template slot-scope="{row}">
                    <el-button v-permission="['${fullPathToPermission}_ONE']"  type="primary" size="mini" @click="preEdit(row)">
                        编辑
                    </el-button>
                    <el-button v-permission="['${fullPathToPermission}_DELETE']" size="mini" type="danger" @click="handleDelete(row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--分页组件-->
        <pagination  v-permission="['${fullPathToPermission}_PAGE']" v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize"
                    @pagination="loadData"/>

        <!--新增组件-->
        <create-form v-permission="['${fullPathToPermission}_ADD']"  ref="createForm" :rowData='createRowData'  @loadData="loadData"></create-form>

        <!--编辑组件-->
        <edit-form v-permission="['${fullPathToPermission}_UPDATE']" ref="editForm" :rowData='editRowData'  @loadData="loadData"></edit-form>

    </div>
</template>

<script>
    //分页组件
    import Pagination from '@/components/Pagination'
    //新增组件
    import createForm from './create'
    //编辑组件
    import editForm from './edit'
    //${model?cap_first} page 接口
    import {${model?cap_first}PageRequest} from '@${jsSdkConfigPath}${fullPath}/page'
    //${model?cap_first} delete 接口
    import {${model?cap_first}DeleteRequest} from '@${jsSdkConfigPath}${fullPath}/delete'
    //接口混入
    import api from '@/mixins/api'

    export default {
        name: '${model?cap_first}-Table',
        components: {Pagination, createForm, editForm},
        mixins: [api],
        data() {
            return {
                tableKey: '${model?cap_first}',
                total: 0,
                tableLoading: true,
                tableQuery: {
                    <#list tableColumnsData as colum>
                    <#if colum.searchShow ==true>
                    ${colum.camelColumnName}: undefined,
                     </#if>
                    </#list>
                },
                dialogFormVisible: false,
                editRowData: {},
                createRowData:{},
                deleteParams:{
                    id:undefined
                }
            }
        },
        filters: {},
        created() {
            this.loadData()
            <#list tableColumnsData as colum>
            <#if colum.searchShow ==true>
            <#if colum.componentName =='Select'>
            this.dict('${colum.dicKey}')
            </#if>
            </#if>
            </#list>
        },
        methods: {
            loadData() {
                this.$nextTick(() => {
                    //加载数据
                    let request = new ${model?cap_first}PageRequest();
                    request.setParams(this.tableQuery)
                    this.page(request)
                })
            },
            handleFilter() {
                this.tableQuery.pageNum = 1
                this.loadData()
            },
            cleanFilter() {
                this.$refs['filterForm'].resetFields();
                this.loadData()
            },
            preCreate(row) {
                this.createRowData = Object.assign({}, row)
                this.$refs.createForm.dialogFormVisible = true
            },
            preEdit(row) {
                this.editRowData = Object.assign({}, row)
                this.$refs.editForm.dialogFormVisible = true
            },
            handleDelete(row) {
                let request = new ${model?cap_first}DeleteRequest()
                this.deleteParams.id = row.id
                request.setParams(this.deleteParams)
                this.delete(request).then(res => {
                    this.loadData()
                })
            }
        }
    }
</script>
