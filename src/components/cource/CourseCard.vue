<template>
    <article class="bg-white border-4 border-black shadow-brutal flex flex-col">
        <div class="bg-red-600 relative h-36 border-b-4 border-black flex items-end p-3">
            <span class="text-3xl font-black leading-none">{{course.full_name }}</span>
        </div>
        <span class="absolute top-3 right-3 text-xs font-extrabold uppercase px-2 py-1 bg-brand text-white border-2 border-white">{{ course.avatar_url }}</span>
        <div class="p-4 flex flex-col gap-2 grow">
            <h3 class="text-lg font-black uppercase leading-tight">{{ course.id }}</h3>
        </div>
    </article>
</template>
<script>
export default {
    props: {
        course: {
            type: Object,
            default: () => {
                return {
                    id: '',
                    full_name: '',
                    avatar_url: '',

                }
            }
        }
    }
}
</script>
