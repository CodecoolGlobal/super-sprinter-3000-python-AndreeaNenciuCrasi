from flask import Flask, render_template, request, redirect, url_for

import data_handler

app = Flask(__name__)

@app.route('/')
@app.route('/list')
def route_list():
    user_stories = data_handler.get_all_user_story('data.csv')

    return render_template('list.html', user_stories=user_stories)

@app.route('/add')
def route_add():
   return render_template('add.html')

@app.route('/result',methods = ['POST', 'GET'])
def result():
   mylist = []
   if request.method == 'POST':
        result = request.form
        for value in result.values():
            mylist.append(value)
        mylist.append('-')
        data_handler.write_user_story('data.csv', mylist)
        return render_template("result.html",result = result)
   else:
        return render_template('result.html')

@app.route('/update')
def route_edit():
    statuses = ['planning', 'todo', 'in progress', 'review', 'done']
    current = 'planning'

    return render_template('update.html', statuses=statuses, selected_status=current)

if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=8000,
        debug=True,
    )
