## 來源
[Creating an Editable Textarea That Supports Syntax-Highlighted Code](https://css-tricks.com/creating-an-editable-textarea-that-supports-syntax-highlighted-code/)

## 需手動載入 Prism
Prism 所用的 css 及 js 需要自己載入。例如

```html
<link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/themes/prism.min.css" rel="stylesheet" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/prism.min.js"></script>
```

不自動載入是為了彈性。例如頁面的其他地方或元件已經有用了 Prism，重覆載入會造成衝突
