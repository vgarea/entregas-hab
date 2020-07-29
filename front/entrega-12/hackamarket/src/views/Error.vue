<template>
    <div class='error'>
        <vue-headful title='Error' />
        <header>
            <h1>404 - Parece que te has perdido</h1>
            <h2>y tus muebles se han fugado!!!</h2>
            <p>Vuelve a productos si quieres recuperarlos ;)</p>
        </header>
    </div>
  
</template>

<script>
export default {
    name: 'Error'
}
</script>

<style scoped>
.error {
    height: 100vh;
    margin: 0 auto;
    background-image: url(../assets/404.jpg);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}
.error header {
    padding: 16rem 1rem 0 0;
    text-align: right;
    float: right;
    line-height: 1.2;
}
.error header h1 {
    font-size: 2rem;
    max-width: 150px;
    color: var(--accent);
    text-shadow: 1px 1px 2px var(--gray); 
    margin-bottom: 1rem;   
}
.error header h2 {
    font-size: 1.5rem;
    color: var(--accent);
    text-shadow: 1px 1px 2px var(--gray);
    margin-top: 0;
}
@media(min-width: 320px) {
    .error header {
        padding: 16rem 1rem 0 0;
    }
    .error header h1 {
        font-size: 2rem;
        max-width: 150px;
    }
}
@media (min-width: 600px) {
    .error header {
        padding: 10rem 2rem 0 0;
    }
    .error header h1 {
        font-size: 2rem;
        max-width: 200px;
    }
}
@media (min-width: 800px) {
    .error header {
        padding: 16rem 14rem 0 0;
    }
    .error header h1 {
        font-size: 4rem;
        max-width: 550px;
    }
}
</style>