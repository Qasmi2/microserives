const seneca = require('seneca')();
const HomeController = require('../../application/controllers/home-controller');

//seneca configuration;
seneca.use('seneca-amqp-transport');

//Initialize classes
const homeService = new HomeController();

const userClient = seneca.client({
    type: 'amqp',
    pin: 'service:user_service,cmd:*',
    url: process.env.AMQP_URL
});

const newsClient = seneca.client({
    type: 'amqp',
    pin: 'service:news_service,cmd:*',
    url: process.env.AMQP_URL
});

const activityClient = seneca.client({
    type: 'amqp',
    pin: 'service:activity_service,cmd:*',
    url: process.env.AMQP_URL
});

const pushNotificationClient = seneca.client({
    type: 'amqp',
    pin: 'service:push_notification_service,cmd:*',
    url: process.env.AMQP_URL
});

const newsletterClient = seneca.client({
    type: 'amqp',
    pin: 'service:newsletter_service,cmd:*',
    url: process.env.AMQP_URL
});

const conversationClient = seneca.client({
    type: 'amqp',
    pin: 'service:conversation_service,cmd:*',
    url: process.env.AMQP_URL
});

function callUserService(command, params = null) {
    return new Promise((resolve, reject) => {
        userClient.act(`service:user_service,cmd:${command}`, { params }, (error, data) => {
            if (data)
                resolve(data);
            if (error)
                reject(error);
        });
    });
};

function callNewsService(command, params = null) {
    return new Promise((resolve, reject) => {
        newsClient.act(`service:news_service,cmd:${command}`, { params }, (error, data) => {
            if (data)
                resolve(data);
            if (error)
                reject(error);
        });
    });
}

function callActivityService(command, params = null) {
    return new Promise((resolve, reject) => {
        activityClient.act(`service:activity_service,cmd:${command}`, { params }, (error, data) => {
            if (data)
                resolve(data);
            if (error)
                reject(error);
        });
    });
};

function callPushNotificationService(command, params = null) {
    return new Promise((resolve, reject) => {
        pushNotificationClient.act(`service:push_notification_service,cmd:${command}`, { params }, (error, data) => {
            if (data)
                resolve(data);
            if (error)
                reject(error);
        });
    });
};

function callNewsletterService(command, params = null) {
    return new Promise((resolve, reject) => {
        pushNotificationClient.act(`service:newsletter_service,cmd:${command}`, { params }, (error, data) => {
            if (data)
                resolve(data);
            if (error)
                reject(error);
        });
    });
};

function callConversationService(command, params = null) {
    return new Promise((resolve, reject) => {
        newsClient.act(`service:conversation_service,cmd:${command}`, { params }, (error, data) => {
            if (data)
                resolve(data);
            if (error)
                reject(error);
        });
    });
}

const callHome = {
    getcitiesAndInterestList: async () => {
        return { Ok: await homeService.getcitiesAndInterestList() };
    },
    getLocation: async(ip) =>{
        return {Ok: await homeService.getLocation(ip)}
    },
    getActivityCount: async (city) => {
        return { Ok: await homeService.getActivityCount(city) }
    },
    getLatestReleaseFlag: async (arr) => {
        return { Ok: await homeService.getReleaseFlag(arr) }
    },
    getUrlMetadata: async (url) => {
        return { Ok: await homeService.getmetadata(url) }
    },
    getCityNewsCount: async (city) => {
        return { Ok: await homeService.getCityNewsCount(city) }
    },
    getPersonlization:async (body) => {
        return { Ok: await homeService.getPersonlization(body) }
    }

    
};

module.exports = {
    callUserService,
    callNewsService,
    callActivityService,
    callPushNotificationService,
    callNewsletterService,
    callConversationService,
    callHome
}
