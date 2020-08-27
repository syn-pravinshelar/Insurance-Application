//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();
let deductible = require('../../models/deductible');

chai.use(chaiHttp);

const authCtrl = require('../../controllers/v1/authenticate');

describe('All API Test', () => {
    var token = '';
    describe('Perform Authentication',() => {        
        it("should get Authetication Token from Server",(done)=>{
            let user = {
                username:'user1',
                password:'express'
            }
            chai.request(server)
            .post('/api/v1/authenticate')
            .send(user)
            .end((err,res)=>{
                
                 res.should.have.status(200);
                 res.body.should.be.a('object');
                 res.body.should.have.property('token');
                 token = res.body.token;                 
                 done();

            });
        });
    });
    // Test all Deductible Operations
    describe('Perform CRUD Operatrion on Deductible',() => {
        let deductibleId = "";
        let ded = {
            definedAs : 'Allowable Values',
            deductibleValue :
            [{text:'$1,500',value:1500}],
            aggregateValue:1500,
            version:1
        }
        it("/POST Operation: Should allow to add new deducible with Deducitble amount $1500",(done)=>{                
            
            chai.request(server)
            .post('/api/v1/deductible')
            .set('Authorization','Bearer '+token)
            .send(ded)
            .end((err,res)=>{     
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(true);
                res.body.should.have.property('data');
                res.body.data.should.have.property('_id').length.to.be.above(0);
                deductibleId = res.body.data._id;
                //console.log(_id);
                done();
            });
        });

        it("/GET Get Deductible data for Id "+deductibleId,(done)=>{
            chai.request(server)
            .get('/api/v1/deductible/'+deductibleId)
            .set('Authorization','Bearer '+token)
            .send()
            .end((err,res)=>{     
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(true);
                res.body.should.have.property('data');
                res.body.data.should.have.property('_id').eql(deductibleId);
                res.body.data.should.have.property('deductibleValue').to.be.an('array').to.have.lengthOf(1);
                res.body.data.deductibleValue[0].should.have.property('text').eql('$1,500');
                res.body.data.deductibleValue[0].should.have.property('value').eql(1500);
                done();
            });
        })

        it("/PUT Update Deducible value to $2000 from $1500",(done)=>{
            ded.deductibleValue[0].text = "$2,000";
            ded.deductibleValue[0].value = 2000;
            ded.aggregateValue = 2000;
            ded.version = 2;
            chai.request(server)
            .put('/api/v1/deductible/'+deductibleId)
            .set('Authorization','Bearer '+token)
            .send(ded)
            .end((err,res)=>{     
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(true);
                res.body.should.have.property('data');
                res.body.data.should.have.property('_id').length.to.be.above(0);
                res.body.data.should.have.property('_id').eql(deductibleId);
                res.body.data.should.have.property('deductibleValue').to.be.an('array').to.have.lengthOf(1);
                res.body.data.deductibleValue[0].should.have.property('text').eql('$2,000');
                res.body.data.deductibleValue[0].should.have.property('value').eql(2000);
                done();
            });
        })

        it("/DELETE Delete Deductible data for Id "+deductibleId,(done)=>{
            chai.request(server)
            .delete('/api/v1/deductible/'+deductibleId)
            .set('Authorization','Bearer '+token)
            .send()
            .end((err,res)=>{     
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(true);                
                done();
            });
        })
    })
    
    // Test all Lmits Operatrions
    describe('Perform CRUD Operatrion on Limits',() => {
        let limitId = "";
        let lmt = {
            definedAs : 'Allowable Values',
            deductibleValue :
            [{text:'$1,500',value:1500}],
            aggregateValue:1500,
            version:1
        }
        it("/POST Operation: Should allow to add new limit with Limit amount $1500",(done)=>{                
            
            chai.request(server)
            .post('/api/v1/limit')
            .set('Authorization','Bearer '+token)
            .send(lmt)
            .end((err,res)=>{     
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(true);
                res.body.should.have.property('data');
                res.body.data.should.have.property('_id').length.to.be.above(0);
                limitId = res.body.data._id;
                //console.log(_id);
                done();
            });
        });

        it("/GET Get Limit data for Id "+limitId,(done)=>{
            chai.request(server)
            .get('/api/v1/limit/'+limitId)
            .set('Authorization','Bearer '+token)
            .send()
            .end((err,res)=>{     
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(true);
                res.body.should.have.property('data');
                res.body.data.should.have.property('_id').eql(limitId);
                res.body.data.should.have.property('deductibleValue').to.be.an('array').to.have.lengthOf(1);
                res.body.data.deductibleValue[0].should.have.property('text').eql('$1,500');
                res.body.data.deductibleValue[0].should.have.property('value').eql(1500);
                done();
            });
        })

        it("/PUT Update Deducible value to $2000 from $1500",(done)=>{
            ded.deductibleValue[0].text = "$2,000";
            ded.deductibleValue[0].value = 2000;
            ded.aggregateValue = 2000;
            ded.version = 2;
            chai.request(server)
            .put('/api/v1/deductible/'+limitId)
            .set('Authorization','Bearer '+token)
            .send(ded)
            .end((err,res)=>{     
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(true);
                res.body.should.have.property('data');
                res.body.data.should.have.property('_id').length.to.be.above(0);
                res.body.data.should.have.property('_id').eql(limitId);
                res.body.data.should.have.property('deductibleValue').to.be.an('array').to.have.lengthOf(1);
                res.body.data.deductibleValue[0].should.have.property('text').eql('$2,000');
                res.body.data.deductibleValue[0].should.have.property('value').eql(2000);
                done();
            });
        })

        it("/DELETE Delete Deductible data for Id "+limitId,(done)=>{
            chai.request(server)
            .delete('/api/v1/deductible/'+limitId)
            .set('Authorization','Bearer '+token)
            .send()
            .end((err,res)=>{     
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(true);                
                done();
            });
        })
    })
        
    

});
    