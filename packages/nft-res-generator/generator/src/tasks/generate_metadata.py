"""
This module generates images and metadata for CryptoCelts: Druids,
including conditions such as:

- Total druids
  - 8,888
- White robed:
  - 88
  - only have the power of dimension shifting
  - other colours can't have dimension shifting
- Black robed
  - 888
- Green robed
  - 1,776
  - only have wild deer antlers
- Grey robed
  - 2,664
- Brown robed
  - 3,472
- Hood colour matches robe colour
- Facial hair colour matches hair colour
- All druids have headgear
- 50% of all druids don't have facial hair

We quickly hacked https://gitlab.com/mintroad/tech/mirrors/nft-generator-py for
our use case (during 2021). Other additions include concurrent execution and the
creation of rarity.json based on rarity.tools (at this time).

This project requires JSON layers configuration as input, which is generated from CSV file
using another task.

For future projects, I'd take a look at something like HashLips to align with
JS, depending on complexity.
"""
import argparse
import json
import os
import random
from multiprocessing import Pool
from pathlib import Path

import pandas as pd
from PIL import Image, ImageDraw, ImageFont

SLIM_COMBOS = {
    'brown': 'brown-with-white',
    'grey': 'grey-with-black',
    'green': 'green-with-grey',
    'black': 'black-with-green',
    'white': 'white-with-brown'
}

POWERS = {
    'telepathy':  12.5,
    'shapeshifting': 12.5,
    'atmokinesis': 12.5,
    'zoolingualism': 12.5,
    'phytokinesis': 12.5,
    'time travel': 12.5,
    'clairvoyance': 12.5,
    'world creation': 12.5
}

GIFTS = {
    'luck': 4.00,
    'success': 4.00,
    'wealth': 4.00,
    'happiness': 4.00,
    'charm': 4.00,
    'prowess': 4.00,
    'seduction': 4.00,
    'beauty': 4.00,
    'strength': 4.00,
    'intuition': 4.00,
    'leadership': 4.00,
    'revelation': 4.00,
    'intelligence': 4.00,
    'agility': 4.00,
    'speed': 4.00,
    'healing': 4.00,
    'kindness': 4.00,
    'vitality': 4.00,
    'diplomacy': 4.00,
    'creativity': 4.00,
    'understanding': 4.00,
    'wisdom': 4.00,
    'passion': 4.00,
    'erotism': 4.00,
    'curiosity': 4.00
}

MAGICS = {
    'white magic': 15.00,
    'grey magic': 15.00,
    'black magic': 15.00,
    'chaos magic': 15.00,
    'earth magic': 10.00,
    'enochian magic': 15.00,
    'candle magic': 15.00
}


def custom_case(text):
    exceptions = ['and', 'with']

    return ' '.join([
        word if word in exceptions else word.title() for word in text.split()])


def semirandom_robe_mapping():
    population = range(1, 8888 + 1)
    brown_robes = random.sample(population, 3472)

    population_minus_brown = list(set(population) - set(brown_robes))
    grey_robes = random.sample(population_minus_brown, 2664)

    population_minus_grey = list(set(population_minus_brown) - set(grey_robes))
    green_robes = random.sample(population_minus_grey, 1776)

    population_minus_green = list(
        set(population_minus_grey) - set(green_robes))
    black_robes = random.sample(population_minus_green, 888)

    white_robes = list(set(population_minus_green) - set(black_robes))

    return {
        **dict.fromkeys(brown_robes, 'brown'),
        **dict.fromkeys(grey_robes, 'grey'),
        **dict.fromkeys(green_robes, 'green'),
        **dict.fromkeys(black_robes, 'black'),
        **dict.fromkeys(white_robes, 'white')
    }


def special_robe(colour):
    return random.choices(
        (colour, SLIM_COMBOS[colour]), weights=(90, 10), k=1)[0]


def create_new_image(id, robes, all_images, config):
    new_image = {}

    for layer in config["layers"]:
        selection = random.choices(
            layer["values"],
            weights=layer["weights"],
            k=1)[0]

        new_image[layer["name"]] = selection

    colour = (robes[id]
              if new_image['Robe'] != 'Slim'
              else special_robe(robes[id]))

    new_image['Robe'] += f" - {custom_case(colour.replace('-', ' '))}"

    if colour.startswith('green'):
        headgear_colour = new_image['Headgear'].rsplit(' - ', 1)[1]
        new_image['Headgear'] = f"Wild Deer Antlers - {headgear_colour}"

    if new_image in all_images:
        return create_new_image(id, robes, all_images, config)
    else:
        return new_image


def image_worker(pad_amount, item, robes, trait_files, config):
    layers = []

    for index, attr in enumerate(item):
        if attr != 'tokenId':
            layers.append([])
            filename = ''

            if attr == "Robe":
                filename = item[attr].replace(
                    ' - ', '--').replace(' ', '-').lower()
            elif attr == "Facial Hair" and item[attr] != 'None':
                if item['Hair'] == 'None':
                    hair_colour = [
                        ('alabaster', 7.7),
                        ('silver', 8.5),
                        ('brunette', 12.3),
                        ('treehouse', 12.3),
                        ('ebony', 10),
                        ('ginger', 9.9),
                        ('di-serria', 12.3),
                        ('wheat-blonde', 12.3),
                        ('sandy-blonde', 12.3)
                    ]

                    hair_colour = random.choices(*zip(*hair_colour))[0]
                else:
                    hair_colour = item['Hair'].rsplit(
                        ' - ', 1)[1].lower().replace(' ', '-')

                filename = f"{trait_files[attr][item[attr]]}--{hair_colour}"
            elif attr == "Headgear" and item[attr].startswith('Wild Deer Antlers'):
                headgear_colour = item[attr].rsplit(' - ')[1]
                filename = f"wild-deer-antlers--{headgear_colour.lower().replace(' ', '-')}"
            else:
                filename = trait_files[attr][item[attr]]

            image_path = os.path.join(
                config['assets_dir_path'],
                config['layers'][index]['trait_path'],
                f'{filename}.png'
            )
            layers[index] = Image.open(image_path).convert('RGBA')

    hood_image_path = f'{config["assets_dir_path"]}/hoods/{robes[item["tokenId"]]}.png'
    hood = Image.open(hood_image_path).convert('RGBA')
    layers.insert(9, hood)

    main_composite = Image.alpha_composite(layers[0], layers[1])
    layers.pop(0)
    layers.pop(0)

    for index, remaining in enumerate(layers):
        main_composite = Image.alpha_composite(main_composite, remaining)

    rgb_img = main_composite.convert('RGB')
    token_id = str(item["tokenId"]).zfill(pad_amount)

    if config["is_fake_image"]:
        fake_image = Image.new('RGB', (2000, 2000), color=(255, 255, 255))
        draw = ImageDraw.Draw(fake_image)
        font = ImageFont.truetype("assets/fonts/Lato-Regular.ttf", size=40)
        draw.text((5, 5), token_id, fill=(0, 0, 0), font=font)
        rgb_img = fake_image

    rgb_img.save(f'{config["output_dir_path"]}/images/{token_id}.png')


def generate_unique_images(amount, config):
    print("Generating {} unique NFTs...".format(amount))

    robes = semirandom_robe_mapping()

    pad_amount = len(str(amount))
    trait_files = {}
    trait_rarity = {}

    for trait in config["layers"]:
        trait_files[trait["name"]] = {}
        for x, key in enumerate(trait["values"]):
            trait_files[trait["name"]][key] = trait["filename"][x]

    all_images = []

    for i in range(amount):
        new_trait_image = create_new_image(i + 1, robes, all_images, config)
        all_images.append(new_trait_image)

    # This is added here so the duplicate check in the create call works
    images_with_ids = [dict(token, **{'tokenId': index + 1})
                       for index, token in enumerate(all_images)]

    # Metadata
    meta_file_base = f'{config["output_dir_path"]}/metadata'

    for i, token in enumerate(images_with_ids):
        i += 1
        attributes = []

        for key in token:
            if key != "tokenId":
                attributes.append({"trait_type": key, "value": token[key]})

        (power_types, power_weights) = zip(*POWERS.items())
        power = 'dimension shifting' if robes[token["tokenId"]] == 'white' else random.choices(
            power_types, weights=power_weights, k=1)[0]
        attributes.append({'trait_type': 'Power', 'value': power.title()})

        (gift_types, gift_weights) = zip(*GIFTS.items())
        gift = random.choices(gift_types, weights=gift_weights, k=1)[0]
        attributes.append({'trait_type': 'Gift', 'value': gift.title()})

        (magic_types, magic_weights) = zip(*MAGICS.items())
        magic = random.choices(magic_types, weights=magic_weights, k=1)[0]
        attributes.append({'trait_type': 'Magic', 'value': magic.title()})

        name = config["name"] + str(i).zfill(pad_amount)
        description = f'{name} has the power of {power} and gives the owner the gift of {gift} using {magic}.'

        for trait in attributes:
            name = trait['trait_type']
            value = trait['value']
            trait_rarity[name] = trait_rarity.get(name, {})
            trait_rarity[name][value] = trait_rarity[name].get(
                value, {'count': 0, 'score': 0})
            trait_rarity[name][value]['count'] += 1

        token_metadata = {
            "tokenId": i,
            "name":  config["name"] + str(i).zfill(pad_amount),
            "description": description,
            "attributes": attributes
        }
        meta_file_number = str(i).zfill(pad_amount)
        meta_file_name = f'{meta_file_number}.json'
        meta_file_path = f'{meta_file_base}/{meta_file_name}'

        with open(meta_file_path, 'w') as outfile:
            json.dump(token_metadata, outfile, indent=4)

    with open(f'{meta_file_base}/all-objects.json', 'w') as outfile:
        json.dump(images_with_ids, outfile, indent=4)

    for trait_values in trait_rarity.values():
        for value in trait_values.values():
            value['score'] = round(1 / (value['count'] / amount), 2)

    with open(f'{meta_file_base}/rarity.json', 'w') as outfile:
        json.dump(trait_rarity, outfile, indent=4)

    jobs = []
    for item in images_with_ids:
        jobs.append((pad_amount, item, robes, trait_files, config))

    with Pool() as pool:
        pool.starmap(image_worker, jobs)


def dir_path(string):
    if os.path.isdir(string):
        return string
    else:
        raise NotADirectoryError(string)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('assets_dir_path', type=dir_path)
    parser.add_argument('output_dir_path', type=str)
    parser.add_argument('amount', type=int)
    parser.add_argument('--fake-image', action='store_true')

    args = parser.parse_args()

    Path(os.path.join(args.output_dir_path), 'images') \
        .mkdir(parents=True, exist_ok=True)

    Path(os.path.join(args.output_dir_path), 'metadata') \
        .mkdir(parents=True, exist_ok=True)

    layers_input_file = os.path.join(args.assets_dir_path, 'layers.json')
    layers = pd.read_json(layers_input_file, typ='series').to_list()

    generate_unique_images(args.amount, {
        "assets_dir_path": args.assets_dir_path,
        "output_dir_path": args.output_dir_path,
        "layers": layers,
        "incompatibilities": [],
        "is_fake_image": args.fake_image,
        "name": "Druid #",
    })
