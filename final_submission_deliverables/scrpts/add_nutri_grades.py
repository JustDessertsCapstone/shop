import pandas as pd
import json
import requests
import io
import time


def get_grade(url):
    # Use requests to download the CSV data
    response = requests.get(url)
    csv_data = response.text

    # Load the CSV data into a DataFrame
    df = pd.read_csv(io.StringIO(csv_data), sep='\t', usecols={
        'off:nutriscore_grade',
        'off:nutriscore_score'
    }, dtype={
        'off:nutriscore_grade': 'string',
        'off:nutriscore_score': 'Int64',  # Assuming it's an integer
    })

    # Calculate the mode of the 'off:nutriscore_score' column
    mode_score = df['off:nutriscore_score'].mode().iloc[0]

    # Find the corresponding 'off:nutriscore_grade' for the mode score
    matching_grade = df.loc[df['off:nutriscore_score'] == mode_score, 'off:nutriscore_grade'].iloc[0]

    return matching_grade


if __name__ == '__main__':
    json_file = '../../src/assets/products.json'

    # Load the JSON data
    with open(json_file, 'r') as json_data:
        data = json.load(json_data)

    # Add grades of searchable products and populate unknown_products with unsearchable products
    # tot = len(data)
    # unknown_products = []
    # for i, obj in enumerate(data):
    #     time.sleep(2)
    #     search_term = f"{obj['name'].replace('-', '%20')}" if obj['class_name'].lower() in obj[
    #         'name'].lower() else f"{obj['name'].replace('-', '%20')}%20{obj['class_name']}"
    #     clean_term = search_term.replace('%20', ' ')
    #     try:
    #         data[i]['nutrition_grade'] = get_grade(
    #             f"https://world.openfoodfacts.org/cgi/search.pl?action=process&search_terms={search_term}&sort_by=unique_scans_n&page_size=24&download=on&format=csv")
    #         print(f"added {clean_term} : {(i + 1.0) / tot}")
    #     except:
    #         print(f"{clean_term} ERRORED!!!")
    #         unknown_products.append(clean_term)
    # 
    # print(f"unknown_products: {unknown_products}")
    
    # Manually populate unknown_products with searchable [related] products
    unknown_products = [('Kaiser Pear', 'Bosc Pear'),
                   ('God Morgon Orange Red Grapefruit Juice', 'God Morgon Orange & red grapefruit'),
                   ('God Morgon Red Grapefruit Juice', 'God Morgon red grapefruit'),
                   ('Tropicana Mandarin Morning Juice', 'Tropicana'),
                   ('Arla Ecological Medium Fat Milk', 'Arla Milk'),
                   ('Arla Lactose Medium Fat Milk', 'Arla Lactose Milk'),
                   ('Arla Medium Fat Milk', 'Arla Milk'),
                   ('Arla Standard Milk', 'Arla Milk'),
                   ('Garant Ecological Medium Fat Milk', 'Garant Milk'),
                   ('Garant Ecological Standard Milk', 'Garant Milk'),
                   ('Oatly Natural Oatghurt', 'Oatgurt plain - Oatly'),
                   ('Arla Ecological Sour Cream', 'gräddfil'),
                   ('Alpro Blueberry Soyghurt', 'Soygurt'),
                   ('Alpro Vanilla Soyghurt', 'Soygurt'),
                   ('Alpro Fresh Soy Milk', 'Alpro Soy Milk'),
                   ('Alpro Shelf Soy Milk', 'Alpro Soy Milk'),
                   ('Arla Natural Mild Low Fat Yoghurt', 'Mild yoghurt naturell'),
                   ('Arla Natural Yoghurt', 'Mild yoghurt naturell'),
                   ('Valio Vanilla Yoghurt', 'Valio Vanilla Yogurt'),
                   ('Yoggi Strawberry Yoghurt', 'Yoggi Yoghurt'),
                   ('Brown Cap Mushroom', 'Brown Mushroom'),
                   ('Orange Bell Pepper', 'Sweet peppers - Sainsbury'),
                   ('Floury Potato', 'British Maris Piper Potatoes')]

    # Add grades of unknown_products with updated searchable [related] products
    for (pre, post) in unknown_products:
        try:
            search_term = post.replace(' ', '%20')
            grade = get_grade(f"https://world.openfoodfacts.org/cgi/search.pl?action=process&search_terms={search_term}&sort_by=unique_scans_n&page_size=24&download=on&format=csv")
            print(f"{pre} : {grade}")
        except:
            print(f"{pre} didn't work for some reason")

    # Save the updated JSON data
    with open(json_file, 'w') as json_data:
        json.dump(data, json_data, indent=2)
