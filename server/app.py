from flask import Flask, request
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}
    
class HandleFormData(Resource):
    def post(self):
        upload = request.files['file']
        print(upload)
        return {'hello': 'world'}

api.add_resource(HelloWorld, '/')
api.add_resource(HandleFormData,'/api/upload/new')

if __name__ == '__main__':
    app.run(debug=True)