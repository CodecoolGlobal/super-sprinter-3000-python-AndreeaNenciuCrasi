from flask import Flask, render_template, request, redirect, url_for

import data_handler

app = Flask(__name__)
FILE = 'data.csv'

@app.route('/')
@app.route('/list')
def route_list():
    user_stories = data_handler.get_all_user_story(FILE)

    return render_template('list.html', user_stories=user_stories)

@app.route('/add')
def route_add():
   return render_template('add.html')

@app.route('/result',methods = ['POST', 'GET'])
def result():
   global FILE
   mylist = []
   if request.method == 'POST':
        result = request.form
        for value in result.values():
            mylist.append(value)
        mylist.append('-')
        data_handler.write_user_story(FILE, mylist)
        return render_template("result.html",result = result)
   else:
        return render_template('result.html')


@app.route('/update/<id_story>', methods = ['POST', 'GET'])
def route_edit(id_story):
    table = data_handler.get_all_user_story(FILE)
    result = {}
    if request.method == 'GET':
        for line in table:
            if line['id'] == id_story:
                result = line
        return render_template('update.html', result = result)

@app.route('/result_edit', methods=['POST', 'GET'])
def route_edit_result():
    mylist = []
    if request.method == 'POST':
       new_result = request.form
       for value in new_result.values():
           mylist.append(value)
       data_handler.change_user_story(FILE, mylist)
       return render_template('result_edit.html', result=new_result, mylist = mylist)
    else:
        return render_template('result_edit.html')


if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=8000,
        debug=True,
    )
