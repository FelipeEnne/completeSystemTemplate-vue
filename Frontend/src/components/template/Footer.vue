<template>
    <footer class="footer">
        <span>Made by Felipe Enne Mendes Ribeiro</span>
    </footer>
</template>

<script>
export default ({
    name: 'Footer'
})
</script>


<style>
    .footer {
        grid-area: footer;
        background-color: #DDD;
        color: #333;

        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 10px;
    }
</style>