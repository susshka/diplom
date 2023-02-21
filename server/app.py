from flask import Flask, jsonify, request
import sqlalchemy as db
from sqlalchemy.orm import sessionmaker, scoped_session,declarative_base
from sqlalchemy import create_engine, engine
#sfrom sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.engine import URL
from flask_jwt_extended import JWTManager, jwt_required #required ставится под роутом, чтобы к нему был доступ только при авторизованности (при вызове запроса в параметр heders передается токен)
from config import Config
from apispec.ext.marshmallow import MarshmallowPlugin
from apispec import APISpec
from flask_apispec.extension import FlaskApiSpec
from schemas import UserSchema

app = Flask(__name__)
app.config.from_object(Config)

client = app.test_client()

engine_url = engine.URL.create(
            "mssql+pyodbc",
            host = Config.HOST,
            database = Config.DATABASE,
            query={
                'driver': "ODBC Driver 17 for SQL Server",
                "TrustServerCertificate": "yes",
                "authentication": "ActiveDirectoryIntegrated",},
)
engine = create_engine(engine_url, echo=False, fast_executemany=True)

session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))

Base =declarative_base()
Base.query = session.query_property()

jwt = JWTManager(app)

docs = FlaskApiSpec()
docs.init_app(app)

app.config.update({
    'APISPEC_SPEC': APISpec(
        title='app',
        version='v1',
        openapi_version='2.0',
        plugins=[MarshmallowPlugin()],
    ),
    'APISPEC_SWAGGER_URL':'/swagger'
})

from models import *

Base.metadata.create_all(bind=engine)


@app.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    users = User.query.all()
    '''usrs = []
    for x in users:
        usrs.append(
            {
                'id': x.id,
                'login':x.login,
                'password':x.password    
            }
        )
    '''
    schema = UserSchema(many=True)
    return jsonify(schema.dump(users))

@app.route('/users/<string:user_login>', methods=['GET'])
def get_user(user_login):
    check = User.query.filter(User.login==user_login).first()
    if not check:
        return {'message':'No users with this login'}, 200
    return {'message':'This user find on base'}, 200

'''
@app.route('/users', methods=['POST'])
def add_users():
    new_user = request.json
    users.append(new_user)
    return jsonify(users)

@app.route('/users/<int:user_id>', methods=['PUT'])
def update_users(user_id):
    item = next((x for x in users if x['id'] == user_id), None)
    params = request.json
    if not item:
        return {'message':'No users with this id'}, 400
    item.update(params)
    return item

@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_users(user_id):
    idx = None
    for x in users:
       if x['id'] == user_id:
           idx = users.index(x)
    users.pop(idx)
    return '', 204 
'''
@app.route('/register', methods=['POST'])
def register():
    params = request.json
    user = User(**params)
    session.add(user)
    session.commit()
    token = user.get_token()
    return {'access_token': token}

@app.route('/login', methods=['POST'])
def login():
    params = request.json
    user = User.authenticate(**params)
    token = user.get_token()
    return {'access_token': token}

@app.teardown_appcontext
def shutdown_session(exeption=None):
    session.remove()

if __name__ == '__main__':
    app.run()