<template>
    <div class="user-admin">
       <h1>Component User</h1>
       <b-table hover striped :items="users" :fields="fields" >
       </b-table>
    </div>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'

export default ({
   name:'UserAdmin',
   data: function() {
      return {
         mode: 'save',
         user: {},
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
      }
   },
   mounted() {
      this.loadUsers()
   }
})
</script>


<style>

</style>