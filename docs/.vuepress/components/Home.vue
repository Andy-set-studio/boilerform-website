<template>
    <div>
        <section class="c-section">
            <article class="[ o-article ] [ flow-vertical--double ]">
                <h2 class="is-hidden--text">{{ $page.hidden_intro_heading }}</h2>
                <Content />
                <div class="c-button-group">
                    <a class="o-button" href="https://patterns.boilerform.design">See the pattern library</a>
                    <a class="o-button o-button--rev" href="//github.com/hankchizljaw/boilerform">See the GitHub <abbr title="Repository">repo</abbr></a>
                </div>
            </article>
        </section>
        <section class="[ c-section ] [ flow-vertical--double ]" id="examples">
            <h2 class="[ o-heading o-heading--primary ] [ breathe--double-bottom ]">Examples</h2>
            <article class="flow-vertical--midi" aria-live="polite" v-for="item in samples">
                <h3 class="o-heading o-heading--secondary">{{ item.title }}</h3>
                <p data-height="450" 
                    data-theme-id="dark" 
                    :data-slug-hash="item.codepen_code" 
                    data-default-tab="result" 
                    data-user="hankchizljaw" 
                    data-embed-version="2" 
                    :data-pen-title="item.title" 
                    class="codepen">See the Pen <a href="https://codepen.io/hankchizljaw/pen/Yrmxqw/">{{ item.title }}</a> by Andy Bell (<a href="https://codepen.io/hankchizljaw">@hankchizljaw</a>) on <a href="https://codepen.io">CodePen</a>.</p>
            </article>
        </section>
        <section class="c-section" id="getting-started">
            <article class="[ o-article ] [ flow-vertical--double ]">
                <h2 class="o-heading o-heading--primary">Getting started</h2>
                import getting started content
            </article>
        </section>
        <section class="c-section" id="get-involved">
            <article class="[ o-article ] [ flow-vertical--double ]">
                <h2 class="o-heading o-heading--primary">Get involved</h2>
                import get involved content
                <div class="c-button-group">
                    <a class="o-button" href="//github.com/hankchizljaw/boilerform">Go to the GitHub Repository</a>
                </div>
            </article>
        </section>
    </div>
</template>

<script>
    export default {
        props: {
        },
        data() {
            return {
                samples: [
                    {
                        title: 'Contact form',
                        codepen_code: 'c65048c6acb28ac0d14df136aed8d87b'
                    },
                    {
                        title: 'Card payment',
                        codepen_code: '2e426f1a849ebddd8ab355fa2e45342d'
                    },
                    {
                        title: 'User signup',
                        codepen_code: 'a82a2303b4044f7c53bf04378075590f'
                    }
                ]
            };		
        },
        mounted() {
        }
    }
</script>
