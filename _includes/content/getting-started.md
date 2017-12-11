Boilerform is designed to be straight-forward to implement. In it's most basic form, you can drop a css file into your head with the following snippet:

```html
<link rel="stylesheet" media="all" href="{PATH TO CDN}" />
```

You can also take compiled CSS and HTML from the [dist directory](https://github.com/hankchizljaw/boilerform/tree/master/dist/) of this repo, if that's what you prefer.

If you want a bit more control, you can work with the [Sass](https://github.com/hankchizljaw/boilerform/tree/master/assets/scss) and [Pattern Library](https://github.com/hankchizljaw/boilerform/tree/master/pattern-library) . This is where the source of Boilerform lives.

To compile assets, you can run the following commands in your terminal:

- `sass` will compile your Sass once
- `watch` will compile your assets and watch for further changes
- `build` will compile your Sass and other assets into a production ready state

The pattern library is powered by [Astrum](http://astrum.nodividestudio.com/) . You can find [detailed documentation here](https://github.com/NoDivide/Astrum) .