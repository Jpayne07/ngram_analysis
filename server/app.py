from flask import Flask, request, make_response
from flask_restful import Resource, Api
from collections import defaultdict
import io
import csv

app = Flask(__name__)
api = Api(app)

class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}
    
class HandleFormData(Resource):
    def post(self):
        upload = request.files['file']
        decoded_file = upload.read().decode('utf-8')
        csvfile = io.StringIO(decoded_file)
        reader = csv.DictReader(csvfile)
        reader.fieldnames = [field.lstrip('\ufeff').strip().lower() for field in reader.fieldnames]
        # Read the first line
        absolute_freq = defaultdict(int)
        weighted_freq = defaultdict(float)
        for row in reader:
            try:
                phrase = row.get('word', '').strip().lower()
                value = float(row.get('value', '0'))

                if not phrase:
                    continue

                unique_words = set(phrase.split())

                for word in unique_words:
                    absolute_freq[word] += 1
                    weighted_freq[word] += value

            except (ValueError, KeyError):
                continue

        # Create an in-memory CSV file for the response
        output = io.StringIO()
        fieldnames = ['word', 'absolute_frequency', 'weighted_frequency']
        writer = csv.DictWriter(output, fieldnames=fieldnames)
        writer.writeheader()

        for word in absolute_freq:
            writer.writerow({
                'word': word,
                'absolute_frequency': absolute_freq[word],
                'weighted_frequency': weighted_freq[word]
            })

        # Return it as a downloadable file
        response = make_response(output.getvalue())
        response.headers["Content-Disposition"] = "attachment; filename=word_frequencies.csv"
        response.headers["Content-type"] = "text/csv"
        return response

api.add_resource(HelloWorld, '/')
api.add_resource(HandleFormData,'/api/upload/new')

if __name__ == '__main__':
    app.run(debug=True)