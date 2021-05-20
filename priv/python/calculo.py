import camelot
import mysql.connector


def main(vl):
    soma = 2 + vl
    tables = camelot.read_pdf('/home/mauricio/Documents/1/lotus/assets/public/pdf_tmp/123.pdf')
    result = str(tables[0].df[0:1])
    return [soma, result]
