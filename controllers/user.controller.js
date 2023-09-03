const TokenGenerator = require('uuid-token-generator');
const { fromString } = require('uuidv4');
const db = require("../models");
const User = db.users;
const {atob,btoa}  = require("b2a");

exports.login = (req, res) => {
    console.log(req.headers.authorization);
    const authHeader  = req.headers.authorization.split(" ")[1];
    console.log(authHeader);
    console.log(atob(authHeader));
    let unamePwd = atob(authHeader);
    const uname =  unamePwd.split(":")[0];
    const pwd = unamePwd.split(":")[1];

    console.log(uname);
    console.log(pwd);
    if (!uname && !pwd) {
      res.status(400).send({ message: "Please provide username and password to continue." });
      return;
    }

     const filter = { username: uname };

    User.find(filter, (err, usersFound)=>{
      let user = usersFound[0];  
      if(err || user === null){
          console.log("IN ERR");
          res.status(500).send({
          message: "User Not Found."
        });
      }else {

        if(pwd === user.password){
          console.log("sanket shivam")
          const tokgen = new TokenGenerator(); 
          const accessTokenGenerated = tokgen.generate();
          console.log(accessTokenGenerated);
          
          const uuidGenerated = fromString(uname);
          user.isLoggedIn = true;
          user.uuid = uuidGenerated;
          user.accesstoken = accessTokenGenerated;
          User.findOneAndUpdate(filter, user, { useFindAndModify: false })
          .then(data => {
            if (!data) {
              res.status(404).send({
                message: "Some error occurred, please try again later."
              });
            } else 
            { 
                res.header('access-token', user.accesstoken); 
                
                res.send({"id":user.uuid, "access-token":user.accesstoken}); 
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating."
            });
          });

        }else{
          res.status(500).send({
            message: "Please enter valid password."
          });
        }
      }
      
    });

  };

 exports.signUp = (req, res) => {
     
     console.log(req.body);
    if (!req.body.email_address && !req.body.password) {
      res.status(400).send({ message: "Please provide email and password to continue." });
      return;
    }
    const user = new User({
      email: req.body.email_address,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.first_name + req.body.last_name,
      password: req.body.password,
      contact: req.body.mobile_number,
      role: req.body.role ? req.body.role : 'user',
      isLoggedIn : false,   
      uuid : "",
      accesstoken : "",
      coupens: [],
      bookingRequests : []
    });
    user
      .save(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred, please try again later."
        });
      });
  };
 

exports.logout = (req, res) => {

    if (!req.body.uuid) {
      res.status(400).send({ message: "ID Not Found!" });
      return;
    }
   
    const update = { isLoggedIn: false, uuid: "",accesstoken: ""  };
  
    User.findOneAndUpdate({"uuid": req.body.uuid}, update)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: "Some error occurred, please try again later."
          });
        } else res.send({ message: "Logged Out successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating."
        });
      });
  };
  
exports.getCouponCode = (req, res) => {
  console.log("In coupen code");
  console.log(req.headers.authorization);
  const tokenReceived  = req.headers.authorization.split(" ")[1];
  console.log(tokenReceived);
  User.find({"accesstoken": tokenReceived})
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: "Some error occurred, please try again later."
      });
    } else 
    {
      console.log(data);
      console.log(data[0].coupens);

      var sendCoupenData = null;
      for(i=0;i<data[0].coupens.length;i++)
      {
        if(data[0].coupens[i].id ==req.query.code)
        {
          sendCoupenData = data[0].coupens[i]; 
          break;
        }
      }

      res.send(sendCoupenData);
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error validating token!."
    });
  });
 
  
};

exports.bookShow = (req, res) => {

  var update = null;
  var newRefNo = null;

  if (!req.body.customerUuid) {
    res.status(400).send({ message: "ID Not Found!" });
    return;
  }

  User.find({"uuid": req.body.customerUuid})
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: "Some error occurred, please try again later."
      });
    } 
    else 
    {
      console.log("Currently Available Booking Requests Data of User");
      console.log(data[0].bookingRequests)
      
      console.log("After Adding New Booking Requests");
      
      newRefNo = new Date().getMilliseconds().toString() + Math.floor(Math.random()*100).toString();
      req.body.bookingRequest.reference_number =newRefNo;

      data[0].bookingRequests.push(
        req.body.bookingRequest);
     
      console.log(data[0].bookingRequests)

      bookingRequests = data[0].bookingRequests;

      update = {bookingRequests: data[0].bookingRequests};
        if(update!=null)
        {
          console.log("Inside update")
            User.findOneAndUpdate({"uuid": req.body.customerUuid}, update)
            .then(data1 => {
              if (!data1) {
                res.status(404).send({
                  message: "Some error occurred, please try again later."
                });
              } 
              else 
              {
                console.log("Done update");
                console.log(update);
                console.log("sending reference No: " + newRefNo);
                res.send({ reference_number: newRefNo });
              }
            })
            .catch(err => {
              res.status(500).send({
                message: "Error updating."
              });
            });
        }
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error validating token!."
    });
  });

   
  
};