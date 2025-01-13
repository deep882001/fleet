import requests
import base64

endpoint = "https://services.spireon.com/v0/rest/assets/"
username = "Spireonintegration@redwoodmaterials.com"
password = "ReDw34#$Mat"
token = "803ea778-2d93-4824-a9a6-19fecd598da3"

headers = {
    "Authorization": f"Bearer {token}",
    "Basic": "Basic " + base64.b64encode(f"{username}:{password}".encode()).decode()
}

response = requests.get(endpoint, headers=headers)

if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f"Error: {response.status_code}")
    print(response.text)