<template>
    <div>
        <div class="table-data text-start">
        <h2 class="text-dark fw-bold">Data Post</h2>
        <hr class="text-dark">
        <b-btn class="fw-bold mb-4" variant="primary" @click="createData()">Create</b-btn>
        <b-table strippesd hover :items="postItems" :fields="postFields" class="text-center">
        <template v-slot:cell(actions)="data" >
            <div class="d-flex">
                <span class="pe-2">
                    <b-btn class="fw-bold" @click="editData(data)" text-white variant="warning text-white">Edit</b-btn>
                </span>
                <span class="pe-2">
                    <b-btn class="fw-bold" @click="deleteData(data)" text-white variant="danger text-white">Delete</b-btn>
                </span>
                <span class="">
                    <b-btn class="fw-bold" @click="detailData(data)" text-white variant="info text-white">Detail</b-btn>
                </span>
            </div>
        </template>
    </b-table>
    </div>
    </div>
</template>
<script>
import axios from "axios"
export default {
    data() {
        return {
            postFields: ['title', 'body', 'actions'],
            postItems: [],
            detail: [],
        }
    },
    methods:{
        createData(){
            this.$router.push({ name: 'create'})
        },
        detailData(data){
            const id = Object.assign({}, data.value).id
            this.$router.push({ name: 'detail', params: { id: id } })
        },
        editData(data){
            const id = Object.assign({}, data.value).id
            this.$router.push({ name: 'edit', params: { id: id } })
        },
        async getData(){
            const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
            this.postItems = response.data
            .map(post => {
                return{
                    title:post.title,
                    body:post.body,
                    actions:post,
                }
            })
        },
        async deleteData(data){
            const id = Object.assign({}, data.value).id
            const deleteData = await axios.get("https://jsonplaceholder.typicode.com/posts/"+id);
            if(deleteData.status == 200){
                this.$bvToast.toast('Delete Data Success', {
                    variant: 'success',
                    solid: true,
                    noCloseButton: true,
                    autoHideDelay: 1000,
                })
            }else{
                this.$bvToast.toast('Delete Data Failed', {
                    variant: 'success',
                    solid: true,
                    noCloseButton: true,
                    autoHideDelay: 1000,
                })
            }
        }
    },  
    async created(){
        await this.getData();
    }
}
</script>
<style>
tbody{
    text-align: center !important;
}
</style>
