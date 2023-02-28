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
from schemas import UserSchema, AuthSchema, GeneralSchema, ErrorSchema, ShowTableSchema
from flask_apispec import use_kwargs, marshal_with
import logging

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

def setup_logger():
    logger=logging.getLogger(__name__)
    logger.setLevel(logging.DEBUG)
    
    formatter = logging.Formatter('%(asctime)s:%(name)s:%(levelname)s:%(message)s')
    filehandler = logging.FileHandler('./log/api.log')
    filehandler.setFormatter(formatter)
    logger.addHandler(filehandler)
    
    return logger

logger = setup_logger()

@app.route('/users', methods=['GET'])
@jwt_required()
@marshal_with(UserSchema(many=True)) #декаратору передается схема для сериализации данных в json
def get_users():
    try:
        users = User.query.all()
    except Exception as e:
        logger.warning(f' Users-read action falled with errors: {e}')
        return {'message': str(e)}, 400
    return users

@app.route('/users/<string:user_login>', methods=['GET'])
@marshal_with(UserSchema)
def get_user(user_login):
    try:
        check = User.query.filter(User.login==user_login).first()
        if not check:
            return {'message':'No users with this login'}, 200
    except Exception as e:
        logger.warning(f' User:{user_login} - read action falled with errors: {e}')
        return {'message': str(e)}, 400
    return {'message':'This user find on base'}, 200

@app.route('/errors', methods=['GET'])
#@jwt_required()
@marshal_with(ErrorSchema(many=True))
def get_errors_all():
    try:
        errors = Error.query.all()
    except Exception as e:
         logger.warning(f' Soft errors table read action falled with errors: {e}')
         return {'message': str(e)}, 400
    return errors

@app.route('/errors/<string:soft_code>', methods=['GET'])
#@jwt_required()
@marshal_with(ErrorSchema(many=True))
def get_errors_soft(soft_code):
    try:
        errors = Error.query.filter(Error.sf_code==soft_code).all()
        if not errors:
            return {'message':'No errors for this soft'}, 200
    except Exception as e:
        logger.warning(f' (Soft code:{soft_code}) soft errors table action falled with errors: {e}')
        return {'message': str(e)}, 400
    return errors

@app.route('/errors', methods=['POST'])
#@jwt_required()
@use_kwargs(ErrorSchema) #десериализация принимаемых данных по схеме для передачи в модель
@marshal_with(ErrorSchema) #сериализация данных по схеме для отображения 
def add_error(**kwargs): #принимает аргументы
    #params = request.json #для получения параметров без сериализации
    try:
        error = Error(**kwargs) #параметры, провренные по схеме, передаются в модель
        session.add(error)
        session.commit()
    except Exception as e:
        logger.warning(f' Add soft-error on table action falled with errors: {e}')
        return {'message': str(e)}, 400
    return error

@app.route('/general', methods=['GET'])
#@jwt_required()
@marshal_with(GeneralSchema(many=True))
def get_general():
    try:
        general = General.query.all()
    except Exception as e:
         logger.warning(f' GeneralTable-read action falled with errors: {e}')
         return {'message': str(e)}, 400
    return general

@app.route('/general/<string:soft_code>', methods=['GET'])
#@jwt_required()
@marshal_with(GeneralSchema(many=True))
def get_general_soft(soft_code):
    try:
        soft = General.query.filter(General.sf_code==soft_code).all()
        if not soft:
            return {'message':'No soft with this code'}, 200
    except Exception as e:
        logger.warning(f' (Soft code:{soft_code}) general table read action falled with error: {e}')
        return {'message': str(e)}, 400
    return soft

@app.route('/general', methods=['POST'])
#@jwt_required()
@use_kwargs(GeneralSchema) #десериализация принимаемых данных по схеме для передачи в модель
@marshal_with(GeneralSchema) #сериализация данных по схеме для отображения 
def add_soft(**kwargs): #принимает аргументы
    #params = request.json #для получения параметров без сериализации
    try:
        soft = General(**kwargs) #параметры, провренные по схеме, передаются в модель
        session.add(soft)
        session.commit()
    except Exception as e:
        logger.warning(f' Add soft on general table action falled with errors: {e}')
        return {'message': str(e)}, 400
    return soft


@app.route('/show_table', methods=['GET'])
#@jwt_required()
@marshal_with(ShowTableSchema(many=True))
def get_show_table():
    try:
        shtable = ShowTable.query.all()
    except Exception as e:
         logger.warning(f' ShowTable-read action falled with errors: {e}')
         return {'message': str(e)}, 400
    return shtable


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
@use_kwargs(UserSchema) #десериализация принимаемых данных по схеме для передачи в модель
@marshal_with(AuthSchema) #сериализация данных по схеме для отображения 
def register(**kwargs): #принимает аргументы
    #params = request.json #для получения параметров без сериализации
    try:
        user = User(**kwargs) #параметры, провренные по схеме, передаются в модель
        session.add(user)
        session.commit()
        token = user.get_token()
    except Exception as e:
        logger.warning(f' Register action falled with errors: {e}')
        return {'message': str(e)}, 400
    return {'access_token': token}

@app.route('/login', methods=['POST'])
@use_kwargs(UserSchema(only=('login','password'))) #ограничиваем передачу параметров в модель по схеме(только поля логин и пароль)
@marshal_with(AuthSchema)
def login(**kwargs):
    #params = request.json
    try:    
        user = User.authenticate(**kwargs)
        token = user.get_token()
    except Exception as e:
        logger.warning(f' Login action falled with errors: {e}')
        return {'message': str(e)}, 400    
    return {'access_token': token}

@app.teardown_appcontext
def shutdown_session(exeption=None):
    session.remove()
    
@app.errorhandler(422)
def error_handler(err):
    headers = err.data.get('headers', None)
    messages = err.data.get('messages',['Invalid request'])
    if headers:
        return jsonify({'message':messages}, 400, headers)
    else:
        return jsonify({'message':messages}, 400)
    
docs.register(login)
docs.register(register)
docs.register(get_user)
docs.register(get_users)

if __name__ == '__main__':
    app.run()