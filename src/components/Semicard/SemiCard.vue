<template>
  <ul class="space-y-3">
    <!-- 6a. CART ROWS (3 copies) -->
    <li class="flex items-center justify-between gap-3 border-2 border-black bg-paper p-3">
      <div>
        <p class="text-sm font-extrabold uppercase">{{ item.name }}</p>
        <p class="text-xs font-medium">${{ item.price.toFixed(2) }} × {{ item.quantity }}</p>
      </div>
      <div class="flex items-center gap-3">
        <p class="font-black">${{ (item.price * item.quantity).toFixed(2) }}</p>
        <button
          @click="$emit('remove', item)"
          class="border-2 border-black bg-white px-2 py-1 text-xs font-extrabold uppercase cursor-pointer hover:bg-brand hover:text-white"
        >
          Remove
        </button>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  props: ['item', 'remove'],
}
</script>
