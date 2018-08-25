;(function () {
	// 为了避免压缩时前一个脚本没有写最后一个分号而导致代码压缩混淆后报错，脚本不能使用，所以要在开始加一个分号
  'use strict';
  // 将DOM对象转换为jQuery对象 
  var $form_add_task = $('.add-task'),
      $window = $(window),
      $body = $('body'),
      // 先声明要使用的对象，当模板渲染之后再进行获取并操作
      $task_delete_trigger,
      $task_detail,
      $task_detail_trigger,
      $task_detail = $('.task-detail'),
      $task_detail_mask = $('.task-detail-mask'),
      task_list = [],//存放当前已存在的任务的数组
      current_index,
      $update_form,
      $task_detail_content,
      $task_detail_content_input,
      $checkbox_complete,//已完成的任务项
      $msg = $('.msg'),//消息提醒的DOM
      $msg_content = $msg.find('.msg-content'),
      $msg_confirm = $msg.find('.confirmed'),
      $alerter = $('.alerter');//消息提示音

  init();

  $form_add_task.on('submit', on_add_task_form_submit)
  $task_detail_mask.on('click', hide_task_detail)

  //自定义一个弹窗 可以进行异步操作
  function pop(arg) {
    if (!arg) {
      console.error('pop title is required');
    }

    var conf = {},
      $box,
      $mask,
      $title,
      $content,
      $confirm,
      $cancel,
      timer,//轮询定时器
      dfd,
      confirmed;//标识用户是否点击弹窗内的确定

    //返回一个deferred对象
    dfd = $.Deferred();

    if (typeof arg == 'string')
      conf.title = arg;
    else {
      conf = $.extend(conf, arg);
    }

    $box = $(
      `<div>
          <div class="pop-title">${conf.title}</div>
          <div class="pop-content"><div>
          <button style="margin-right: 5px;" class="primary confirm">confirm</button>
          <button class="cancel">cannel</button>
      </div>`)
      .css({
        color: '#444',
        width: 300,
        height: 'auto',
        padding: '15px 10px',
        background: '#fff',
        position: 'fixed',
        'border-radius': 3,
        'box-shadow': '0 1px 2px rgba(0,0,0,.5)'
      })

    $title = $box.find('.pop-title').css({
      padding: '5px 10px',
      'font-weight': 900,
      'font-size': 15,
      'text-align': 'center'
    })

    $content = $box.find('.pop-content').css({
      padding: '5px 10px',
      'text-align': 'center'
    })

    $confirm = $content.find('button.confirm');
    $cancel = $content.find('button.cancel');

    $mask = $('<div></div>')
      .css({
        position: 'fixed',
        background: 'rgba(0,0,0,.5)',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      })

    //不清楚用户什么时候点击自定义弹窗的确认或取消按钮
    //所以需要不停的去轮询检查
    timer = setInterval(function () {
      if (confirmed !== undefined) {
        //当确认按钮被点击 将confirmed的值传给resolve方法
        dfd.resolve(confirmed);

        //当用户做出选择 取消轮询并从文档流中删除pop
        clearInterval(timer);
        dismiss_pop();
      }
    }, 50)

    $confirm.on('click', on_confirmed)
    $cancel.on('click', on_cancel);
    $mask.on('click', on_cancel);

    //根据用户的选择进行标识
    function on_cancel() {
      confirmed = false;
    }

    function on_confirmed() {
      confirmed = true;
    }

    //从文档中删除pop
    function dismiss_pop() {
      $mask.remove();
      $box.remove();
    }

    //调整alert弹窗的位置
    function adjust_box_position() {
      var window_width = $window.width(),
          window_height = $window.height(),
          box_width = $box.width(),
          box_height = $box.height(),
          move_x,
          move_y;

      move_x = (window_width - box_width) / 2;
      move_y = ((window_height - box_height) / 2) - 80;

      $box.css({
        left: move_x,
        top: move_y,
      })
    }

    //当用户缩放窗口时自动调整
    $window.on('resize', function () {
      adjust_box_position();
    })
    $mask.appendTo($body);
    $box.appendTo($body);
    $window.resize();
    //返回一个promise对象
    return dfd.promise();
  }

  //消息提醒的clear按钮点击事件
  function listen_msg_event() {
    $msg_confirm.on('click', function () {
      hide_msg();
    })
  }

  function on_add_task_form_submit(e) {
  	// 新建任务对象 不然会覆盖之前的对象
    var new_task = {};
    /*禁用默认行为*/
    e.preventDefault();
    /*获取新Task的值*/
    var $input = $(this).find('input[name=content]');
    new_task.content = $input.val();
    /*如果新Task的值为空 则直接返回 否则继续执行*/
    if (!new_task.content) return;

    /*将获取到的新Task存入*/
    if (add_task(new_task)) {
      // 如果存入成功则将输入框清空
      $input.val(null);
    }
  }

  /*监听打开Task详情事件*/
  function listen_task_detail() {
    var index;
    // 双击任务显示详情
    $('.task-item').on('dblclick', function () {
      index = $(this).data('index');
      show_task_detail(index);
    })
    // 单击Details显示详情
    $task_detail_trigger.on('click', function () {
      var $this = $(this);
      var $item = $this.parent().parent();
      index = $item.data('index');
      show_task_detail(index);
    })
  }

  /*监听勾选完成Task事件*/
  function listen_checkbox_complete() {
    $checkbox_complete.on('click', function () {
      var $this = $(this);
      var index = $this.parent().parent().data('index');
      var item = get(index);
      if (item.complete){
        // 新添加的任务默认没有完成 conplete为false
        update_task(index, {complete: false});
      }
      else{
        update_task(index, {complete: true});
      }
    })
  }

  function get(index) {
    return store.get('task_list')[index];
  }

  /*查看Task详情*/
  function show_task_detail(index) {
    /*生成详情模板*/
    render_task_detail(index);
    current_index = index;
    /*显示详情模板(默认隐藏)*/
    $task_detail.show();
    /*显示详情模板mask(默认隐藏)*/
    $task_detail_mask.show();
  }

  /*更新Task*/
  function update_task(index, data) {
    if (!index || !task_list[index])
      return;

    // JQuery的extend扩展方法
    // 将task_list[index]与data合并到{}中,返回值为合并后的新对象
    task_list[index] = $.extend({}, task_list[index], data);
    refresh_task_list();
  }

  /*隐藏Task详情*/
  function hide_task_detail() {
    $task_detail.hide();
    $task_detail_mask.hide();
  }

  /*渲染index指定的Task的详细信息*/
  function render_task_detail(index) {
    if (index === undefined || !task_list[index])
      return;

    var item = task_list[index];

    var tpl =
    // 默认隐藏 双击显示编辑修改的input
      `<form>
        <div class="content">Todo: ${item.content}</div>
        <div class="input-item">
          <input style="display: none;" type="text" name="content" value="${(item.content || '')}">
        </div>
      <div>
        <div class="desc input-item">
          <textarea name="desc">${(item.desc || '') }</textarea>
        </div>
      </div>
      <div class="remind input-item">
        <label>Time: </label>
        <input class="datetime" name="remind_date" type="text" value="${(item.remind_date || '')}">
      </div>
      <div class="input-item"><button type="submit">Update</button></div>
      </form>`;

    /*用新模板替换旧模板要先清空*/
    $task_detail.html(null);
    $task_detail.html(tpl);
    $('.datetime').datetimepicker();


    /*选中其中的form元素, 因为之后会使用其监听submit事件*/
    $update_form = $task_detail.find('form');
    /*选中显示Task内容的元素*/
    $task_detail_content = $update_form.find('.content');
    /*选中Task input的元素*/
    $task_detail_content_input = $update_form.find('[name=content]');

    /*双击内容元素显示可以编辑的input框, 隐藏自己*/
    $task_detail_content.on('dblclick', function () {
      $task_detail_content_input.show();
      $task_detail_content.hide();
    })

    $update_form.on('submit', function (e) {
      // 阻止表单提交
      e.preventDefault();
      var data = {};
      /*获取表单中新修改的各个input的值*/
      data.content = $(this).find('[name=content]').val();
      data.desc = $(this).find('[name=desc]').val();
      data.remind_date = $(this).find('[name=remind_date]').val();

      update_task(index, data)
      hide_task_detail();
    })
  }

  /*查找并监听所有删除按钮的点击事件*/
  function listen_task_delete() {
    $task_delete_trigger.on('click', function () {
      // 将当前点击的对象span转换为jQuery对象
      var $this = $(this);
      /*找到删除按钮所在的div*/
      var $item = $this.parent().parent();
      var index = $item.data('index');
      /*是否确认删除*/
      pop('Are you sure you want to delete?')

      //通过返回的promise对象 将点击的结果存入result中
        .then(function (result) {
          result ? delete_task(index) : null;
        })
    })
  }

  function add_task(new_task) {
    /*将新Task推入task_list数组*/
    task_list.push(new_task); 
    /*然后更新浏览localStorage*/
    refresh_task_list();
    return true;
  }

  /*
   * 更新localStorage数据并渲染模板
   * */
  function refresh_task_list() {
    store.set('task_list', task_list);
    render_task_list();
  }

  /*通过index删除Task*/
  function delete_task(index) {
    /*如果没传index 或者任务数组中没有这条index则直接返回*/
    if (index === undefined || !task_list[index]) return;

    /*从当前任务数组中删除这条任务并更新localStorage*/
    delete task_list[index];
    refresh_task_list();
  }

  // 初始化函数
  function init() {
  	//将localStorage中的任务取出来放入数组并渲染
    task_list = store.get('task_list') || [];

    //监听点击clear按钮事件
    listen_msg_event();
    // 如果任务数组里有数据则进行渲染
    if (task_list.length){
      render_task_list();
    }
    //监控是否有消息需要提醒
    task_remind_check();
  }

  //监控当前日期的变化
  function task_remind_check() {
    var current_timestamp;
    // 利用定时器进行时间监控
    var itl = setInterval(function () {
      for (var i = 0; i < task_list.length; i++) {
        // 循环每一条任务并定义任务时间
        var item = get(i), task_timestamp;
        // 如果没有任务内容或者没有提醒时间或者已经提醒过了  则跳过循环
        if (!item || !item.remind_date || item.informed)
          continue;

        current_timestamp = (new Date()).getTime();//当前时间的时间戳
        task_timestamp = (new Date(item.remind_date)).getTime();//提醒时间的时间戳
        if (current_timestamp - task_timestamp >= 1) {
          // 更新task列表 为这条任务添加informed属性表示已经提醒过
          update_task(i, {informed: true});
          //弹出提醒消息
          show_msg(item.content);
        }
      }
    }, 300);
  }

  function show_msg(msg) {
    if (!msg) return;
    $msg_content.html(msg);
    // 获取到页面中的audio标签并播放
    $alerter.get(0).play();
    $msg.show();
  }

  function hide_msg() {
    $msg.hide();
  }

  /*
   * 渲染所有Task模板
   * */
  function render_task_list() {
    var $task_list = $('.task-list');
    // 先将之前渲染的清空
    $task_list.html('');
    var complete_items = [];
    for (var i = 0; i < task_list.length; i++) {
      var item = task_list[i];
      //判断该任务是否完成，已完成的放入已完成的数组
      if (item && item.complete){
        complete_items[i] = item;
      }
      else{
        var $task = render_task_item(item, i);
      }
      // 使用prepend而不是append 将每条未完成的新任务添加到最前面
      $task_list.prepend($task);
    }

    // 再循环已完成任务数组
    for (var j = 0; j < complete_items.length; j++) {
      $task = render_task_item(complete_items[j], j);
      if (!$task) continue;
      // 添加完成类名
      $task.addClass('completed');
      // append 将完成的任务添加到未完成的任务后面
      $task_list.append($task);
    }

    //获取模板里的对象
    $task_delete_trigger = $('.action.delete')
    $task_detail_trigger = $('.action.detail')
    $checkbox_complete = $('.task-list .complete[type=checkbox]')
    //渲染之后监听对象的事件（每次数据变化之后手动的添加事件，然后将添加后的内容加到事件的监控元素中）
    listen_task_delete();
    listen_task_detail();
    listen_checkbox_complete();
  }

  /*
   *渲染单条Task模板
   * */
  function render_task_item(data, index) {
    //如果没有data或者index则不进行渲染
    if (!data || !index) return;
    var list_item_tpl =
    // 自定义属性data-index和data-complete作为一条任务的索引和进度标记 方便管理
      `<div class="task-item" data-index="${index}">
      <span><input class="complete" ${(data.complete ? 'checked' : '')} type="checkbox"></span>
      <span class="task-content">${data.content}</span>
      <span class="fr"><span class="action delete"> Delete</span>
      <span class="action detail"> Details</span></span></div>`;
    return $(list_item_tpl);
  }
})();