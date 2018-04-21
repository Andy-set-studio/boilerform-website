<template>
    <header class="c-site-head" role="banner">
        <h1 class="[ o-heading o-heading--primary ] [ c-site-head__heading ]">{{ $page.title }}</h1>
        <a class="o-skip-link" href="#main-content">Skip to main content</a>
        <nav class="c-site-head__nav" aria-label="Table of contents">
            <Nav></Nav>
        </nav>
    </header>
</template>
<script>
    export default {
        data() {
            return {};		
        },
        mounted() {
        }
    }
</script>
