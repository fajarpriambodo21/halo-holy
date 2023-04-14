<template>
  <b-form class="text-start" >
    <p class="text-dark fs-5 fw-bold mb-0">{{ titleSubmit }}</p>
    <b-form-group
      id="input-group-1"
      label="Title :"
      label-for="input-1"
      class="mb-3"
    >
      <b-form-input
        aria-describedby="input-live-help input-live-feedback"
        trim
        id="input-1"
        :state="v$.form.title.$error == true ? false : null"
        v-model="state.form.title"
        placeholder="Enter title"
        required
      ></b-form-input>
      <div
        class="input-errors"
        v-for="error in v$.form.title.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-danger">{{ error.$message }}</div>
      </div>
    </b-form-group>
    <b-form-group
      id="input-group-2"
      label="Content :"
      label-for="input-2"
      class="mb-3"
    >
      <b-form-input
        id="input-2"
        :state="v$.form.body.$error == true ? false : null"
        v-model="state.form.body"
        placeholder="Enter content"
        required
      ></b-form-input>
      <div
        class="input-errors"
        v-for="error in v$.form.body.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-danger">{{ error.$message }}</div>
      </div>
    </b-form-group>
    <b-row class="text-end">
      <b-col @click="submitCreate(state.form.id)" cols="6"
        ><b-btn variant="success" class="fw-bold w-100">{{ typeSubmit }}</b-btn></b-col
      >
      <b-col cols="6"
        ><b-btn class="fw-bold w-100" @click="$router.go(-1)"
          >Back</b-btn
        ></b-col
      >
    </b-row>
  </b-form>
</template>
<script>
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { reactive, computed } from 'vue'
import axios from "axios"
export default{
    name:"Modal",
    setup(){
        const state = reactive({
            form:{
                title:null,
                body:null,
            },
        })
        const rules = computed(()=>{
            return{
                form: {
                    title: {
                        required,
                        $autoDirty: true
                    },
                    body: {
                        required,
                        $autoDirty: true
                    }
                }
            }
        })
        const v$ = useVuelidate(rules, state, { $lazy: true })
        return{
            state,
            v$
        }
    },
    data() {
        return {
          typeSubmit:null,
          titleSubmit:null,
        }
    },
    methods:{
      async detailData(){
            const name = this.$route.name
            const id = this.$route.params.id
            if(id == 'create'){
              this.typeSubmit = 'Submit'
            }else{
              this.typeSubmit = 'Edit'
              const response = await axios.get("https://jsonplaceholder.typicode.com/posts/"+id);
              console.log(response);
              this.state.form = response.data
            }
        },
        async submitCreate(type){
                const name = this.$route.name
                const id = this.$route.params.id
                if(name === 'create'){
                  await this.v$.$validate()
                  if (!this.v$.$error) {
                    const createPost = await axios.post("https://jsonplaceholder.typicode.com/posts", {
                      userId: 1,
                      title: this.state.form.title,
                      body: this.state.form.body,
                    });
                    if (createPost.status == 201) {
                      this.$router.push('/', () => {
                        this.$bvToast.toast('Create Data Failed', {
                        variant: 'danger',
                        solid: true,
                        noCloseButton: true,
                        autoHideDelay: 5000,
                      })
                    });
                    } else {
                      this.$bvToast.toast('Create Data Failed', {
                        variant: 'danger',
                        solid: true,
                        noCloseButton: true,
                        autoHideDelay: 5000,
                      })
                    }
                  } else {
                    this.$bvToast.toast('Create Data Failed', {
                      variant: 'danger',
                      solid: true,
                      noCloseButton: true,
                      autoHideDelay: 5000,
                    })
                  }
                }
                if(name === 'edit'){
                  await this.v$.$validate()
                  if (!this.v$.$error) {
                    const editPost = await axios.put("https://jsonplaceholder.typicode.com/posts/"+id, {
                      userId: 1,
                      userId: id,
                      title: this.state.form.title,
                      body: this.state.form.body,
                    });
                    console.log(editPost);
                    if (editPost.status == 200) {
                      this.$router.go(-1)
                    } else {
                      this.$bvToast.toast('Create Data Failed', {
                        variant: 'danger',
                        solid: true,
                        noCloseButton: true,
                        autoHideDelay: 5000,
                      })
                    }
                  } else {
                    this.$bvToast.toast('Create Data Failed', {
                      variant: 'danger',
                      solid: true,
                      noCloseButton: true,
                      autoHideDelay: 5000,
                    })
                  }
                }
        },
    },
    async created(){
      const name = this.$route.name
      if(name == 'create'){
          this.typeSubmit = 'Submit'
          this.titleSubmit = 'Create Data'
        }else{
          this.typeSubmit = 'Edit'
          this.titleSubmit = 'Update Data'

        }
      await this.detailData()
    }
 
}
</script>
