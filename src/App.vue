<template>
<BugHeader />
<BugReport />
</template>
  
<script>
import BugHeader from './components/BugHeader.vue'
import BugReport from './components/BugReport.vue';
  
export default {
    name: 'App',
    components: {
      BugHeader,
      BugReport
    }
}
</script>

<style>
#app {
    padding: 0;
    margin: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>  