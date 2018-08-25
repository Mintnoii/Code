# jQuery-todoList
使用jQuery及第三方插件完成的todoList清单应用
![todoList](http://owoccema2.bkt.clouddn.com/Readme/jQuery/todolist.png)

实现功能：
- 代办任务的增加，删除，标识已完成任务
- 查看任务详情并可编辑更新
- 将数据存储到loaclStorage中
- 设置Task的时间，可以到时响铃提醒

![TaskDetails](http://owoccema2.bkt.clouddn.com/Readme/jQuery/task_details.png)

技术点：
1. DOM元素对象的缓存与各种操作
2. localStorage数据的存取并最大限度的重用数据对象
3. 使用setInterval轮询实现定时提醒功能
4. 实现更强大的自定义alert弹窗（使用Deferred对象和promise）
5. 布局自适应用户对页面的缩放

第三方插件：
- 使用store.js 实现localStorage的读取与存储
- 使用jQuery的datetimepicker插件为Task添加日期和时间
