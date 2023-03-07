from marshmallow import Schema, validate, fields

class UserSchema(Schema):
    id = fields.Integer(dump_only=True) #dump_only, чтобы сереализовать в json,но не загружать в модель 
    login = fields.String(required=True, validate=[validate.Length(max=50)])
    password = fields.String(required=True, validate=[validate.Length(max=100)], load_only=True) #load_only работает как dump_only,но наоборот, только при десериализации(отправки в модель)
    message = fields.String(dump_only=True)
    
class AuthSchema(Schema):
    access_token = fields.String(dump_only=True)    
    message = fields.String(dump_only=True)
    
class GeneralSchema(Schema):
    id = fields.Integer(dump_only=True)
    soft_name = fields.String(required=True, validate=[validate.Length(max=100)])
    soft_code = fields.String(required=True, validate=[validate.Length(max=100)])
    save_type_logs = fields.String(required=True, validate=[validate.Length(max=50)])
    path_dir = fields.String(validate=[validate.Length(max=500)])
    server_name = fields.String(validate=[validate.Length(max=100)])
    databs_name = fields.String(validate=[validate.Length(max=100)])
    table_name = fields.String(validate=[validate.Length(max=100)])
    user_name = fields.String(validate=[validate.Length(max=100)])
    pwd = fields.String(validate=[validate.Length(max=100)])
    watching = fields.Boolean(required=True)
    default_time_watching = fields.Integer(required=True)
    active_time_watching = fields.Integer(required=True)
    message = fields.String(dump_only=True)
    
class ErrorSchema(Schema):
    id_er = fields.Integer(dump_only=True)
    err_code = fields.Integer(required=True)
    err_descr = fields.String(required=True, validate=[validate.Length(max=200)])
    err_date_qry = fields.String(validate=[validate.Length(max=200)])
    err_status = fields.String(required=True, validate=[validate.Length(max=100)])
    coef_status = fields.Float(required=True)
    sf_code = fields.String(required=True, validate=[validate.Length(max=100)])
    gen = fields.Nested(GeneralSchema(only=('soft_code',)))
    message = fields.String(dump_only=True)
    
class ShowTableSchema(Schema):
    id_sf = fields.Integer(dump_only=True)
    id_sf_gen = fields.Integer(required=True)
    sf_name = fields.String(required=True, validate=[validate.Length(max=200)])
    sf_code = fields.String(required=True, validate=[validate.Length(max=200)])
    last_upd_date = fields.DateTime()
    last_log_hash = fields.String(validate=[validate.Length(max=200)])
    last_log_id = fields.String(validate=[validate.Length(max=100)])
    err_cd = fields.Integer()
    gen_c = fields.Nested(GeneralSchema(only=('id','soft_name','soft_code',)))
    message = fields.String(dump_only=True)