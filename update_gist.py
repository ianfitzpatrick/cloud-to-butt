#!/usr/bin/env python

"""
Having the list of phrases to change in a gist is really handy from
a usability and transparency standpoint. But not so much from a "getting at
the data via JSON" standpoint.

The RAW gist URL changes every time it's updated, so we can't point at it
directly. If you try to figure out the RAW gist's URL via the Github
API, you face rate limits of the API.

Instead I'm serving the JSON from another hosting provider. This scripts
retrieves the RAW gist via Github's API, and is called by a cron job.
Downloads and overwrites the gist.

The browser extension is then pointed at this file, not at Github
directly.
"""

import json
import os
import requests


gist_id     = '37c37e32074ff1f648db3a4b77411ddb'
api_url     = 'https://api.github.com/gists/%s' % gist_id
filename    = 'normalization-to-not-phrases.json'
cwd         = os.path.dirname(os.path.realpath(__file__))
full_file   = '%s/%s' % (cwd, filename)

# Get URL via API of RAW Gist
gist_json = requests.get(api_url).json()
gist_url = gist_json['files'][filename]['raw_url']

# Actually retrieve RAW Gist file contents and write to file
gist_data = requests.get(gist_url).json()

with open(full_file, 'w') as outfile:
    json.dump(gist_data, outfile)



