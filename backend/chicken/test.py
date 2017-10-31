import sqlite3
import pandas as pd
import datetime
conn = sqlite3.connect('./db.sqlite3')
c = conn.cursor()
#r = c.execute("SELECT name FROM sqlite_master WHERE type='table';")
#for i in r:
#    print(i)
req = [i for i in c.execute("select `item_name`, `amount`, `price` from transaction_transactionrecords")]
df = pd.DataFrame.from_records(req, columns=['name', 'amount', 'price'])

items = df.name.unique()
for item in items:
    item_df = df[df.name==item]
    price = item_df.iloc[0].price
    amount = item_df.sum().amount
    print(item, amount, amount*price)

conn.close()

