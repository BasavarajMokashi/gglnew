eLearningApp.controller('QuesListctrl',function($scope, $rootScope,$location,$window, $timeout, $mdMedia, $mdDialog, $filter, genericfactory, genericService, configHttpReqService, errorService, sessionStoreService){

   $scope.initQuesCtrl=function(){
	$scope.classDetails = JSON.parse($window.sessionStorage.getItem('classDetails'));
    configHttpReqService.httpRequestWithPromise(Constants.URLS.QuestionList_Info.replace('{classid}',$scope.classDetails.classid), Constants.Global.METHOD.GET, Constants.Global.DefaultHTTPHeader, null, null, null, null)
		.then(
			function(resp) { 
			console.log(resp);
				$scope.quesListInfo = resp;
				}, function(resp) { 
				console.log('Error');
			}
		);
		
	}; 
	  
	   var indexedTeams = [];
    
    $scope.categoryToFilter = function() {
        indexedTeams = [];
        return $scope.quesListInfo;
    }
    
    $scope.filterTeams = function(category) {
		var cateIsNew = indexedTeams.indexOf(category.CategoryName) == -1;
        if (cateIsNew) {
            indexedTeams.push(category.CategoryName);
        }
        return cateIsNew;
    }
	
	$scope.getQuestionDetails = function(subCateId){
		configHttpReqService.httpRequestWithPromise(Constants.URLS.QuestionDetails_Info.replace('{subCateId}',subCateId), Constants.Global.METHOD.GET, Constants.Global.DefaultHTTPHeader, null, null, null, null)
		.then(
			function(resp) { 
			console.log(resp);
				$scope.qusDetailstInfo = resp;
				alert(JSON.stringify(resp));
			    $window.sessionStorage.setItem('questionsDetails',resp);
				$scope.questionsDetails = $window.sessionStorage.getItem('questionsDetails');
				alert(JSON.stringify($scope.questionsDetails));
				//$window.location.href = 'question.html'; 
				}, function(resp) { 
				console.log('Error');
			}
		);
		
	}
	
	 $scope.initQuesCtrl();
  
});