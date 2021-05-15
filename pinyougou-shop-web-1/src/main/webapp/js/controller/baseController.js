app.controller('baseController', function($scope) {
	/* 定义分页控件的配追  */
	$scope.paginationConf = {
		currentPage : 1,
		totalItems : 10,
		itemsPerPage : 10,
		perPageOptions : [ 10, 20, 30, 40, 50 ],
		onChange : function() {
			// $scope.findPage($scope.paginationConf.currentPage,$scope.paginationConf.itemsPerPage);
			$scope.reloadList();
		}
	}

	// 重新加载数据
	$scope.reloadList = function() {
		// $scope.findPage($scope.paginationConf.currentPage,$scope.paginationConf.itemsPerPage);
		$scope.search($scope.paginationConf.currentPage,
				$scope.paginationConf.itemsPerPage);
	}

	$scope.selectIds = []; // 选中的ids
	/* 获取选中的ids */
	$scope.updateSelection = function($event, id) {
		if ($event.target.checked) {
			$scope.selectIds.push(id);
		} else {
			var idx = $scope.selectIds.indexOf(id);
			$scope.selectIds.splice(idx, 1); // 从数组中删除
		}
		console.log($scope.selectIds);
	}
	
	// 将JSON串转换为JSON对象
	$scope.jsonToString=function(jsonString,key){
		console.log(jsonString);
		var json = JSON.parse(jsonString);
		var value ="";
		for(var i=0; i<json.length;i++){
			if(i > 0){
				value+=",";
			}
			value+=json[i][key]
		}
		console.log(value);
		return value;
	}
	/*$scope.jsonToString=function(jsonString,key){
		
		var json= JSON.parse(jsonString);
		var value="";
		
		for(var i=0;i<json.length;i++){
			if(i>0){
				value+=",";
			}			
			value +=json[i][key];			
		}
				
		return value;
	}*/
	
	
	
	// 工具方法: 从集合中按照key查询对象
	$scope.selectObjectByKey=function(list, key, keyValue){
		for(var i=0; i<list.length; i++){
			if(list[i][key] == keyValue){
				return list[i];
			}
		}
		return null;
	}
	
	

});