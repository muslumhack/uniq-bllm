from flask import Flask, render_template, request, jsonify
from gpt4all import GPT4All

app = Flask(__name__)

model = GPT4All("mpt-7b-chat-merges-q4_0.gguf") # Modeli buraya tanımla.

def generate_response(input_text):
    output = model.generate(input_text, max_tokens=300)
    return output

@app.route("/api", methods=["POST"])
def api():
    data = request.get_json()
    user_text = data.get("msg")
    response = generate_response(user_text)
    return jsonify({"response": response})

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api_info")
def api_info():
    return render_template("api_info.html")

@app.route("/get")
def get_bot_response():
    user_text = request.args.get("msg")
    response = generate_response(user_text)
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run()

