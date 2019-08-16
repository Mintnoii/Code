## 判断是否为空的 JS 公共方法

```js
/**
/**
 * 判断参数是否为空
 * @param {[type]} keys [description]
 */
var IsEmpty = function(keys){
    if (typeof(keys) === "string") {
        keys = keys.replace(/(^\s*)|(\s*$)/g, "");
        if (keys == "" || keys == null || keys == 'null' || keys == undefined || keys == 'undefined') {
            return true
        } else {
            return false
        }
    } else if (typeof(keys) === 'undefined') {
        return true;
    } else {
        if (typeof(keys) == "object") {
            for(let i in keys){
                return false;
            }
            return true;
        }
    }
};
export {IsEmpty};
```

