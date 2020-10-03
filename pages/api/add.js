// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


const defaultFields = [ { name: 'domain', type: 'String' },
    { name: 'capsuleSize', type: 'String' },
    { name: 'ingredientType', type: 'String' },
    { name: 'user', type: 'String' }]

export default async (req, res) => {
    const {email, quantity, types, density, measurementUnit, ...data} = req.body.data
    const dataFields = (() => {
        var ret = []
        for (const [key, value] of Object.entries(data)) {
            if(key!='domain')
            ret.push({key:key.toUpperCase(), value:value});
            else ret.push({key:"DOMAIN_ORIGIN", value:value})
        }
        return ret
    })()
    var config =
        {
            auth:
                {user: 'apiuser-5e3fe86115ff@apiconnector.com', pass: 'Marian1234@'},
            baseUrl: 'https://r2-api.dotmailer.com/v2/' // Account region endpoint
            // Any other 'request' options here
        }
        , dotmailer = require('dotmailer')(config)
        , addressBookId = 36103586

    var apiResponse = await new Promise(resolve => {
        dotmailer({
            endpoint: 'PostAddressBookContacts',
            tokens: [addressBookId],
            config: {
                type: 'json',
                options: {
                    email:email,
                    optInType:'Single',
                    emailType:'Html',
                    dataFields:dataFields
                }
            },
            callback: (error, resp) => {
                console.log(error,resp)
                resolve(resp)

            }
        })
    })
    res.statusCode = 200
    res.json(apiResponse)

}

