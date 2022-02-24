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
<img
    src="https://<Your-cloudflare-deployment>.workers.dev"
    alt="View counter badge"
/>
```

OR

```markdown
![View counter badge](https://<Your-cloudflare-deployment>.workers.dev)
```

# Customization

You can pass arguments to customize your view counter. The badge is created using `badgen` so all the options supported by `badgen` except for icon and iconWidth can be used.


|  Parameter   | Default |         Allowed values          |      Example       |
| :----------: | :-----: | :-----------------------------: | :----------------: |
|   `label`    |  Views  |           Any string            |  `label=Visitors`  |
| `labelColor` |   555   | RGB values or valid color names | `labelColor=black` |
|   `color`    |  blue   | RGB values or valid color names |   `color=green`    |
|   `style`    |  flat   |       `flat` or `classic`       |  `style=classic`   |
|   `scale`    |    1    |           Any integer           |     `scale=2`      |

Valid color names are:
```
blue, cyan, green, yellow, orange, red, pink, purple, grey, black
```

Example of a counter with parameters:

```
https://<Your cloudflare deployment>.workers.dev?style=classic&labelColor=black&color=green
```