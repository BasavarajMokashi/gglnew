eLearningApp.controller('Quesctrl',function($scope, $rootScope,$location,$window, $timeout, $mdMedia, $mdDialog, $filter, genericfactory, genericService, configHttpReqService, errorService, sessionStoreService){


    
	 
    $scope.initQuesCtrl=function(){
	  $scope.questionsDetails = $window.sessionStorage.getItem('questionsDetails');
	  alert(JSON.stringify($scope.questionsDetails));
	}; 
	  
	
	 $scope.initQuesCtrl();
  
});