<template>
    <div class="user-admin">

       <b-form>
          <input id="user-id" type="hidden" v-model="user.id" />
          <b-row>
             <b-col md="6" sm="12">
                <b-form-group label="Name:" label-form="user-name">
                  <b-form-input id="user-name" type="text"
                  v-model="user.name" required
                  :readonly="mode === 'remove'"
                  placeholder="User name"/>
                </b-form-group>
             </b-col>
             <b-col md="6" sm="12">
                <b-form-group label="E-mail:" label-form="user-email">
                  <b-form-input id="user-email" type="text"
                  v-model="user.email" required
                  :readonly="mode === 'remove'"
                  placeholder="User e-mail"/>
                </b-form-group>
             </b-col>
          </b-row>

          <b-form-checkbox
           v-show="mode === 'save'" 
           id="user-admin" v-model="user.admin" 
           class="mt-3 mb-3" >
            Adm
          </b-form-checkbox>

           <b-row v-show="mode === 'save'">
             <b-col md="6" sm="12">
                <b-form-group label="Password:" label-form="user-password">
                  <b-form-input id="user-password" type="password"
                  v-model="user.password" required
                  placeholder="User password"/>
                </b-form-group>
             </b-col>
             <b-col md="6" sm="12">
                <b-form-group label="Confirm password:" label-form="user-confirmPassword">
                  <b-form-input id="user-confirmPassword" type="password"
                  v-model="user.confirmPassword" required
                  placeholder="User confirm password"/>
                </b-form-group>
             </b-col>
          </b-row>
       </b-form>

       <b-row>
         <b-col xs="12">
            <b-button variant="primary" v-if="mode === 'save'"
               @click="save">
               Save
            </b-button>
            <b-button variant="danger" v-if="mode === 'remove'"
               @click="remove">
               Remove
            </b-button>
            <b-button class="ml-2" @click="reset">
               Reset
            </b-button>
         </b-col>
       </b-row>

       <hr>
       <b-table hover striped :items="users" :fields="fields" >
          <template slot="actions" slot-scope="data">
            <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
               <i class="fa fa-pencil"></i>
            </b-button>
            <b-button variant="danger" @click="loadUser(data.item, 'remove')">
               <i class="fa fa-trash"></i>
            </b-button>
          </template>
       </b-table>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default ({
   name:'UserAdmin',
   data: function() {
      return {
         mode: 'save',
         user: {admin: false},
         users: [],
         fields: [
            {key: 'id', label: 'Code', sorteable: true},
            {key: 'name', label: 'Name', sorteable: true},
            {key: 'email', label: 'E-mail', sorteable: true},
            {key: 'admin', label: 'Adm', sorteable: true },
            {key: 'actions', label: 'Actions'}
         ]
      }
   },
   methods: {
      loadUsers() {
         const url = `${baseApiUrl}/users`
         axios.get(url).then(res => {
            this.users = res.data
         })
      },
      reset() {
         this.mode = 'save'
         this.user = {admin: false}
         this.loadUsers()
      },
      save() {
         const method = this.user.id ? 'put' : 'post'
         const id = this.user.id ? `/${this.user.id}` : ''
         axios[method](`${baseApiUrl}/users${id}`, this.user)
            .then(() => {
               this.$toasted.global.defaultSucess()
               this.reset()
            })
            .catch(showError)
      },
      remove() {
         const id = this.user.id
         axios.delete(`${baseApiUrl}/users/${id}`)
            .then(() => {
               this.$toasted.global.defaultSucess()
               this.reset()
            })
            .catch(showError)
      },
      loadUser(user, mode='save'){
         this.mode = mode
         this.user = {...user}
      }
   },   
   mounted() {
      this.loadUsers()
   }
})
</script>


<style>

</style>