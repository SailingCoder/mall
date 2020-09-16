<template>
    <div>
        <nuxt/>
    </div>
</template>

<script lang="ts">
import axios from "axios";
import {Component, Prop, Vue} from 'vue-property-decorator';
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
Vue.use(v => {
    v.prototype.$axios = axios
})
@Component
export default class extends Vue {

    created() {
    }

    mounted(){

    }
}
</script>
<style lang="scss" >

</style>
