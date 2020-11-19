import mysql.connector

def conn1():
    return mysql.connector.connect(
        host = 'localhost',
        user = 'root',
        password = 'bim1',
        database = 'db_android'
    )

def close_connection(conn, cursor):
    conn.close()
    cursor.close()

class database:
    def rate(self, values):
        try:
            query = 'insert into rating(restaurantName, restaurantType, price, date_visit, serviceRating, foodRating, cleanlinessRating, total ,note) values(%s, %s, %s, %s, %s, %s, %s, %s, %s)'
            conn = conn1()
            cursor = conn.cursor(buffered = True, dictionary = True)
            cursor.execute(query,values)
            conn.commit()
            row_affected = cursor.rowcount
            close_connection(conn, cursor)
            return row_affected
        except:
            raise Exception
            return 'wrong'
    # get rating
    def get_rating(seft):
        try:
            # query = 'select * from tblstory'
            query = 'select * from rating'
            conn = conn1()
            cursor = conn.cursor(buffered = True, dictionary = True)
            cursor.execute(query)
            result = cursor.fetchall()
            print(result)
            close_connection(conn, cursor)
            return result
        except:
            raise Exception
            return 'Wrong'
