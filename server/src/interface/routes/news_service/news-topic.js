const express = require('express')
const serviceCalls = require('../service-calls')
const ErrorHandler = require('../../../../error-handler')
const responseHelper = require('../../helpers/response-helper')
const validator = require('../../middlewares/validator')
const { validateNewsId } = require('../../middlewares/schemas/news_schema')

const router = express.Router();


router.get('/GetTopics', async (req, res, next) => {
   
    serviceCalls.callNewsService('get_topics_news')
        .then(async data => {
            responseHelper.generateResponse(req, res, data, null, 'successfully fetched the Topics of News', 200)
        })
        .catch(err => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));

    });

router.post('/GetNewsInTopic',async (req, res, next) => {
        console.log('getNewsInTopic news  from server route topic_id=>>>', req.body);
        let params = req.body;
        serviceCalls.callNewsService('get_news_in_topic', params)
            .then(async data => {
                responseHelper.generateResponse(req, res, data, null, 'successfully fetched the News of the specific topic', 200)
            })
           .catch(err => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));

    });

router.post('/AddFollowTopic',async (req, res, next) => {
        console.log('=Follow Topic news  from server route user_id=>>>', req.body);
        let params = req.body;
        serviceCalls.callNewsService('add_follow_topic', params)
            .then(async data => {
                responseHelper.generateResponse(req, res, data, null, 'successfully Added the topic a user follows', 200)
            })
            .catch(err => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));

    });

router.post('/GetFollowTopic',async (req, res, next) => {
        console.log('GEt Follow Topic news  from server route by user_id=>>>', req.body);
        let params = req.body;
        serviceCalls.callNewsService('get_follow_topic', params)
            .then(async data => {
                responseHelper.generateResponse(req, res, data, null, 'successfully Get the topic a user followed', 200)
            })
            .catch(err => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));

    });


    


module.exports = router;