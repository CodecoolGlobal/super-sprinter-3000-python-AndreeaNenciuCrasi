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
    dict_list = get_all_user_story(filename)
    for line in dict_list:
        if line['id'] == mylist[0]:
            line['title'] = mylist[1]
            line['user_story'] = mylist[2]
            line['acceptance_criteria'] = mylist[3]
            line['business_value'] = mylist[4]
            line['estimation'] = mylist[5]
            line['status'] = mylist[6]
    with open(filename, 'w', newline='') as csv_file:
        fieldnames = DATA_HEADER
        writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
        writer.writeheader()
        for dict in dict_list:
            writer.writerow({'id': dict['id'], 'title': dict['title'], 'user_story': dict['user_story'],
                         'acceptance_criteria': dict['acceptance_criteria'],
                         'business_value': dict['business_value'], 'estimation': dict['estimation'], 'status': dict['status']})


# x = ['22', '33', '44', '55', '66', '77']
# write_user_story('data.csv', x)
# print(get_all_user_story('data.csv'))
# print('\n')
# mylist = ['2', 'TREI', 'TREI', 'TREI', '33', '77', '88']
# change_user_story('data.csv', mylist)

