# 原生JS实现时间日期格式化

```javascript
/**
* 时间格式化 返回格式化的时间
* @param date {object}  可选参数，要格式化的data对象，没有则为当前时间
* @param fomat {string} 格式化字符串，例如：'YYYY年MM月DD日 hh时mm分ss秒 星期' 'YYYY/MM/DD week' (中文为星期，英文为week)
* @return {string} 返回格式化的字符串
* 
* 格式：   
*   YYYY：4位年,如1993
*　　YY：2位年,如93
*　　MM：月份
*　　DD：日期
*　　hh：小时
*　　mm：分钟
*　　ss：秒钟
*　　星期：星期，返回如 星期二
*　　周：返回如 周二
*　　week：英文星期全称，返回如 Saturday
*　　www：三位英文星期，返回如 Sat
*/
function formatDate(date, format) {
	// 如果只传了一个参数，而且通过该参数得不到时间戳
    if (arguments.length < 2 && !date.getTime) {
    	// 则参数为格式化字符串 默认时间为当前时间
        format = date
        date = new Date()
    }
    // 默认的格式化时间日期字符串
    typeof format != 'string' && (format = 'YYYY年MM月DD日 hh时mm分ss秒')
    var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', '日', '一', '二', '三', '四', '五', '六']
    return format.replace(/YYYY|YY|MM|DD|hh|mm|ss|星期|周|www|week/g, function(a) {
    	switch (a) {
        	case "YYYY": return date.getFullYear()
            case "YY": return (date.getFullYear()+"").slice(2)
            case "MM": return date.getMonth() + 1;
            // 也可以修改返回的格式化字符串来决定单位数0~9前面是否补0 (下同)
            // case "MM": return (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
            case "DD": return date.getDate()
            case "hh": return date.getHours()
            case "mm": return date.getMinutes()
            case "ss": return date.getSeconds()
            case "星期": return "星期" + week[date.getDay() + 7]
            case "周": return "周" +  week[date.getDay() + 7]
            case "week": return week[date.getDay()]
            case "www": return week[date.getDay()].slice(0,3)
		}
	})
}
```

**使用示例**

```javascript
// 只传入时间戳
formatDate(new Date(1536743179211))

// 重定义返回的格式化字符串
formatDate(new Date("january 01,2012"))
formatDate('YYYY年MM月DD日 hh时mm分ss秒 星期 YYYY-MM-DD week')
formatDate(new Date("january 01,2012"),'YYYY年MM月DD日 hh时mm分ss秒 星期 YYYY/MM/DD week')
```

