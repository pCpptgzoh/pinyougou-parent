 //控制层 
app.controller('goodsController' ,function($scope,$controller   ,
		$location,
		goodsService,uploadService,itemCatService,typeTemplateService){	
	
	$controller('baseController',{$scope:$scope});//继承
	
    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
		goodsService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}    
	
	//分页
	$scope.findPage=function(page,rows){			
		goodsService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//查询实体 
	$scope.findOne=function(){
		var id=$location.search()['id'];   // 获取参数值
		console.log(id);
		if(id==null){
			return ;
		}
		goodsService.findOne(id).success(
			function(response){
				$scope.entity= response;
				// 向富文本编辑器添加内容
				editor.html($scope.entity.introduction);
				
				// 显示图片列表
				$scope.entity.goodsDesc.itemImages=JSON.parse($scope.entity.goodsDesc.itemImages);
				
				// 显示扩展属性
				$scope.entity.goodsDesc.customAttributeItems=JSON.parse($scope.entity.goodsDesc.customAttributeItems);
				
				
				// 显示规格
				$scope.entity.goodsDesc.specificationItems=JSON.parse($scope.entity.goodsDesc.specificationItems);
				
				// console.log($scope.entity.goodsDesc.specificationItems);
				
				// SKU列表规格转换 
				for(var i=0;i<$scope.entity.itemList.length;i++){
					$scope.entity.itemList[i].spec=JSON.parse($scope.entity.itemList[i].spec);
				}
				
				
				
				
			}
		);				
	}
	
	
	
	
	
	// 根据规格名称和选项返回是否勾选
	$scope.checkAttribute=function(specName,optionName){
		var items=$scope.entity.goodsDesc.specificationItems;
		var object;
		for(var i=0; i<items.length;i++){
			if(items[i].attributeName==specName){
				object=items[i];
				break;
			}
		}
		if(object == null){
			return false;
		}else{
			if(object.attributeValue.indexOf(optionName)>=0){
				return true;
			}else{
				return false;
			}
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	///////////////////////////////////
	
	
	
	
	
	
	
	
	
	
	
	
	//保存 
	/*$scope.add=function(){
		$scope.entity.goodsDesc.introduction=editor.html();
		goodsService.add($scope.entity).success(function(response){
			if(response.success){
				alert("新增成功");
				$scope.entity={};
				editor.html('');  // 清空富文本编辑器
			}else{
				alert(response.message);
			}
		});
	}*/
	
	
	
	// 保存  :  修改 + 新增
	$scope.save=function(){
		// 提取富文本编辑器的内容
		$scope.entity.goodsDesc.introduction=editor.html();
		var serviceObject;	// 服务对象
		if($scope.entity.goods.id != null){  // 有商品id  修改
			serviceObject=goodsService.update($scope.entity);
		}else{
			serviceObject=goodsService.add($scope.entity);  // 增加
		}
		
		serviceObject.success(function(response){
			if(response.success){
				alert('保存成功');
				$scope.entity={};
				editor.html("");
				location.href='goods.html';  // 跳转到商品列表页
			}else{
				alert(response.message);
			}
		});
		
	}
	
	
	
	
	 
	//批量删除 
	$scope.dele=function(){			
		//获取选中的复选框			
		goodsService.dele( $scope.selectIds ).success(
			function(response){
				if(response.success){
					$scope.reloadList();//刷新列表
					$scope.selectIds=[];
				}						
			}		
		);				
	}
	
	$scope.searchEntity={};//定义搜索对象 
	
	//搜索
	$scope.search=function(page,rows){			
		goodsService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	// 图片上传
	$scope.uploadFile=function(){
		uploadService.uploadFile().success(function(response){
			if(response.success){
				$scope.image_entity.url=response.message;
			}else{
				alert(response.message);
			}
		}).error(function(){
			alert("上传发生错误");
		});
	}
	
	
	$scope.entity={goods:{},goodsDesc:{itemImages:[],specificationItems:[]}};
	
	
	$scope.add_image_entity=function(){
		$scope.entity.goodsDesc.itemImages.push($scope.image_entity);
	}
	
	$scope.remove_image_entity=function(index){
		$scope.entity.goodsDesc.itemImages.splice(index,1);
	}
	
	
	// 读取一级分类
	$scope.selectItemCatList=function(){
		itemCatService.findByParentId(0).success(function(response){
			$scope.itemCat1List=response;
		});
	}
	
	
	// 读取二级分类
	$scope.$watch("entity.goods.category1Id",function(newValue,oldValue){
		// console.log(newValue);
		// 根据选择的值,查询二级分类
		itemCatService.findByParentId(newValue).success(function(response){
			$scope.itemCat2List=response;
		});
	});
	
	
	// 读取三级分类
	$scope.$watch("entity.goods.category2Id",function(newValue,oldValue){
		// console.log(newValue);
		// 根据选择的值,查询二级分类
		itemCatService.findByParentId(newValue).success(function(response){
			$scope.itemCat3List=response;
		});
	});
	
	// 三级分类选择之后,读取这个分类的模板ID
	$scope.$watch('entity.goods.category3Id',function(newValue,oldValue){
		itemCatService.findOne(newValue).success(function(response){
			$scope.entity.goods.typeTemplateId=response.typeId;   // 更新模板ID
		});
	});
	
	
	// 模板ID选择后,更新品牌列表    更新模板对象
	$scope.$watch('entity.goods.typeTemplateId',function(newValue, oldValue){
		typeTemplateService.findOne(newValue).success(function(response){
			$scope.typeTemplate=response;
			$scope.typeTemplate.brandIds=JSON.parse($scope.typeTemplate.brandIds);   // 品牌列表
			
			
			// 如果没有ID就说明是新增,则加载模板中的扩展数据
			if($location.search()['id'] == null){
				$scope.entity.goodsDesc.customAttributeItems=JSON.parse($scope.typeTemplate.customAttributeItems);  // 扩展属性
			}
			
			
		});
		
		// 查询规格列表
		typeTemplateService.findSpecList(newValue).success(function(response){
			$scope.specList=response;
		});
		
	});
	
	$scope.updateSpecAttribute=function($event, name, value){
		console.log("name:" + name);
		console.log("value:" + value);
		
		var object=$scope.selectObjectByKey($scope.entity.goodsDesc.specificationItems,'attributeName', name);
		console.log(object);
		if(object != null){
			if($event.target.checked) {
				object.attributeValue.push(value);
			}else{  // 取消勾选
				object.attributeValue.splice(object.attributeValue.indexOf(value), 1);  // 移除选项
				// 如果选项都取消了,将此记录移除
				if(object.attributeValue.length==0){
					$scope.entity.goodsDesc.specificationItems.splice(
							$scope.entity.goodsDesc.specificationItems.indexOf(object), 1);
				}
			}
		}else{
			$scope.entity.goodsDesc.specificationItems.push({"attributeName" : name, "attributeValue" : [value]});
		}
	}
	
	// 创建SKU列表
	$scope.createItemList=function(){
		$scope.entity.itemList=[{spec:{},price:0,num:9999,status:'0',isDefault:'0'}];
		var items = $scope.entity.goodsDesc.specificationItems;
		for(var i=0; i < items.length;i++) {
			$scope.entity.itemList=addColumn($scope.entity.itemList,items[i].attributeName, items[i].attributeValue);
		}
	}
	
	addColumn=function(list, columnName, columnValues){
		var newList=[];
		for(var i=0; i < list.length; i++) {
			var oldRow=list[i];
			for(var j=0; j<columnValues.length; j++){
				var newRow = JSON.parse(JSON.stringify(oldRow));
				newRow.spec[columnName]=columnValues[j];
				newList.push(newRow);
			}
		}
		return newList;
	}
	
	// 商品审核的状态
	$scope.status=['未审核','已审核','审核未通过','关闭'];
	
	// 商品分类的列表
	$scope.itemCatList=[];
	
	$scope.findItemCatList=function(){
		itemCatService.findAll().success(function(response){
			for(var i=0;i<response.length;i++){
				$scope.itemCatList[response[i].id]=response[i].name;
			}
		});
	}
	
	
	
	
	
	
	
    
});	
