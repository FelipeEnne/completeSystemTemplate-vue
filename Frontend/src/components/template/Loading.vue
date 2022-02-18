<template>
    <div class="loading">
        <img src="@/assets/loading.gif" alt="Loading">
    </div>
</template>

<script>
export default ({
    name: 'Loading'
})
</script>


<style>
    .loading {
        grid-area: content;

        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>