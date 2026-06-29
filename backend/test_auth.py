import subprocess, time, urllib.request, json, sys

# Start uvicorn
proc = subprocess.Popen(
    [r'C:\work\OpenModel_CRUD_01\backend\venv\Scripts\python.exe', '-m', 'uvicorn', 'app.main:app', '--host', '0.0.0.0', '--port', '6030', '--log-level', 'error'],
    cwd=r'C:\work\OpenModel_CRUD_01\backend'
)

time.sleep(4)

# Test register
try:
    req = urllib.request.Request(
        'http://localhost:6030/api/auth/register',
        data=json.dumps({'username': 'testuser3', 'email': 'test3@example.com', 'password': 'testpass123'}).encode(),
        headers={'Content-Type': 'application/json'}
    )
    resp = urllib.request.urlopen(req)
    print('Register:', resp.read().decode())
except urllib.error.HTTPError as e:
    print('Register Error:', e.code, e.read().decode())

# Test login
try:
    req = urllib.request.Request(
        'http://localhost:6030/api/auth/login',
        data=json.dumps({'username': 'testuser3', 'password': 'testpass123'}).encode(),
        headers={'Content-Type': 'application/json'}
    )
    resp = urllib.request.urlopen(req)
    data = json.loads(resp.read().decode())
    print('Login:', resp.status, json.dumps(data, indent=2)[:200])
    token = data.get('token', '')
    
    # Test protected route without token
    try:
        req = urllib.request.Request('http://localhost:6030/api/surveys')
        resp = urllib.request.urlopen(req)
        print('Protected (no token):', resp.status)
    except urllib.error.HTTPError as e:
        print('Protected (no token):', e.code, '(expected 401)')
    
    # Test protected route with token
    req2 = urllib.request.Request('http://localhost:6030/api/surveys')
    req2.add_header('Authorization', f'Bearer {token}')
    resp2 = urllib.request.urlopen(req2)
    print('Protected (with token):', resp2.status)
    
    # Test logout
    req3 = urllib.request.Request(
        'http://localhost:6030/api/auth/logout',
        data=json.dumps({'token': token}).encode(),
        headers={'Content-Type': 'application/json'}
    )
    resp3 = urllib.request.urlopen(req3)
    print('Logout:', resp3.read().decode())
    
except urllib.error.HTTPError as e:
    print('Error:', e.code, e.read().decode())
finally:
    proc.terminate()
    proc.wait()

print('All tests completed.')
