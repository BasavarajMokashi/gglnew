//Custome Dependency Modules
var database = require(__dirname + "/../database.js");
var dbFieldsMapping = require(__dirname + "/../mapping.js");
var otpMgmt = require(__dirname + "/../otpTransactions.js");
var logger = require('../../../config/logger.js');

module.exports = {

    auth: function(req, response) {
		try {
            var username = req.body.username;
            var upassword = req.body.password;
			var UserStatus=1;
		    if (username && upassword) {
                try{ 
				    var authQuery = "SELECT UserName, Password,LoginUserId from user WHERE UserName='"+username+"' AND Password='"+upassword+"' AND UserStatus="+UserStatus+"";
                   database.dbTransaction(req, response, authQuery, function(resultSet) {
					    if (resultSet.length > 0) {
						   return response.status(200).json({"code": 200,"result":resultSet[0]});
                        } else {
                            return response.status(400).json({ "code": 400, "status": "Invalid Credientials!!" });
                        }
                    });
                } catch (error) {
					
                    return response.status(400).json({ "code": 400, "status": "Invalid Credientials!!" });
                }
            } else {
                return response.status(400).json({ "code": 400, "status": "username/Password is Empty!!" });
            }
        } catch (error) {
            return response.status(500).json({ "code": 500, "status": "Internal Server Error!!" });
        }
    }

    
    
}



