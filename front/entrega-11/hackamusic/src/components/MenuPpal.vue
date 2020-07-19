<template>
    <div>
        <div id="nav">
            <router-link :to="{name: 'Home'}">Home</router-link>
            <router-link :to="{name: 'About'}">About</router-link>
            <router-link :to="{name: 'TopArtists'}">Artists</router-link>
            <router-link :to="{name: 'TopTracks'}">Tracks</router-link>
        </div>
    </div>
</template>
<script>
    export default {
        name:'MenuPpal',
    }
</script>