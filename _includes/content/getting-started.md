Boilerform is designed to be straight-forward to implement. In its most basic form, you can drop a CSS file into your head with the following snippet:

```html
<link rel="stylesheet" media="all" href="https://cdn.jsdelivr.net/gh/hankchizljaw/boilerform@master/dist/css/boilerform.min.css" />
```

Then all you need to do is wrap your elements in a `.boilerform` wrapper. It could be something like this:

```html
<div class="boilerform">
    <!-- Add all of your boilerform elements in here 👍🏼 -->
</div>
```

You can also take compiled CSS and HTML from the [dist directory](https://github.com/hankchizljaw/boilerform/tree/master/dist/) of this repository, if that's what you prefer.

If you want a bit more control, you can work with the [Sass](https://github.com/hankchizljaw/boilerform/tree/master/assets/scss) and [Pattern Library](https://github.com/hankchizljaw/boilerform/tree/master/pattern-library). This is where the source of Boilerform lives.

To compile assets, you can run the following commands in your terminal:

- `npm run watch` will compile your assets and watch for further changes
- `npm run build` will compile your assets into a production ready state in the `dist` directory

The pattern library is powered by [Astrum](http://astrum.nodividestudio.com/). You can find [detailed documentation here](https://github.com/NoDivide/Astrum).
