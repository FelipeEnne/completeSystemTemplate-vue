<template>
    <div class="admin-pages">
       <PageTitle icon="fa fa-cogs" main="Admin"
            sub="Register" />
        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title='Article' active>
                        <ArticleAdmin />
                    </b-tab>
                     <b-tab title='Categories'>
                        <CategoryAdmin />
                    </b-tab>
                     <b-tab title='User'>
                        <UserAdmin />
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle.vue'
import ArticleAdmin from './ArticleAdmin.vue'
import CategoryAdmin from './CategoryAdmin.vue'
import UserAdmin from './UserAdmin.vue'

export default ({
   name:'AdminPages',
   components: { 
       PageTitle,
       ArticleAdmin,
       CategoryAdmin,
       UserAdmin
    }
})
</script>


<style>

</style>