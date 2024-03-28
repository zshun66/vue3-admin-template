<script setup name="backstage:directive:draggable">

</script>

<template>
  <div class="page_container draggable_page">
    <img class="home-img" src="@/assets/images/welcome.png" alt="welcome" />
  </div>
</template>

<style scoped lang="scss">
.draggable_page {
  display: flex;
  align-items: center;
  justify-content: center;
  .home-img {
    width: 935px;
  }
}
</style>