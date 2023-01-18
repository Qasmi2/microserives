module.exports = {
    senecaConfigurations : {
        type        : 'amqp',
        url         : process.env.AMQP_URL || 'rabbitmq:5672',
        transport   : 'seneca-amqp-transport',
    },
    database: {
        connection: process.env.connection || 'kkkkkk',
        dbName: 'server'
    },
    keys: {
        secret_jwt: "IloveMyselfsomehow"
    },
    generateParamsForCrashReport : (err) => {
        let errorKeys = Object.keys(err);
        let error = '';
        errorKeys.forEach(key => {
            error += `${key} ===> ${err[key]}<br/>- - - - - - - - - - - - - - - - - - - - - - - - - - - -<br/>`
        });
        const params = {
            Source: 'hassan.ali@ukan.co',
            Destination: {
                ToAddresses: [
                    'nadeem.qasmi@ukan.co',
                ]
            },
            ReplyToAddresses: [
                'nadeem.qasmi@ukan.co'
            ],
            Message: {
                Body: {
                    Html: {
                        Charset: "UTF-8",
                        Data: `<strong>Error Occured In Server (GATEWAY Service)! </strong>
                        <br/>please go and check the error log file for more details, the error is following: 
                        <br/><br/>${error}`
                    }
                },
                Subject: {
                        Charset: "UTF-8",
                        Data: `Error Occured In Server (GATEWAY Service)`
                }
            }
        }
        return params;
    },
    SESConfig : {
        apiVersion: '2010-12-01',
        accessKeyId: '...',
        secretAccessKey: '...+eU+dX',
        region: 'us-east-1'
    }
};