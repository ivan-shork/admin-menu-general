<template>
    <div>
        <Container />
        <input v-model="name" />
    </div>
</template>

<script>
    import {Container} from '@xysfe/admin-menu-components'
    import {ref} from 'vue'
    export default {
        components: {
            Container
        },
        setup() {
            let name = ref('aven')

            return {
                name
            }
        }
    }
</script>