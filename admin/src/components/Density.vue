<template>
    <div class="hello">
        <h1>Customer Density Analysis</h1>
        <img src='./../assets/distribution.png'>
    </div>
</template>

<script>
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default {
    name: 'HelloWorld',
    data () {
        return {
        }
    },
    components: {
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
img {
    max-width: 50vw;
    border: 3px solid gray;
    border-radius:  2px;
}
</style>
