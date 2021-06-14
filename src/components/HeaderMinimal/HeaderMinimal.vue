<template>
    <div class="header-minimal">
        <div id="header" class="col-12" style="background-color:black;height:15vh;">
            <nav class="navbar">
                <router-link to="/">
                    <a class="navbar-brand col-xs-1 d-flex align-items-end" href="#" title="Home">
                        <img class="ml-2" src="../../../img/MyFit_logo3.png" width="200rem" height="90vh">
                    </a>
                </router-link>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HeaderMinimal',
    data () {
        return {}
    }
}
</script>

<style scoped lang="scss">
</style>
