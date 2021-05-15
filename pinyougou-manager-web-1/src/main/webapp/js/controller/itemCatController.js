app.controller('itemCatController',function($scope,$controller,itemCatService){
	
	$controller('baseController',{$scope:$scope});    // 继承
	
	// 根据上级ID显示下级列表
	/*$scope.findByParentId=function(parentId){
		itemCatService.findByParentId(parentId).success(function(response){
			$scope.list=response;
		})
	}*/
	$scope.findByParentId=function(parentId){
		$scope.parentId=parentId;  // 记住上级ID
		itemCatService.findByParentId(parentId).success(
			function(response){
				$scope.list=response;				
			}
		);		
	}
	

	$scope.grade=1;  // 面包屑  默认级别为 1
	
	$scope.setGrade=function(value){
		$scope.grade=value
	}
	
	// 读取列表
	$scope.selectList=function(p_entity){
		if($scope.grade==1){  // 级别 为1
			$scope.entity_1=null;
			$scope.entity_2=null;
		}
		if($scope.grade==2){  // 级别为2
			$scope.entity_1=p_entity;
			$scope.entity_2=null;
		}
		if($scope.grade==3){
			$scope.entity_2=p_entity;
		}
		$scope.findByParentId(p_entity.id);  // 查询此级下级列表
	}
	
	
	$scope.parentId=0;   // 记录上级ID
	
	
	// 保存
	$scope.save=function(){
		var serviceObject; // 服务层对象
		if($scope.entity.id != null){
			serviceObject=itemCatService.update($scope.entity);
		}else{
			$scope.entity.parentId=$scope.parentId  // 赋予上级ID
			serviceObject=itemCatService.add($scope.entity);
		}
		
		serviceObject.success(function(response){
			if(response.success){
				// 重新查询
				$scope.findByParentId($scope.parentId);  // 重新加载
			}else{
				alert(response.message)
			}
		})
	}
	
	
	
	
	
	
})