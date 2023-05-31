export default function WeatherData({city, summary: { id, temperature }, className}) {
    return <div className={className}>
    <p>{city} · T: {temperature}ºC · <img src={`https://openweathermap.org/img/wn/10d@2x.png`}></img></p>
</div>
}