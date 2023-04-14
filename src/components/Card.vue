<template>
    <b-card class="text-start" bg-variant="white" text-variant="dark">
        <b-card-text>
            <p class="fw-bold fs-5 m-0">Title :</p>
            <p class="mb-2 mt-0">{{ detail.title }}</p>
            <p class="fw-bold fs-5 m-0">Content :</p>
            <p class="mb-2 mt-0">{{ detail.body }}</p>
        </b-card-text>
    </b-card>
</template>
<script>
import axios from "axios";
export default {
    data() {
        return{
            detail:[]
        }
    },
    methods:{
        async detailData(){
            const id = this.$route.params.id
            const response = await axios.get("https://jsonplaceholder.typicode.com/posts/"+id);
            this.detail = response.data
        }
    },
    async created(){
        await this.detailData()
    }
}
</script>
