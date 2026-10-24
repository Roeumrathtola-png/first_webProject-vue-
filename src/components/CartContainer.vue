<template>
  <!-- ================= 6. CART ================= -->
        <section id="cart" class="max-w-3xl mx-auto px-6 py-14">
            <div class="flex items-center gap-3 mb-6">
                <div class="w-4 h-4 bg-brand border-2 border-black"></div>
                <h2 class="text-2xl font-black uppercase">{{ `Your cart (${cartItems.length} items)` }}</h2>
            </div>

            <div class="bg-white border-4 border-black shadow-brutal p-5">
                <ul class="space-y-3">
                    <!-- 6a. CART ROWS (3 copies) -->
                    <li class="flex items-center justify-between gap-3 border-2 border-black bg-paper p-3">
                        <div>
                            <p class="text-sm font-extrabold uppercase">{{ item.name }}</p>
                            <p class="text-xs font-medium">${{ item.price.toFixed(2) }} × {{ item.quantity }}</p>
                        </div>
                        <div class="flex items-center gap-3">
                            <p class="font-black">${{ (item.price * item.quantity).toFixed(2) }}</p>
                            <button class="border-2 border-black bg-white px-2 py-1 text-xs font-extrabold uppercase cursor-pointer hover:bg-brand hover:text-white">Remove</button>
                        </div>
                    </li>
                    <li class="flex items-center justify-between gap-3 border-2 border-black bg-paper p-3">
                        <div>
                            <p class="text-sm font-extrabold uppercase">{{ item.name }} </p>
                            <p class="text-xs font-medium">${{ item.price.toFixed(2) }} × {{ item.quantity }}</p>
                        </div>
                        <div class="flex items-center gap-3">
                            <p class="font-black">${{ (item.price * item.quantity).toFixed(2) }}</p>
                            <button class="border-2 border-black bg-white px-2 py-1 text-xs font-extrabold uppercase cursor-pointer hover:bg-brand hover:text-white">Remove</button>
                        </div>
                    </li>
                    <li class="flex items-center justify-between gap-3 border-2 border-black bg-paper p-3">
                        <div>
                            <p class="text-sm font-extrabold uppercase">{{ item.name }} </p>
                            <p class="text-xs font-medium">${{ item.price.toFixed(2) }} × {{ item.quantity }}</p>
                        </div>
                        <div class="flex items-center gap-3">
                            <p class="font-black">${{ (item.price * item.quantity).toFixed(2) }}     </p>
                            <button class="border-2 border-black bg-white px-2 py-1 text-xs font-extrabold uppercase cursor-pointer hover:bg-brand hover:text-white">Remove</button>
                        </div>
                    </li>
                </ul>

                <!-- 6b. EMPTY CART (hidden now — show it when the cart has no rows) -->
                <p class="hidden border-2 border-black bg-paper p-4 text-center font-extrabold uppercase">Your cart is empty.</p>

                <div class="mt-5 pt-5 border-t-4 border-black flex flex-wrap items-center justify-between gap-4">
                    <p class="text-2xl font-black uppercase">Total: $42.00</p>
                    <div class="flex gap-3">
                        <button class="border-2 border-black bg-white px-4 py-2 text-sm font-extrabold uppercase cursor-pointer">Clear</button>
                        <button class="border-2 border-black bg-brand text-white shadow-brutal-sm px-4 py-2 text-sm font-extrabold uppercase cursor-pointer hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none">Checkout</button>
                    </div>
                </div>
            </div>
        </section>
</template>
<script>
export default {
  components: {

  },

  data(){
    return {
      cartItems: [
        { name: 'Semicolon Sticker Pack', price: 4.00, quantity: 2 },
        { name: 'Git Push Mug', price: 12.00, quantity: 1 },
        { name: 'Dark Mode Tee', price: 22.00, quantity: 1 }
      ]
    }



  }


}
</script>
