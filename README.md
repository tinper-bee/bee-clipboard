# bee-clipboard

[![npm version](https://img.shields.io/npm/v/bee-clipboard.svg)](https://www.npmjs.com/package/bee-clipboard)
[![Build Status](https://img.shields.io/travis/tinper-bee/bee-clipboard/master.svg)](https://travis-ci.org/tinper-bee/bee-clipboard)
[![Coverage Status](https://coveralls.io/repos/github/tinper-bee/bee-clipboard/badge.svg?branch=master)](https://coveralls.io/github/tinper-bee/bee-clipboard?branch=master)
[![devDependency Status](https://img.shields.io/david/dev/tinper-bee/bee-clipboard.svg)](https://david-dm.org/tinper-bee/bee-clipboard#info=devDependencies)
[![NPM downloads](http://img.shields.io/npm/dm/bee-clipboard.svg?style=flat)](https://npmjs.org/package/bee-clipboard)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/tinper-bee/bee-clipboard.svg)](http://isitmaintained.com/project/tinper-bee/bee-clipboard "Average time to resolve an issue")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/tinper-bee/bee-clipboard.svg)](http://isitmaintained.com/project/tinper-bee/bee-clipboard "Percentage of issues still open")

>基于clipboard.js封装的复制组件

## Browser Support

| <img src="https://clipboardjs.com/assets/images/chrome.png" width="48px" height="48px" alt="Chrome logo"> | <img src="https://clipboardjs.com/assets/images/edge.png" width="48px" height="48px" alt="Edge logo"> | <img src="https://clipboardjs.com/assets/images/firefox.png" width="48px" height="48px" alt="Firefox logo"> | <img src="https://clipboardjs.com/assets/images/ie.png" width="48px" height="48px" alt="Internet Explorer logo"> | <img src="https://clipboardjs.com/assets/images/opera.png" width="48px" height="48px" alt="Opera logo"> | <img src="https://clipboardjs.com/assets/images/safari.png" width="48px" height="48px" alt="Safari logo"> |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 42+ ✔ | 12+ ✔ | 41+ ✔ | 9+ ✔ | 29+ ✔ | 10+ ✔ |


react bee-clipboard component for tinper-bee

复制组件

## 使用方法

```js
import Modal from 'bee-clipboard';

class ClipboardDemo extends Component {
    render() {
        function success() {
            console.log('success');
        }

        function error() {
            console.log('error');
        }

        return (
            <Clipboard action="copy" text="我将被复制到剪切板" success={success} error={error}>

            </Clipboard>
        )
    }
}
```

#### 样式引入
- 可以使用link引入build目录下Clipboard.css
```
<link rel="stylesheet" href="./node_modules/bee-modal/build/Clipboard.css">
```
- 可以在js中import样式
```js
import "./node_modules/bee-modal/src/Clipboard.scss"
//或是
import "./node_modules/bee-modal/build/Clipboard.css"
```



## API

|参数|说明|类型|默认值|
|:---|:---:|:--:|---:|
|text|要复制的文本内容|`string`|-|
|target|要复制内容的目标元素，可传选择器，如果选择器得出多个，会取第一个|`string`|-|
|success|复制成功之后的回调函数|`function`|-|
|error|复制失败之后的回调函数|`function`|-|

#### 开发调试

```sh
$ npm install -g bee-tools
$ git clone https://github.com/tinper-bee/bee-clipboard
$ cd bee-clipboard
$ npm install
$ npm run dev
```
