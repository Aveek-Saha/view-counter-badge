<h1 align="center">
    View Counter Badge 
</h1>

<div align="center">
    <img src = "https://view-counter.aveek.workers.dev" alt="View counter badge">
</div>

Count how many views any GitHub readme gets.

# Usage

The view counter badge is meant to be deployed individually for each profile/user. The setup is very simple and there are detailed instructions

# Add counter to README

```html
<img src = "https://<Your cloudflare deployment>.workers.dev" alt="View counter badge">
```

OR

```markdown
![View counter badge](https://<Your cloudflare deployment>.workers.dev)
```

# Customization

You can pass arguments to customize your view counter. The badge is created using `badgen` so all the options supported by `badgen` except for icon and iconWidth can be used.

### Label

Default is `Views`. Can be changed with the `label` parameter.

```
https://<Your cloudflare deployment>.workers.dev?label=Visitors
```

### Label color

Default is `555`. Can be changed with the `labelColor` parameter. Allowed values are rgb values or valid color names (blue, cyan, green, yellow, orange, red, pink, purple, grey, black)

```
https://<Your cloudflare deployment>.workers.dev?labelColor=black
```

### Color

Default is `blue`. Can be changed with the `color` parameter. Allowed values are rgb values or valid color names (blue, cyan, green, yellow, orange, red, pink, purple, grey, black)

```
https://<Your cloudflare deployment>.workers.dev?color=green
```

### Style

Default is `flat`. Can be changed with the `style` parameter. Allowed values are `flat` or `classic`

```
https://<Your cloudflare deployment>.workers.dev?style=classic
```

### Scale

Default is `1`. Can be changed with the `scale` parameter. Allowed values are integers.

```
https://<Your cloudflare deployment>.workers.dev?scale=2
```

