import csv
import os

DATA_FILE_PATH = os.getenv('DATA_FILE_PATH') if 'DATA_FILE_PATH' in os.environ else 'data.csv'
DATA_HEADER = ['id', 'title', 'user_story', 'acceptance_criteria', 'business_value', 'estimation', 'status']
STATUSES = ['planning', 'todo', 'in progress', 'review', 'done']


def count_rows_in_file(file_name):
    file = open(file_name, "r")
    count = len(file.readlines())
    file.close()
    return count

def get_all_user_story(filename):
    dict_list = []
    with open(filename) as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            dict_list.append(row)
    return dict_list

def write_user_story(filename, mylist):
    count = count_rows_in_file(filename)
    mylist.insert(0, count)
    with open(filename, 'a', newline='') as csvfile:
        fieldnames = DATA_HEADER
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        writer.writerow({DATA_HEADER[0]: mylist[0], DATA_HEADER[1]: mylist[1], DATA_HEADER[2]: mylist[2], DATA_HEADER[3]: mylist[3],
                         DATA_HEADER[4]: mylist[4], DATA_HEADER[5]: mylist[5], DATA_HEADER[6]: mylist[6]})

def change_user_story(filename, mylist):
    with open(filename) as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            if row['id'] == mylist[0]:
                with open(filename, 'a', newline='') as csvfile:
                    fieldnames = DATA_HEADER
                    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
                    writer.writerow({row['id']: mylist[0], row['title']: mylist[1], row['user_story']: mylist[2],
                                     row['acceptance_criteria']: mylist[3],
                                     row['business_value']: mylist[4], row['estimation']: mylist[5], row['status']: mylist[6]})
# x = ['22', '33', '44', '55', '66', '77']
# write_user_story('data.csv', x)
# print(get_all_user_story('data.csv'))
mylist = ['5', '11', '44', '55', '33', '77', '88']
change_user_story('data.csv', mylist)
