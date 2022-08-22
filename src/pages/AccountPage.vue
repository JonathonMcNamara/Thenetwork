<template>
<div class="">
    <div class="container">
      <div class="row" >
        <div class="col-3"><img class="rounded" :src="account.picture" alt="" /></div>
        <div class="col-3" ><h1>Welcome {{ account.name }}</h1></div>
      </div>
      <div class="row">
        <div class="col-12">
          <AccountForm/>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Account',
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>

</style>
