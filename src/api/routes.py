"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/hellov2', methods=['GET'])
def handle_hellov2():

    return jsonify("mensaje de hellov2"), 200


@api.route('/register', methods=['POST'])
def register():
    try:
        #extraer datos del pedido
        data = request.json
        #verificar que tenemos todos los datos
        if not data['email'] or not data['password']: 
            raise Exception("missing data")
        #verificar si el email ya esta registrado
        stm = select(User).where(User.email==data['email'])
        #scalar devuelve en objeto, sino se devolveria el query a la bd como tupla
        existing_user = db.session.execute(stm).scalar_one_or_none()
        if existing_user:
            return jsonify({"error": "email en uso, intenta logearte"}), 418
        #creamos un nuevo registro
        new_user = User(
            email=data['email'],
            password=data['password'],
            is_active=True
        )
        #añadimos registro nuevo a la bd
        db.session.add(new_user)
        #almacenamos cambios en la bd
        db.session.commit()
        #retornamos usuario nuevo serializado
        return jsonify({"success": True})
        
    except Exception as e:
        print(e)
        return jsonify({"Error": 'algo paso'})



@api.route('/login', methods=['POST'])
def login():
    try:
        #extraer datos del pedido
        data = request.json
        #verificar que tenemos todos los datos
        if not data['email'] or not data['password']: 
            raise Exception("missing data")
        #verificar si el email ya esta registrado
        stm = select(User).where(User.email==data['email'])
        user = db.session.execute(stm).scalar_one_or_none()
        #si no tenemos usuario mandamos que se registre
        if not user:
            return jsonify({"error": "el email no esta registrado"}), 418
        #verificamos contraseña de la bd con la que recibimos
        if user.password != data['password']:
            return jsonify({"error": "email/contraseña no valido"}), 418

       #generamos token. Tiene que ser un str porque asi lo pide la identidad, no puede ser un numero
        token = create_access_token(identity=str(user.id))
  

        return jsonify({"success": True, "token": token})
    except Exception as e:
        print(e)
        return jsonify({"Error": 'algo paso'})


#endpoint privado
# sera privado cuando necesitemos saber QUIEN es el que accede
# para metodos POST, PUT, DELETE y GET si el get es para devolver informacion del usuario o relacionada al usuario
@api.route('/private', methods=['GET'])
@jwt_required() #obliga a enviar el token desde el front
def get_user_info():
    id = get_jwt_identity()
    stm = select(User).where(User.id == id)
    user = db.session.execute(stm).scalar_one_or_none()
    if not user:
        return jsonify({"success": False, 'msg': 'que paso????'})

    return jsonify({"success": True, 'user':user.serialize()})