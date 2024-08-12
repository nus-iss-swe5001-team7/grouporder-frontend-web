<template>
<router-view/>
</template>


<script>

export default {
  name: 'App',

  mounted() {
    document.title = "Group Food Order";
  }
}
</script>

<style lang="scss" src="./App.scss"></style>
