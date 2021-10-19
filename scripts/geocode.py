import sys, json, requests

url = 'https://api.digitransit.fi/geocoding/v1/search?text='

if len(sys.argv) < 2:
    print('Usage: python geocode.py places_file.json')
    exit(0)

fn = sys.argv[1]

with open(fn) as f:
    places = json.load(f, encoding='utf-8')

for p in places:
    resp = requests.get(url + p['address'])
    data = resp.json()
    p['coordinates'] = data['features'][0]['geometry']['coordinates']

with open('geocoded_' + fn, 'w', encoding='utf-8') as f:
    json.dump(places, f, ensure_ascii=False)
