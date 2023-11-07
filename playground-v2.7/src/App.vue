<template>
    <div>
        <Container />
        <input v-model="name" />
    </div>
</template>

<script>
    import {Container} from '@xysfe/admin-menu-components'
    export default {
        components: {
            Container
        },
        data() {
            return {
                name: 'sdsd'
            }
        }
    }
</script>