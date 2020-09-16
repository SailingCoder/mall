<template>
  <div>
    error
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class extends Vue {
  @Prop()
    private error: string;
}
</script>
<style lang="scss" scoped>
</style>