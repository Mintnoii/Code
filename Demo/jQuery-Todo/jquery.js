// $(document).ready(function(){
$(function(){
	var i = 3;
	var array = [];
   		array.push({
			id: 1,
			name: 'a',
			age: '18',
			sex: 'man',
			isDelete: false
		})
		array.push({
			id: 2,
			name: 'b',
			age: '28',
			sex: 'woman',
			isDelete: false
		})
	//render入口
	function render(list){
		var html = [];
		for (var i = 0,l = list.length; i<l; i++){
			if(!list[i].isDelete){
				html.push('<tr id='+list[i].id+'><td>'+list[i].name+'</td><td>'+list[i].age+'</td><td>'+list[i].sex+'</td><td><a class="delete" id='+list[i].id+' href="javascript:;">删除</a></td><td><a class="revise" id='+list[i].id+' href="javascript:;">修改</a></td></tr>');
			}
		}
		$('#tbody').html(html.join(""));//将html数组的内容写到tbody中
	}
	render(array);
	//查询关键字  
	$("#BtnSearch").click(function search(){
			var keyword = $("#keyword").val();
			var temp = [];
			for(var i = 0,l = array.length;i < l;i++){
				if(array[i].name.indexOf(keyword)!=-1){
					temp.push(array[i])
				}
			}
	  	render(temp)
	});
	//点击提交 添加记录
	$("#BtnAdd").click(function add(){
		var name = $("#name").val();
		var age = $("#age").val();
		var sex = $("#sex").val();
		array.push({
			id: i,
			name: name,
			age: age,
			sex: sex,
			isDelete:false
		})
		render(array);
		i++;
		// console.log(array);
	});	
	// alert(array);
	//删除和修改 
	$("#tbody").click(function(e){ //获取表格上的点击事件
		var $target = $(e.target)//将原生dom对象转换成jQuery对象
		var id = $target.attr('id')//利用jQuery对象获取id属性
			if($target.hasClass('delete')){//jQuery的$(selector).hasClass(class)方法，检查被选元素是否包含指定的 class。
				for(var i=0,l=array.length; i<l; i++){
					if(array[i].id == id){
					array[i].isDelete = true
					}
				}
				render(array);
			}else if($target.hasClass('revise'){
				for (var i = 0,l = array.length; i < l; i++){
					if (array[i].id == id){
						var name = $('#name').val();
						var age = $('#age').val();
						var sex = $('#sex').val();
						array[i].name = name;
						array[i].age = age;
						array[i].sex = sex;
				}
			}
			console.log(array)
				render(array);
		}
	});
});












