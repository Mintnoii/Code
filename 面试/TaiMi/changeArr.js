const arr = [
  {id: '1', rank: 1},
  {
    id: '2', rank: 1,
    children: [
      {id: '2.1', rank: 2},
      {id: '2.2', rank: 2},
    ]
  },
  {
    id: '3', rank: 1,
    children: [
      {
        id: '3.1', rank: 2,
        children: [
          {
            id: '3.1.1', rank: 3,
            children: [
              {
                id: '3.1.1.1', rank: 4,
                children: [
                  {
                    id: '3.1.1.1.1', rank: 5,
            
                  }
                ]
              }
            ]
          }
        ]
      
      }
    ]
  }
]

const changeArr = (arr) => {
  // 用来存储扁平化处理后的结果
  let res = [];
  const flatArr = (source) => {
    source.forEach(item => {
      // 先放入最当前 item
      res.push(item)
      // 对有 children 的 item 递归处理
      if(item.children && item.children.length >0) {
        flatArr(item.children)
      }
    })
    return res;
  };
  return flatArr(arr);
}

console.log(changeArr(arr))