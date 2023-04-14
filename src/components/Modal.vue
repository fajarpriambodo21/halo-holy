<template>
  <div class="">
    <b-modal
      hide-header
      hide-footer
      :data="detail"
      id="modalData"
      centered
      title="Detail Data"
    >
      <p class="fs-5 fw-bold">Edit Data</p>
      <hr />
      <b-form @submit.stop.prevent="onSubmit()">
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
            :state="isTitleStateValid"
            v-model="state.create.title"
            placeholder="Enter title"
            required
          ></b-form-input>
          <div
            class="input-errors"
            v-for="error in v$.create.title.$errors"
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
            :state="isBodyStateValid"
            v-model="state.create.body"
            placeholder="Enter content"
            required
          ></b-form-input>
          <div
            class="input-errors"
            v-for="error in v$.create.body.$errors"
            :key="error.$uid"
          >
            <div class="error-msg text-danger">{{ error.$message }}</div>
          </div>
        </b-form-group>
        <b-row class="text-end">
          <b-col @click="submitEdit(typeInput)" cols="6"
            ><b-btn variant="success" class="fw-bold w-100"
              >Submit</b-btn
            ></b-col
          >
          <b-col cols="6"
            ><b-btn class="fw-bold w-100" @click="hideModaledit()"
              >Close</b-btn
            ></b-col
          >
        </b-row>
      </b-form>
    </b-modal>
  </div>
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
            create:{
                title:null,
                body:null,
                userId:null,
            },
        })
        const rules = computed(()=>{
            return{
                create: {
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
            typeInput:''
        }
    },
    methods:{
        createData(){
            this.state.create = {
                title: null,
                body: null
            };
            this.$nextTick(() => { this.$v.$reset() })
            this.typeInput = 'create';
            this.$bvModal.show('modalData')
        },
        isTitleValid() {
            return this.state.create.title.length > 3 ? true : false; //your validation criteria goes here
        },
        isBodyValid() {
            return this.state.create.body.length > 3 ? true : false; //your validation criteria goes here
        },
        detailEdit(data){
            this.create = {
                title: null,
                body: null
            };
            this.typeInput = 'edit';
            this.state.create = Object.assign({}, data.value);
            this.$bvModal.show('modalData')
        },
        async submitEdit(type){
            if(type == 'create'){
                await this.v$.$validate()
                if(!this.v$.$error){
                    alert('succes')
                }else{
                    alert('failed')
                }
            }
            if(type == 'edit'){
                await this.v$.$validate()
                if(!this.v$.$error){
                    alert('succes')
                }else{
                    alert('failed')
                }
            }
        },
        hideModalDetail(){
            this.$bvModal.hide('modal-center')
        },
        hideModaledit(){
            this.$emit('close');
            this.$bvModal.hide('modalData')
            this.create = {
                title: null,
                body: null
            };
        }
    },
    computed:{
        isTitleStateValid(){
            if (this.state.create.title) {
            return this.isTitleValid(this.state.create.title);
            }
            return null;
        },
        isBodyStateValid(){
            if (this.state.create.body) {
            return this.isBodyValid(this.state.create.body);
            }
            return null;
        },
    }, 
}
</script>