<template>
    <div>
        <SiteHead />
        <main id="main-content">
            <Home />
        </main>
        <SiteFoot />
    </div>
</template>
<style src="./scss/main.scss" lang="scss"></style>
<script>
    export default {
        data() { 
            return {} 
        },
        mounted() {
            // Load in CodePen 
            let codePenScript = document.createElement('script');
            codePenScript.src = 'https://production-assets.codepen.io/assets/embed/ei.js';
            document.head.appendChild(codePenScript);
        }
    }
</script>
