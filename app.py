from flask import Flask, render_template, request, jsonify, url_for
from models.cost_calculator import calculate_final_cost 
import os

app = Flask(__name__)

@app.context_processor
def override_url_for():
    return dict(url_for=dated_url_for)

def dated_url_for(endpoint, **values):
    if endpoint == 'static':
        filename = values.get('filename', None)
        if filename:
            file_path = os.path.join(app.root_path,
                                     endpoint, filename)
            values['q'] = int(os.stat(file_path).st_mtime)
    return url_for(endpoint, **values)


@app.route('/')
def index():
    """ana sayfayı render eder"""
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    """
    gelen JSON verisini alır hesaplama yapar ve sonucu JSON olarak doner
    """
    data = request.json
    
    if not data or 'adet' not in data or not str(data['adet']).strip():
        return jsonify({"error": "Lütfen geçerli bir adet bilgisi girin."}), 400
    
    try:
        result = calculate_final_cost(data) 
        return jsonify(result), 200

    except ValueError as ve:
        app.logger.warning(f"Hesaplama hatası (kullanıcı girdisi): {ve}")
        return jsonify({"error": str(ve)}), 400
    
    except Exception as e:
        app.logger.error(f"Sunucu hatası: {e}", exc_info=True)
        return jsonify({"error": "Beklenmedik bir sunucu hatası oluştu"}), 500

if __name__ == '__main__':
    app.run(debug=True)