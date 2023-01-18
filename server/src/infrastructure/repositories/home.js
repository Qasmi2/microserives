const db = require('../db/db-connector')
var geoip = require('geoip-lite');


const homeData = async () => {
    let cityQuery = `SELECT cities.id, cities.name, cities.picture,states.abbre AS state_name,countries.name AS country FROM managementpanel.cities inner join managementpanel.states 
    on cities.state_id = states.id inner join managementpanel.countries on states.country_code = countries.country_code WHERE cities.is_active=true order by cities.name asc`;
    let interestQuery = `SELECT id, interest_name, picture FROM managementpanel.interests;`;
    let tagsQuery = `select tag_name from newsservice.tags;`;
    try {
        const { rows } = await db.query(cityQuery);
        let data = { cities: rows };
        let interestsData = await db.query(interestQuery);
        data.interests = interestsData.rows;
        let tagsData = await db.query(tagsQuery);
        data.news_tags = tagsData.rows;
        return data;
    } catch (error) {
        throw (error);
    }
}

const getLocation = async (arr) =>{
    
    let cityQuery = `SELECT id, "name", picture FROM managementpanel.cities WHERE is_active=true order by name asc;`;
    try {
        const { rows } = await db.query(cityQuery);
        let data = { cities: rows };
        let ipAddress = arr.ip;
        let location = geoip.lookup(ipAddress);
        data.location = location;
        return data;
    } catch (error) {
        throw(error)
    }
}

const getActivityCountByDate = async (arr) => {
    let query = `SELECT * from activity_service.activity_count_by_date($1,$2);`;
    let values = [arr.city, arr.date]
    try {
        const { rows } = await db.query(query, values);
        let data = { 'All': 0 };
        rows.map(row => {
            data.All = data.All + parseInt(row.activities);
            data[row.category] = row.activities;
        });
        return data;
    } catch (error) {
        throw (error);
    }
}

const getActivityCountByRange = async (arr) => {
    console.log(arr);
    let query = `SELECT * from activity_service.activity_count_by_range($1,$2,$3);`;
    let values = [arr.city, arr.dateFrom, arr.dateTo];
    try {
        const { rows } = await db.query(query, values);
        let data = { 'All': 0 };
        rows.map(row => {
            data.All = data.All + parseInt(row.activities);
            data[row.category] = row.activities;
        });
        return data;
    } catch (error) {
        throw (error);
    }
}

const getlatestRelease = async (plateform) => {
    let query = `select release_version from managementpanel.releases where release_platform = '${plateform}' 
    order by release_version desc limit 1;`;
    try {
        const { rows } = await db.query(query);
        return rows[0];
    } catch (error) {
        throw (error);
    }
}

const getUrlMetadata = async (url) => {
    let query = `SELECT url, meta_title, meta_description, content_box
    FROM managementpanel.seo where url='${url}'`;
    try {
        const { rows } = await db.query(query);
        return rows[0];
    } catch (error) {
        throw (error);
    }
}
const getCityNewsCount = async (city) => {
    
    let query = `select count(id) FROM newsservice.news where city = '${city}'`;
    try {
        const { rows } = await db.query(query);
        return rows[0];
    } catch (error) {
        throw (error);
    }
}
const getPersonlization = async (model) => {
    let cols = Object.keys(model);
    let vals = Object.values(model);
    let valuesArray = [];
    for(let i=1; i<=vals.length; i++){
        let v= '$'+i;
        valuesArray.push(v);
    }
    console.log("cols are ",cols);
    console.log("vals are ==>",vals);
    
    let query = `INSERT INTO personalization_service.news_interactions (${cols})VALUES(${valuesArray}) RETURNING *`;
    console.log("query is ===>",query)
    try {
        const { rows } = await db.query(query,vals);
        return rows[0];
    } catch (error) {
        throw (error);
    }
}


module.exports = {
    homeData,
    getLocation,
    getActivityCountByDate,
    getActivityCountByRange,
    getlatestRelease,
    getUrlMetadata,
    getCityNewsCount,
    getPersonlization
}