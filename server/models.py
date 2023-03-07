from app import db, session, Base
from flask_jwt_extended import create_access_token
from datetime import timedelta
from passlib.hash import bcrypt

from sqlalchemy.orm import relationship

class User(Base):
    __tablename__= 'users'
    id =db.Column(db.Integer, primary_key=True)
    login =db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)
    
    def __init__(self, **kwargs):
        self.login = kwargs.get('login')
        self.password = bcrypt.hash(kwargs.get('password'))
    
    def get_token(self, expire_time=24):
        expire_delta = timedelta(expire_time)
        token = create_access_token(
            identity=self.id,
            expires_delta=expire_delta
        )
        return token
    
    @classmethod
    def authenticate(cls, login, password):
        user = cls.query.filter(cls.login == login).one()
        if not bcrypt.verify(password, user.password):
            raise Exception('No user with this password')
        return user
    
class General(Base):
    __tablename__= 'generals'
    id =db.Column(db.Integer, primary_key=True, autoincrement=True)
    soft_name = db.Column(db.String(100), primary_key=True, unique=True)
    soft_code = db.Column(db.String(100), primary_key=True, unique=True)
    save_type_logs = db.Column(db.String(50), nullable=False)
    path_dir = db.Column(db.String(500))
    server_name = db.Column(db.String(100))
    databs_name = db.Column(db.String(100))
    table_name = db.Column(db.String(100))
    user_name = db.Column(db.String(100))
    pwd = db.Column(db.String(100))
    watching = db.Column(db.Boolean,  nullable=False, default=True)
    default_time_watching= db.Column(db.Integer,  nullable=False, default=1)
    active_time_watching= db.Column(db.Integer,  nullable=False, default=1)
    er = relationship('Error', back_populates="gen")
    stC = relationship('ShowTable', back_populates="gen_c")

    def set_default_time(self):
        self.active_time_watching=self.default_time_watching
    def get_id(self):
        return self.id
        
    
class Error(Base):
    __tablename__='errors'
    id_er = db.Column(db.Integer, primary_key=True, autoincrement=True)
    err_code = db.Column(db.Integer)
    err_descr = db.Column(db.String(200))
    err_date_qry = db.Column(db.String(200))
    err_status = db.Column(db.String(100))
    coef_status = db.Column(db.Float, nullable=False)
    sf_code = db.Column(db.String(100), db.ForeignKey('generals.soft_code'))
    gen = relationship('General',  back_populates="er")
    
    
class ShowTable(Base):
    __tablename__='show_table'
    id_sf =db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_sf_gen = db.Column(db.Integer)
    sf_name = db.Column(db.String(100)) 
    sf_code = db.Column(db.String(100))
    last_upd_date = db.Column(db.DateTime)
    last_log_hash = db.Column(db.String(200))
    last_log_id = db.Column(db.String(100))
    err_cd = db.Column(db.Integer)
    gen_c = relationship(
        "General",
        foreign_keys="[ShowTable.sf_name, ShowTable.sf_code, ShowTable.id_sf_gen]",
        back_populates="stC",
    )
    __table_args__ = (db.ForeignKeyConstraint([id_sf_gen, sf_name, sf_code],[General.id, General.soft_name, General.soft_code], onupdate="CASCADE", ondelete="SET NULL"),)
   
   