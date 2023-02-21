from app import client

def test_get_users():
    res = client.get('/users')
    
    assert res.status_code == 200
    assert len(res.get_json()) != 0
    assert res.get_json()[0]['id']==1
    
def test_post_users():
    data = {
        'id':5,
        'username': 'Tests', 
        'password': 3333,
    }
    res = client.post('/users', json=data)
    
    assert res.status_code == 200
    assert len(res.get_json()) != 0
    assert res.get_json()[-1]['username']==data['username']