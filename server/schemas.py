from marshmallow import Schema, validate, fields

class UserSchema(Schema):
    id = fields.Integer(dump_only=True) #dump_only, чтобы сереализовать, но не принимать как входящий параметр
    login = fields.String(required=True, validate=[validate.Length(max=50)])
    password = fields.String(required=True, validate=[validate.Length(max=100)])
    