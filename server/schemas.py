from marshmallow import Schema, validate, fields

class UserSchema(Schema):
    id = fields.Integer(dump_only=True) #dump_only, чтобы сереализовать в json,но не загружать в модель 
    login = fields.String(required=True, validate=[validate.Length(max=50)])
    password = fields.String(required=True, validate=[validate.Length(max=100)], load_only=True) #load_only работает как dump_only,но наоборот, только при десериализации(отправки в модель)
    message = fields.String(dump_only=True)
    
class AuthSchema(Schema):
    access_token = fields.String(dump_only=True)    
    message = fields.String(dump_only=True)