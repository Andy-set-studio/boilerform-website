<template>
    <ul class="c-nav">
        <li class="c-nav__item" v-for="item in items">
            <a class="c-nav__link" :href="item.link" :aria-label="item.label">{{ item.text }}</a>
        </li>
    </ul>
</template>

<script>
    export default {
        props: {
        },
        data() {
            return {
                items: [
                    {
                        text: 'Examples',
                        link: '#examples'
                    },
                    {
                        text: 'Getting started',
                        link: '#getting-started'
                    },
                    {
                        text: 'GitHub',
                        label: 'See this project on Github.com',
                        link: '//github.com/hankchizljaw/boilerform'
                    }
                ]
            };		
        },
        mounted() {
        }
    }
</script>
