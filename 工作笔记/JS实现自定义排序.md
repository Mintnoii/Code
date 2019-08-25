一般情况下我们对数据排序大都按数字或字母顺序，但有些时候也需要我们对后端返回的数据进行前端自定义的排序。

📝**先复习一下 [reduce](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) 方法：**

对数组中的每个元素执行一个自定义的**reducer**函数(升序执行)，将其结果汇总为单个返回值。

`arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])`

**callback**：为数组元素自定义的回调函数，包含四个参数：

> **acc**：累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或`initialValue`。
>
> **cur**：数组中正在处理的元素。
>
> **Idx (可选)**:数组中正在处理的当前元素的索引。 如果提供了`initialValue`，则起始索引号为`0`，否则为`1`。
>
> **arr(可选)**: 调用 `reduce()` 的数组

**initialValue(可选)**:作为第一次调用 `callback` 函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 `reduce` 将报错。

**🤖方法运行过程描述：**

回调函数第一次执行时，`acc` 和`cur`的取值有两种情况：

1. 如果调用`reduce()`时提供了`initialValue`，`acc`取值为`initialValue`，`cur`取数组中的第一个值
2. 如果没有提供 `initialValue`，那么`acc`取数组中的第一个值，`cur`取数组中的第二个值。

> 如果没有提供`initialValue`，reduce 会从索引1的地方开始执行 callback 方法，跳过第一个索引。如果提供`initialValue`，从索引0开始。

**🌰举个例子：**

下面所示为后端返回的用户任务数据，我们的需求是将用户进行中的 `inProgress`任务在第一位，接着是待办的 `todo`任务,最后才是已完成的 `done`任务。

```javascript
const tasks = [
  {id:1, title: 'Job A', status: 'done'},
  {id:2, title: 'Job B', status: 'inProgress'},
  {id:3, title: 'Job C', status: 'todo'},
  {id:4, title: 'Job D', status: 'inProgress'},
  {id:5, title: 'Job E', status: 'todo'}
]
```

⛏首先按照所需的排序顺序创建一个数组。

```javascript
const sortBy = ['inProgress', 'todo', 'done']
```

⚙️然后使用`reduce`来创建一个函数，参数为一个数组，最后输出以数组项为键，索引为值的对象，如 `{inProgress：0，todo：1，done：2}`。

```javascript
const sortByObject = data => data.reduce(
  (obj,item,index) => ({
    ...obj,
    [item]:index
}), {}
)
// 如果扩展运算符后面是一个空对象，则没有任何效果。{...{}, a: 1} == {a:1}
console.log(sortByObject(sortBy))
/* {inProgress: 0, todo: 1, done: 2} *
```

🚀这样就有了排序设置，咱们可以将它与一个可重用的函数放在一起，该函数传入一个待排序数组`data`、一个`sortby`排序规则数组和一个`sortField`字段，这样咱们就可以根据任务数据的指定字段对数组元素进行自定义的排序：

```javascript
const customSort = ({data, sortBy, sortField}) => {
  const sortByObject = sortBy.reduce(
  (obj, item, index) => ({
      ...obj,
      [item]: index
  }), {})
  return data.sort((a, b) => sortByObject[a[sortField]] - sortByObject[b[sortField]])
}

// a[sortField] 即 {id:1, title: 'Job A', status: 'done'}.status == done
// b[sortField] 即 {id:2, title: 'Job B', status: 'inProgress'}.status == inProgress

// sortByObject[done] - sortByObject[inProgress] == {inProgress: 0, todo: 1, done: 2}[done] - {inProgress: 0, todo: 1, done: 2}[inProgress] == 2 - 0
console.log(customSort({data:tasks, sortBy, sortField: 'status'}))
```

⚠️但是，还有一个问题，如果列表中有一个`status`不同的项(不在咱们的排序顺序中)，就会出现问题。因此，为了处理这个问题，我们需要为原任务数组`tasks`来添加一个默认的`sortStatus`字段来标记排序中不需要的数据项的`status`为`other`。

```javascript
const tasksWithDefault = tasks.map(item => (
  {  
    ...item,
    sortStatus: sortBy.includes(item.status) ? item.status:'other'
  })
 )
```

这次传递的是更新后的`sort`字段，那么现在就有了正确的排序顺序，列表底部还有包含状态为 `other` 的项目。

完整代码：

```javascript
const tasks = [
  { id: 1, title: "Job A", status: "done" },
  { id: 2, title: "Job B", status: "inProgress" },
  { id: 3, title: "Job C", status: "todo" },
  { id: 3, title: "Job D", status: "onHold" },
  { id: 4, title: "Job E", status: "inProgress" },
  { id: 5, title: "Job F", status: "todo" }
];

const sortBy = ["inProgress", "todo", "done"];

const customSort = ({ data, sortBy, sortField }) => {
  const sortByObject = sortBy.reduce(
    (obj, item, index) => ({
      ...obj,
      [item]: index
    }),
    {}
  );
  return data.sort(
    (a, b) => sortByObject[a[sortField]] - sortByObject[b[sortField]]
  );
};

const tasksWithDefault = tasks.map(item => ({
  ...item,
  sortStatus: sortBy.includes(item.status) ? item.status : "other"
}));
console.log(
  customSort({
    data: tasksWithDefault,
    sortBy: [...sortBy, "other"],
    sortField: "sortStatus"
  })
);
```

