<template>
    <div>
        首页
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

@Component({
    methods: {
        ...mapActions('user', [
            'action_userdata'
        ]),
    },
    components:{}
})

export default class extends Vue{
    private title:any = '首页';

    asyncData (context) {
        // const body = context.res.body;
        if (!context.res) return;
        return { 
        
        }
    }
    head(){
        return {
            link: [],
            title: this.title,
            script: []
        }
    }

    created () {
       
    }

    // computed
    // get computed_userdata():any {
    //     return this.$store.state.userdata;
    // }

    mounted(){
    }

    // 组件每次加载前被调用（在服务端或切换至目标路由之前）
    async fetch({ app, store, params }) {

    }
}

</script>
<style lang="scss" scoped>

</style>



