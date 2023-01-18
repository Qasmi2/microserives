const homeRepository = require('../../infrastructure/repositories/home')
const { CountByDate, CountByRange,personlization } = require('../../domain/activity_count')

module.exports = class HomeController {

    async getcitiesAndInterestList() {
        return await homeRepository.homeData();
    }
    async getLocation(arr){
        let is_active = false;
        let data = await homeRepository.getLocation(arr)
        let location = data.location;
        let cities = data.cities;
        console.log("cities ",cities)
        for(let i=0; i< cities.length; i++){
            if(cities[i].name == location.city){
                is_active = true;
            }
        }
        location.is_active = is_active;
        return location;
    }

    async getActivityCount(arr) {
        console.log(arr);
        if (arr.dateRange) {
            let searchEntity = new CountByRange(arr);
            return await homeRepository.getActivityCountByRange(searchEntity);
        } else {
            let searchEntity = new CountByDate(arr);
            return await homeRepository.getActivityCountByDate(searchEntity);

        }
    }

    async getReleaseFlag(arr) {
        let data = await homeRepository.getlatestRelease(arr.plateform);
        return (arr.appVersion >= data.release_version);
    }

    async getmetadata(url) {
        return await homeRepository.getUrlMetadata(url);
    }

    async getCityNewsCount(city){
        return await homeRepository.getCityNewsCount(city);
    }
    async getPersonlization(body){
        console.log("testing model of personlization is before modeling -->",body);
        let personlization_data = new personlization(body);
        console.log("testing model of personlization is after modeling -->",personlization_data);
        return await homeRepository.getPersonlization(personlization_data);
    }
    
}