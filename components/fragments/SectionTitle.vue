<template>
    <div class="text-center">
        <h1><slot/></h1>
            <!-- <div>
                <fragments-small-collection></fragments-small-collection>
            </div> -->
    </div>
</template>

<style scoped>
@font-face {
    font-family: "Lobster";
     src: url("/fonts/Lobster-Regular.ttf");
}
    
    h1{
        display: inline-block;
        font-size: 3rem;
        font-family: "Lobster",sans-serif;
        /* color: ; */
        margin: 10px;
        border-bottom: 1px solid var(--primary-color);
    }

</style>