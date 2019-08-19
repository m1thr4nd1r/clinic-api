var should = require("should");
var request = require("request");
var chai = require("chai");
var expect = chai.expect;
var urlBase = "http://localhost:3000/schedule/";

describe("Test Clinic API",function(){
    it("List schedules",function(done){
      request.get(
        {
          url : urlBase
        },
        function(error, response, body){
          var _body = {};
          try{
            _body = JSON.parse(body);
          }
          catch(e){
            _body = {};
          }

          expect(response.statusCode).to.equal(200);
          expect(_body.length).to.least(0);

          done(); 
        }
      );
    });

    it("Check schedules",function(done){
      request.get(
        {
          url : urlBase + "check/25-01-2018/29-01-2018"
        },
        function(error, response, body){
          var _body = {};
          try{
            _body = JSON.parse(body);
          }
          catch(e){
            _body = {};
          }

          expect(response.statusCode).to.equal(200);
          expect(_body.length).to.least(0);

          done(); 
        }
      );
    });

    it("Create schedule",function(done){
      request.post(
        {
          url : urlBase,
          json: {
              "type": "daily",
              "intervals": [
                {"start": "14:00", "end": "14:30"}
              ]
          }
        },
        function(error, response, body){

          expect(response.statusCode).to.equal(201);
          expect(body).contain('successfully');

          done(); 
        }
      );
    });

    it("Delete schedule",function(done){
      request.post(
        {
          url : urlBase,
          json: {
              "type": "daily",
              "intervals": [
                {"start": "14:00", "end": "14:30"}
              ]
          }
        },
        function(error, response, body){

          expect(response.statusCode).to.equal(201);
          const id = body.split(' ')[1];

          request.delete(
            {
              url: urlBase + id + "/",
            },
            function(error, response, body){
              expect(response.statusCode).to.equal(200);
              expect(body).contain('successfully');
              done(); 
            }
          );
        }
      );
    });
});