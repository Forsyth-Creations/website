# Calling a remote API in Python
import urllib.request
import json

def fetch_data(url):
    try:
        with urllib.request.urlopen(url) as response:
            data = json.loads(response.read().decode())
            return data
    except Exception as e:
        print(f"Error: {e}")
        return None

# Example: Fetch a user from JSONPlaceholder API
url = "https://jsonplaceholder.typicode.com/users/1"
user = fetch_data(url)

if user:
    print(f"Name: {user['name']}")
    print(f"Email: {user['email']}")
