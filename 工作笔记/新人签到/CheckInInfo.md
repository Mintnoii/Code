



```jsx
import { StorageOper } from 'Biz/View/StorageOper.jsx';
import { CustomNetwork } from 'Public/Common/Network/Network';
import { IsEmpty } from 'Biz/View/IsEmpty.jsx';
import { Modal } from 'nuke';
import { checkNewUser } from '../../Common/Utils/checkNewUser';
import moment from 'nuke-biz-moment';


  function continueDays(arr_days) {
    
  }

var runningDays = (arr_days)=> {
    let arrnew = arr_days.map((d) => {
        return d.substr(0, 10).replace(/-/g, '/')
    })
    let ret = true
    let duration = 1
    arrnew.forEach((value, index, arr) => {
        // 处理为相同日期
        if (index + 1 < arr.length) {
            if ((new Date(arr[index + 1]) - new Date(value)) / (1000 * 3600 * 24) == 1) {
                duration = duration + 1
            } else {
                ret = false
            }
        }

    })

       // 先排序，然后转时间戳
    // let days = arr_days.sort().map((d, i) => {
    //     let dt = new Date(d)
    //     dt.setDate(dt.getDate() + 4 - i) // 处理为相同日期

    //     // 抹去 时 分 秒 毫秒
    //     dt.setHours(0)
    //     dt.setMinutes(0)
    //     dt.setSeconds(0)
    //     dt.setMilliseconds(0)
    //     return +dt
    // })
    
    // let ret = true; // 数组内所有的日期记录是否连续
    // let duration = 0 // 数组内日期最长连续天数
    // days.forEach(d => {
    //   if (days[0] !== d) {
    //     ret = false
    //   }else{
    //     duration = duration + 1
    //   }
    // });
    return {
        ret,
        duration
    }
  }
/**
 * 新人签到任务
 * @param   createdate 用户账号的创建时间 用于判断是否是新用户
 * @param   callback  show:是否应该给该用户展示签到活动入口 type: 显示哪种活动入口 cutdown: 活动入口倒计时时间
 * @author W-Qing
 */
var GetCheckinInfo = (createdate, userNick, callback) => {
    // Modal.alert('usernick'+userNick)
    StorageOper.localGet({
        key: 'userUsedRebate,userHadCheckin',
        callback: (res) => {
            // 判断有没有用户已经使用过活动奖品的缓存
            if (!IsEmpty(res) && res.userUsedRebate) {
                callback({
                    show: false
                }) // 退出 不显示活动入口
            } else {
                // 调用接口获取签到记录数据
                CustomNetwork({
                    domain: "http://trade.aiyongbao.com",
                    route: "/activity/getUserCheckInInfo",
                    data: {
                        userNick: userNick,
                        app: 'item'
                    },
                    canary: true,
                    option: {
                        method: 'POST',
                        dataType: "json",
                    },
                    error_callback: (res) => {
                        res = {
                            "data": [
                                // {
                                //     "0": "79",
                                //     "1": "cblallen",
                                //     "2": "cblallen",
                                //     "3": "2019-08-10 21:32:10",
                                //     "4": "1",
                                //     "5": "item",
                                //     "6": "0",
                                //     "id": "79",
                                //     "nick": "cblallen",
                                //     "operator": "cblallen",
                                //     "checkintime": "2019-08-10 21:30:10",
                                //     "series": "1",
                                //     "app": "item",
                                //     "remark": "0"
                                // },
                                {
                                    "0": "79",
                                    "1": "cblallen",
                                    "2": "cblallen",
                                    "3": "2019-08-09 23:27:01",
                                    "4": "1",
                                    "5": "item",
                                    "6": "0",
                                    "id": "79",
                                    "nick": "cblallen",
                                    "operator": "cblallen",
                                    "checkintime": "2019-08-09 23:32:10",
                                    "series": "1",
                                    "app": "item",
                                    "remark": "0"
                                },
                                {
                                    "0": "79",
                                    "1": "cblallen",
                                    "2": "cblallen",
                                    "3": "2019-08-08 00:48:12",
                                    "4": "1",
                                    "5": "item",
                                    "6": "0",
                                    "id": "79",
                                    "nick": "cblallen",
                                    "operator": "cblallen",
                                    "checkintime": "2019-08-08 00:48:12",
                                    "series": "1",
                                    "app": "item",
                                    "remark": "0"
                                },
                                {
                                    "0": "79",
                                    "1": "cblallen",
                                    "2": "cblallen",
                                    "3": "2019-08-07 00:48:12",
                                    "4": "1",
                                    "5": "item",
                                    "6": "0",
                                    "id": "79",
                                    "nick": "cblallen",
                                    "operator": "cblallen",
                                    "checkintime": "2019-08-07 00:48:12",
                                    "series": "1",
                                    "app": "item",
                                    "remark": "0"
                                },
                                {
                                    "0": "79",
                                    "1": "cblallen",
                                    "2": "cblallen",
                                    "3": "2019-08-06 00:48:12",
                                    "4": "1",
                                    "5": "item",
                                    "6": "0",
                                    "id": "79",
                                    "nick": "cblallen",
                                    "operator": "cblallen",
                                    "checkintime": "2019-08-06 00:48:12",
                                    "series": "1",
                                    "app": "item",
                                    "remark": "0"
                                },
                                {
                                    "0": "79",
                                    "1": "cblallen",
                                    "2": "cblallen",
                                    "3": "2019-08-05 00:48:12",
                                    "4": "1",
                                    "5": "item",
                                    "6": "0",
                                    "id": "79",
                                    "nick": "cblallen",
                                    "operator": "cblallen",
                                    "checkintime": "2019-08-05 00:48:12",
                                    "series": "1",
                                    "app": "item",
                                    "remark": "0"
                                },
                                {
                                    "0": "79",
                                    "1": "cblallen",
                                    "2": "cblallen",
                                    "3": "2019-08-04 00:48:12",
                                    "4": "1",
                                    "5": "item",
                                    "6": "0",
                                    "id": "79",
                                    "nick": "cblallen",
                                    "operator": "cblallen",
                                    "checkintime": "2019-08-04 00:48:12",
                                    "series": "1",
                                    "app": "item",
                                    "remark": "0"
                                },
                                {
                                    "0": "79",
                                    "1": "cblallen",
                                    "2": "cblallen",
                                    "3": "2019-08-03 00:48:12",
                                    "4": "1",
                                    "5": "item",
                                    "6": "0",
                                    "id": "79",
                                    "nick": "cblallen",
                                    "operator": "cblallen",
                                    "checkintime": "2019-08-03 00:48:12",
                                    "series": "1",
                                    "app": "item",
                                    "remark": "0"
                                },
                            ],
                            "useDiscount": 0
                          }
                        // Modal.alert(JSON.stringify(res))
                        let checkinTimes = res.data.map((d) => {
                            return d.checkintime
                        }).sort((a,b)=> a>b?1:-1)
                        // 用户用过了折扣券
                        let userUsedRebate = res.useDiscount
                         
                        let checkinRecords = checkinTimes.map(d => d.replace(/-/g, '/')) // 签到记录时间数组
                        let checkinDays = checkinRecords.length // 签到记录天数
                        let lastRecords = checkinDays >= 1 ? checkinRecords[checkinDays - 1] : '' // 最后一条签到记录
                        //let lastCheckinTime = moment(lastRecords).format('YYYY-MM-DD hh:mm:ss'); // 最后一条签到记录的签到时间格式化
                        if (userUsedRebate) {
                            StorageOper.localSet({
                                userUsedRebate: true
                            })
                            callback({
                                show: false
                            }) // 退出 并设置缓存
                        } else {
                            if (checkNewUser(createdate)) {
                                if (!IsEmpty(checkinRecords)) {
                                    // 新人有签到记录
                                    //Modal.alert('新人有签到记录')
                                } else {
                                    callback({
                                        show: true,
                                        type: 'all' // 固定入口与悬浮按钮入口都显示
                                    })
                                }
                            } else {
                                if (!IsEmpty(checkinRecords)) {
                                    // 非新人有签到记录
                                    if (lastRecords.substr(0, 10).replace(/-/g, '/') == moment().addDay(-1).format('YYYY/MM/DD')) {
                                        // 最后一次签到记录为昨天 今日为续签
                                        //Modal.alert('续签')
                                    } else {
                                        // 非新用户断签
                                        callback({
                                            show: false
                                        })
                                    }
                                } else {
                                    // 非新人无签到记录
                                    callback({
                                        show: false
                                    })
                                }
                            }
                            // 连续签到签满7天
                            if (checkinDays >= 7 && runningDays(checkinRecords).duration >= 7) {
                                // 签满7天 最后一条签到记录的时间 + 24h 就是活动彻底结束的时间
                                let activeEndTime = new Date(lastRecords).getTime() + (24 * 3600 * 1000)
                                if (activeEndTime > new Date().getTime()) {
                                    callback({
                                        show: true,
                                        type: 'all',
                                        cutdown: activeEndTime
                                    })
                                } else {
                                    Modal.alert(444)
                                    callback({
                                        show: false
                                    })
                                }
                            } else {
                                // 有今日已签到的缓存
                                if (res.userHadCheckin) {
                                    callback({
                                        show: true,
                                        type: 'fixedEntrance'
                                    })
                                } else if (lastRecords.substr(0, 10) == moment().format('YYYY/MM/DD')) {
                                    // 最后一天的签到记录为今天
                                    callback({
                                        show: true,
                                        type: 'fixedEntrance'
                                    })
                                    StorageOper.localSet({
                                        userHadCheckin: true
                                    })
                                } else {
                                    callback({
                                        show: true,
                                        type: 'all'
                                    })
                                }
                            }

                        }
                    },
                   callback: (error) => {
                        callback({
                            show: false
                        })
                    }
                })
            }
        }
    })
}
export default GetCheckinInfo;
```

