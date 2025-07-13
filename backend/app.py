from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Replace with your OpenWeatherMap API key
API_KEY = "your_openweathermap_api_key"

@app.route('/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city')
    if not city:
        return jsonify({"error": "City name is required"}), 400

    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(url)

    if response.status_code != 200:
        return jsonify({"error": "Could not fetch weather data"}), response.status_code

    data = response.json()
    return jsonify({
        "city": data["name"],
        "temperature": data["main"]["temp"],
        "description": data["weather"][0]["description"]
    })

if __name__ == '__main__':
    app.run(debug=True)
