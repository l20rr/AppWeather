export const searchCity = async (City) => {
    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=d7d590b3d5defc71d5a1190833a59dff`
        const response = await fetch(url)
        return await response.json()
    } catch (error) {
        console.log("error: ", error)
    }
}


