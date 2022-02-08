<template>
    <div class="stat">
        <div class="stat-icon">
            <i :class="icon" :style="style"></i>
        </div>
        <div class="stat-info">
            <span class="stat-title">{{title}}</span>
            <span class="stat-value">{{value}}</span>
        </div>
    </div>
</template>

<script>
export default ({
   name:'Stat',
   props: ['title', 'value', 'icon', 'color'],
   computed: {
       style() {
           return "color: "+(this.color || "#000")
       }
   }
})
</script>


<style>

</style>