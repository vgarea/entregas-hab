<template>
    <main id='error'>
        <vue-headful title='ERROR' />
        <header>
            <h1>404 - Parece que te has perdido</h1>
        </header>
        <aside>
            <button @click='goToHome'>Puedes acceder aquí a los <i class='icoWh logo bg'></i>FEIVS</button>
        </aside>
    </main>  
</template>

<script>
export default {
    name: 'ErrorView',
    methods: {
        goToHome() {
            this.$router.push('/');
        }        
    },
}
</script>

<style scoped>
#error header {
    background-image: url('../assets/oops.jpg');
    height: calc(100vh - 78px);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: left;
}
#error header h1 {
    width: 50%;
    font-size: 3rem;
    text-align: right;
    position: relative;
    top: 8rem;
}
#error aside {
    display: flex;
    position: absolute;
    top: 50vh;
    left: calc(100vw - 250px - 6rem);
}
#error aside button {
    width: 250px;
    font-size: 2rem;
    padding: 1rem;
}
@media(max-width: 600px) {
    #error header {
        background-position: center;
    }
    #error header h1 {
        width: 100%;
        font-size: 2rem;
        text-align: right;
        position: relative;
        top: 6rem;
    }
}
</style>