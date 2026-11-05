<template>
  <li
    class="flex flex-wrap items-center justify-between gap-3 border-2 border-black bg-paper p-3 shadow-brutal-sm"
  >
    <div class="min-w-0">
      <p class="text-sm font-extrabold uppercase leading-tight">{{ item.name }}</p>
      <p class="mt-1 text-xs font-bold">
        ${{ Number(item.price).toFixed(2) }} × {{ item.quantity }}
      </p>
    </div>
    <div class="flex items-center gap-3">
      <p class="text-lg font-black">${{ (Number(item.price) * item.quantity).toFixed(2) }}</p>
      <button
        @click="removeItem(item.id)"
        class="border-2 border-black bg-white px-2 py-1 text-xs font-extrabold uppercase cursor-pointer hover:bg-brand hover:text-white"
      >
        Remove
      </button>
    </div>
  </li>
</template>
<script setup>
import { useCartStore } from '@/stores/Cart'

defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const { remove: removeItem } = useCartStore()
</script>
