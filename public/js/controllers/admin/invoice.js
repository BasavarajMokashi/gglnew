/*
 * Starlly.
 * 
 * Copyright (c) 2016 ariveguru.com
 * http://ariveguru.com
 *
 */

starllyApp.controller('invoiceCtrl',function($scope, $rootScope, $filter, $timeout, $mdMedia, $mdDialog, genericfactory, genericService, configHttpReqService, errorService){
   
   $scope.limitOptions = [10, 25, 50, 100, 250];        
    $scope.query = {
    order: 'name',
    limit: 10,
    page: 1
  };
  var totalTransaction = {
    'invoiceAmount': 0,
    'redemptionAmt': 0,
    'rewardAmt': 0,
    'bounceBackAmt': 0,
    'starllyCommision': 0,
    'totalAmt': 0,
    'netAmt': 0
  }
  
   var getTransactionTotalValue = function(record) {
    var recordSet = $scope.txnReport.transactionSummary.data ? $scope.txnReport.transactionSummary.data.slice(($scope.query.page * $scope.query.limit)-$scope.query.limit,$scope.query.page * $scope.query.limit) : [];
    $scope.txnReport.transactionSummary.total = angular.copy(totalTransaction);
	
    angular.forEach(recordSet, function(records) {
	  $scope.txnReport.transactionSummary.total.invoiceAmount += records.invoiceAmount;
      $scope.txnReport.transactionSummary.total.redemptionAmt += records.redemptionAmt;
      $scope.txnReport.transactionSummary.total.rewardAmt += records.rewardAmt;
      $scope.txnReport.transactionSummary.total.bounceBackAmt += records.bounceBackAmt;
      $scope.txnReport.transactionSummary.total.starllyCommision += records.starllyCommision;
      $scope.txnReport.transactionSummary.total.totalAmt += records.totalAmt;
      $scope.txnReport.transactionSummary.total.netAmt += records.netAmt;
    });
  };

  $scope.logPagination = function (page, limit) {
	 
    console.log('page: ', page);
    console.log('limit: ', limit);
    getTransactionTotalValue();
  };
  
  var getTransactionReport = function(interval) {
		configHttpReqService.httpRequestWithPromise(Constants.URLS.TransactionReport.replace('{interval}',interval), Constants.Global.METHOD.GET, Constants.Global.DefaultHTTPHeader, null, null, null, null)
		.then(
			function(resp) { 
				$scope.txnReport.transactionSummary = resp;
                getTransactionTotalValue();
			}, function(resp) { 
				console.log('Error');
			}
		);
	};
	
	$scope.initTxnReport = function(interval) {
		alert(interval):
		var restSid = $rootScope.restaurantDetails.restid;
		$scope.txnReport = {};
		$scope.txnReport.interval = interval
		getTransactionReport(interval);
	};
	
	
	
	

	//$scope.loadRestaurants('ALL');
	function init() {
		populateLiveRestos('live');
		populatePendingApprovalRestos('new');
	}
	init();
});