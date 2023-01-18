const express = require('express')
const serviceCalls = require('../service-calls')
const ErrorHandler = require('../../../../error-handler')
const responseHelper = require('../../helpers/response-helper')
const validator = require('../../middlewares/validator')


const router = express.Router();


router.post('/GetConversationsInTopic', async (req, res, next) => {
    let params = req.body;
    serviceCalls.callConversationService('get_conversations_in_topic',params)
        .then(async data => {
            responseHelper.generateResponse(req, res, data, null, 'successfully fetched the conversations  of the topic', 200)
        })
        .catch(err => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));

    });

router.post('/GetConversationById',async (req, res, next) => {
        let params = req.body;
        console.log("server route --> GetConversationById",params)
        serviceCalls.callConversationService('get_conversation_by_id', params)
            .then(async data => {
                responseHelper.generateResponse(req, res, data, null, 'successfully fetched conversation of the specific topic', 200)
            })
           .catch(err => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));

    });

router.post('/ChangeConversationTopic',async (req, res, next) => {
        let params = req.body;
        serviceCalls.callConversationService('change_conversation_topic', params)
            .then(async data => {
                responseHelper.generateResponse(req, res, data, null, 'successfully updated conversation topic', 200)
            })
           .catch(err => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));

    });

router.post('/CreateComment',async (req, res, next) => {
        let params = req.body;
        serviceCalls.callConversationService('create_comment', params)
            .then(async data => {
                responseHelper.generateResponse(req, res, data, null, 'successfully created comment', 200)
            })
           .catch(err => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));

    });

router.post('/GetCommentById',async (req, res, next) => {
        let params = req.body;
        serviceCalls.callConversationService('get_comment_by_id', params)
            .then(async data => {
                responseHelper.generateResponse(req, res, data, null, 'successfully fetched the comments of the specific topic', 200)
            })
           .catch(err => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));

    });


router.post('/GetCommentsInConversation',async (req, res, next) => {
        let params = req.body;
        serviceCalls.callConversationService('get_comments_in_conversation', params)
            .then(async data => {
                responseHelper.generateResponse(req, res, data, null, 'successfully fetched the comments of the conversation', 200)
            })
           .catch(err => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));

    });


router.post('/GetStatsOfTopic',async (req, res, next) => {
        let params = req.body;
        serviceCalls.callConversationService('get_stats_of_topic', params)
            .then(async data => {
                responseHelper.generateResponse(req, res, data, null, 'successfully fetched the count of conversation and comments', 200)
            })
           .catch(err => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));

    });

router.post('/GetTotalCommentsOnConversation',async (req, res, next) => {
        let params = req.body;
        serviceCalls.callConversationService('get_total_comments_on_conversation', params)
            .then(async data => {
                responseHelper.generateResponse(req, res, data, null, 'successfully fetched the comments of the specific conversation', 200)
            })
           .catch(err => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));

    });


module.exports = router;