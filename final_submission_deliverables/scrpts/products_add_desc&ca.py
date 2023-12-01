import json
import yaml


with open("../../src/assets/products.json", 'r') as json_data:
    data = json.load(json_data)

# testing to see how to extract data
# print(data)
# print(data[0]['desc_path'])
# print(data[0]['desc_path'].replace('Description', 'Information'))
# print("../../src/public/" + data[0]['desc_path'].replace('Description', 'Information'))
# with open("../../src/public/" + data[0]['desc_path'].replace('Description', 'Information'), 'r') as product_info_reader:
#     product_info = product_info_reader.read().split('\n')
    # print(product_info)
    # print(product_info[1].strip()[product_info[1].strip().find(': ')+2:product_info[1].strip().rfind(',')])
    # print(product_info[1].strip().split()[-1])
    # print(product_info[1].strip().split()[-3].strip(','))
    # print(product_info[2].strip()[13:])
    # print(product_info[3].strip()[5:])


for product in data:
    with open("../../src/public/" +
              product['desc_path'].replace('Description', 'Information'), 'r') as product_info_reader:
        product_info = product_info_reader.read().strip().split('\n')

        # testing to see if formatting is correct
        # print(product['name'])
        #
        # print(product_info.split('\n')[1].strip().split()[-1])
        # try: print(product_info.split('\n')[1].strip().split()[-3].strip(','))
        # except: print("calories not found")
        # print(product_info.split('\n')[2].strip()[13:])
        # print(product_info.split('\n')[3].strip()[5:])
        # print('\n\n\n')

        # get nutrition info
        try: product_info[1].strip().split()[-3].strip(',')
        except: print("calories not found for: " + product['name'])

        if "volume" in product_info[1]:
            product["volume"] = product_info[1].strip().split()[-1]
            product["origin"] = product_info[1].strip()[product_info[1].strip().find(': ') + 2
                                                        :product_info[1].strip().rfind(',')]
        else:
            product["volume"] = "0000"
            product["origin"] = product_info[1].strip()[product_info[1].strip().find(': ') + 2:]
            print("calories not found for: " + product['name'])

        product["source"] = product_info[-1].strip()[5:]

    # get description
    with open("../../src/public/" +
              product['desc_path'], 'r') as product_desc_reader:
        product_desc = product_desc_reader.read().split('\n')
        product["description"] = product_desc[0].strip()


# print(json.dumps(data, indent=2))

# Save the updated JSON data
with open("../../src/assets/products.json", 'w') as json_data:
    json.dump(data, json_data, indent=2)
