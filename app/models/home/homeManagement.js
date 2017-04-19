//Custome Dependency Modules
var database = require(__dirname + "/../database.js");
var dbFieldsMapping = require(__dirname + "/../mapping.js");
var offersMgmt = require(__dirname + "/../offersManagement.js");
var waiverMgmt = require(__dirname + "/../waiverManagement.js");
var AppConstants = require(__dirname + "/../common/constants.js");
var myPromise = require(__dirname + "/../dbOperationUtils.js");
var bounceBackMgmt = require(__dirname + "/../bouncebackManagement.js");
var bounceBackMgmt = require(__dirname + "/../bouncebackManagement.js");
var logger = require('../../../config/logger.js');
var http = require('http');
var _ = require('lodash');
module.exports = {

    getClassInfo: function(req, response) {
		try {
		database.getDBConnection(connection => {
		var classInfoQuery = "SELECT ClassId,ClassName,Captions,Description,Skills FROM class WHERE ClassStatus = 1"
	    connection.query(classInfoQuery, function(err,rows){
		connection.release(classInfoQuery);
		if(!err) {
		if(rows.length > 0){
			return response.status(200).json(rows);
	       }
         else{
             return response.status(204).json({ "status": "No Records Found" });
               }			   
		     }
		  });
        });   
        
	 } catch (error) {
        logger.info(error);
        return response.status(500).json({ "status": "Internal Server Error!!" });
    }
    },
	
	
	getQuestionListInfo: function(req, response) {
		var ClassId = req.params.classid;
		try {
		database.getDBConnection(connection => {
		var quesListInfoQuery = "SELECT cat.CategoryId,cat.CategoryName,scat.SubCategoryName,scat.SubCategoryId FROM categories cat "+
		"INNER JOIN subcategory scat On cat.CategoryId =scat.CategoryId WHERE cat.ClassId="+ClassId+""
	    connection.query(quesListInfoQuery, function(err,rows){
			
		connection.release(quesListInfoQuery);
		if(!err) {
			if(rows.length > 0){
			return response.status(200).json(rows);
	       }
         else{
             return response.status(204).json({ "status": "No Records Found" });
               }			   
		     }
		  });
        });   
        
	 } catch (error) {
        logger.info(error);
        return response.status(500).json({ "status": "Internal Server Error!!" });
    }
        
    },
	
	getQuestionDetailsInfo: function(req, response) {
		var subCateId = req.params.subCateId;
		try {
		database.getDBConnection(connection => {
		var qusDetailsInfoQuery = "SELECT q.QuestionId,q.Question,q.questionsHasImage,q.QusetionsLevelid, "+
		"ql.QusetionsLevelName,qp.OptionId,qp.QuestionOption, "+
		"qp.Answer,qp.weightage FROM questions q INNER JOIN questionsleveltype ql " +
		"on q.QusetionsLevelid=ql.QusetionsLevelid INNER JOIN questionoption qp " +
		"ON q.QuestionId=qp.QuestionId WHERE SubCategoryId="+subCateId+" AND q.QuestionStatus=1";
		console.log(qusDetailsInfoQuery);	
	    connection.query(qusDetailsInfoQuery, function(err,rows){
		console.log(rows);	
		connection.release(qusDetailsInfoQuery);
		if(!err) {
			if(rows.length > 0){
			return response.status(200).json(rows);
	       }
         else{
             return response.status(204).json({ "status": "No Records Found" });
               }			   
		     }
		  });
        });   
        
	 } catch (error) {
        logger.info(error);
        return response.status(500).json({ "status": "Internal Server Error!!" });
    }
        
    }

    
    
}



