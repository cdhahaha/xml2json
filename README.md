# xml2json
xml转化为json

## 安装

> npm

命令行输入
```Javascript
    npm install -save-dev chend-xml2json
```

> ```script``` 引用

获取组件源码, git地址
```javascript
    https://github.com/cdhahaha/xml2json.git
```

创建一个```.html```文件,在项目中引入源码 **lib** 文件夹中的```index.js```

```HTML
    <script src="index.js"></script> 
```

## 使用

### DEMO

```xml
<?xml version="1.0" encoding="GB2312"?>
<note>
    <to by="msg">George</to>
    <from>John</from>
    <heading>
        <title>Reminder</title>
        <subtitle>Subtitle</subtitle>
    </heading>
    <body>Don't forget the meeting!</body>
</note>
```

```javascript
    import xml2json from 'chend-xml2json';
    
    xml2json('static/read.xml').then(res => {
        console.log(res) // res为转化后的JSON数据
    }).catch(e => {
        console.log(e)
    })
```

res返回的数据格式 

```javascript
    {
        "note": {
            "body": [{
                attrs: {
                    "by": "msg"
                }
            }],
            "from": [{}],
            "heading": [{
                "children": {
                    "title": [],
                    "subtitle": []
                }
            }],
            "body": [{}]
        }
    }
```