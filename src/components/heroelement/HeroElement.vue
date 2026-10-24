<template>
  <div class="bg-white border-4 border-black shadow-brutal p-4 text-center">
    <p class="text-4xl font-black">{{ NumberA }}</p>
    <p class="text-xs font-extrabold uppercase mt-1">{{ NameA }}</p>
  </div>
</template>

<script>
export default {
  props: ['NumberA', 'NameA'],
}
</script>
