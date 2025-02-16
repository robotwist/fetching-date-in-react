# Weather API APP Using JS/React
Alt methods to find hot and cold temps:
const fetchMultipleData = async (cities) => {
1. data.map - math.max - .min:
   
    const data = await weatherService.showMultiple(cities);

    const temps = data.map(item => item.current.temp_f); // Extract temperatures
    const hottestTemp = Math.max(...temps);
    const coldestTemp = Math.min(...temps);

    const hottestCity = data.find(item => item.current.temp_f === hottestTemp);
    const coldestCity = data.find(item => item.current.temp_f === coldestTemp);

    setHottest(hottestCity);
    setColdest(coldestCity);
};

2. Looping Method:

    const fetchMultipleData = async (cities) => {
    const data = await weatherService.showMultiple(cities);

    let hottest = data[0];
    let coldest = data[0];

    for (let i = 1; i < data.length; i++) {
        const current = data[i];
        if (current.current.temp_f > hottest.current.temp_f) {
            hottest = current;
        }
        if (current.current.temp_f < coldest.current.temp_f) {
            coldest = current;
        }
    }

    setHottest(hottest);
    setColdest(coldest);
};
