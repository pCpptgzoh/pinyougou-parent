app.controller('brandController',function($scope,$controller,brandService){
	
	// 继承baseContoller
	$controller('baseController',{$scope:$scope});
	
	
	$scope.findAll=function(){
		$scope.findAll().success(function(response){
			$scope.list=response;
		});
	}
	
	
	/* 分页查询 */
    $scope.findPage=function(page,rows){
    	$scope.findPage().success(function(response){
    		$scope.list=response.rows;
    		// 更新分页控件的总记录数
    		$scope.paginationConf.totalItems=response.total;
    		
    	});
    }
    
    /* 增加品牌 */
    $scope.save=function(){
    	
    	// var methodName="add";
    	var serviceObject;
    	
    	if($scope.entity.id != null){
    		// methodName="update";
    		serviceObject=brandService.update($scope.entity);
    	} else {
    		serviceObject=brandService.add($scope.entity);
    	}
    	
    	serviceObject.success(function(response){
    		if(response.success){
    			$scope.reloadList();  // 重新加载数据
    			
    		}else{
    			alert(response.message);
    		}
    	});
    }
    
    
    /* 查询品牌信息 */
    $scope.findOne=function(id){
    	brandService.findOne(id).success(function(response){
    		$scope.entity=response;
    	});
    }
    
    
	/* 批量删除 */
	$scope.dele=function(){
		if(confirm("是否要删除")){
			brandService.dele($scope.selectIds).success(function(response){
				if(response.success){
					$scope.reloadList();  // 重新加载数据
				}else{
					alert(response.message);
				}
			});
		}
	}
	
	
	/* 定义搜索对象 */
	$scope.searchEntity={};
	
	/* 条件查询 */
	$scope.search=function(page,rows){
		brandService.search(page,rows,$scope.searchEntity).success(function(response){
			$scope.paginationConf.totalItems=response.total;
			$scope.list=response.rows;
		});
	}
	
	
	/////////////////////////////

    
	
	
});