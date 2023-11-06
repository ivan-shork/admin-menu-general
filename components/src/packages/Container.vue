<template>
    <div>
        {{ a }}
    </div>

</template>


<script>
    import {defineComponent, ref} from 'vue-demi'
    export default defineComponent({
        setup() {
            const a = ref(2)
            return {
                a
            }
        }
    })
</script>