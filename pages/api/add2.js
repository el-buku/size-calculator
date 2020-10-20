
export default async (req, res) => {
    const {email, types, density, sizes, domain, ...data} = req.body.data
    const Hubspot = require('hubspot')
    const hubspotClient = new Hubspot({apiKey:'c7450bd3-ff52-4ce9-834b-735e850e115d'})
    const dataFields = (() => {
        var ret = []
        for (const [key, value] of Object.entries(data)) {
            if(key!='name')
                ret.push({property:key.toLowerCase(), value:value});
            else ret.push({property:"firstname", value:value})
        }
        return ret
    })()
    const contactObj = {
        properties:dataFields
    }
    const contact = await hubspotClient.contacts.createOrUpdate(email, contactObj)
    console.log(contact)
    res.statusCode = 200
    res.json({data:'ok'})

}
