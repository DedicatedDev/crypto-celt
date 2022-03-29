"""
This module converts a CSV export of our image rarity table to JSON as required
by generate_metadata.
"""
import argparse
import json

import pandas


def custom_case(text):
    exceptions = ['and', 'with']
    return ' '.join([
        word if word in exceptions else word.title() for word in text.split()])


def convert_csv(rarity_table):
    layers = []
    traits = rarity_table.columns[::2]

    for (idx, trait) in enumerate(traits):
        trait_values = []

        if trait == 'location':
            trait_values = rarity_table[trait].dropna().str.replace(
                '-', ' ').str.replace('  ', ' - ').to_list()
        else:
            trait_values = rarity_table[trait].dropna().str.replace(
                '-', ' ').str.replace('  ', ' - ').apply(custom_case).to_list()

        trait_filenames = rarity_table[trait].dropna().to_list()
        weight_column = f'weight.{idx}' if idx > 0 else 'weight'

        trait_weights = rarity_table[weight_column].dropna(
        )[:-1].str.rstrip('%').astype('float').to_list()

        layer = {}
        layer['name'] = trait.title()
        layer['values'] = trait_values
        layer['trait_path'] = f'{idx:02}-{trait.replace(" ", "-")}'
        layer['filename'] = trait_filenames
        layer['weights'] = trait_weights

        layers.append(layer)

    return layers


if __name__ == '__main__':
    parser = argparse.ArgumentParser()

    parser.add_argument('layers_csv_path',
                        type=argparse.FileType('r', encoding='UTF-8'))
    parser.add_argument('output_json_path', type=str)

    args = parser.parse_args()

    layers = convert_csv(pandas.read_csv(args.layers_csv_path))

    with open(args.output_json_path, 'w', encoding='utf-8') as f:
        json.dump(layers, f, ensure_ascii=False, indent=2)
