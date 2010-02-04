"""
define custom config that gets merged with tiddlyweb.config

specifcally, define what a space is
"""

config = {
    'space': {
        'bags': {
            'SPACE_NAME_public': {
                "desc": "SPACE_NAME public bag",
                "policy": {
                    "read": [],
                    "create": ["USER_NAME"],
                    "manage": ["USER_NAME"],
                    "accept": [],
                    "owner": "USER_NAME",
                    "write": ["USER_NAME"],
                    "delete": ["USER_NAME"]
                }
            },
            'SPACE_NAME_private': {
                "desc": "SPACE_NAME private bag",
                "policy": {
                    "read": ["USER_NAME"],
                    "create": ["USER_NAME"],
                    "manage": ["USER_NAME"],
                    "accept": [],
                    "owner": "USER_NAME",
                    "write": ["USER_NAME"],
                    "delete": ["USER_NAME"]
                }
            }
        },
        'recipes': {
            "SPACE_NAME_public": {
                "recipe": [
                    ["SPACE_NAME_public", ""]
                ],
                "desc": "SPACE_NAME public recipe"
                "policy": {
                    "read": [],
                    "create": ["USER_NAME"],
                    "manage": ["USER_NAME"],
                    "accept": [],
                    "owner": "USER_NAME",
                    "write": ["USER_NAME"],
                    "delete": ["USER_NAME"]
                }
            },
            "SPACE_NAME_private": {
                "recipe": [
                    ["system", ""],
                    ["SPACE_NAME_public", ""],
                    ["SPACE_NAME_private", ""]
                ],
                "desc": "SPACE_NAME private recipe"
                "policy": {
                    "read": ["USER_NAME"],
                    "create": ["USER_NAME"],
                    "manage": ["USER_NAME"],
                    "accept": [],
                    "owner": "USER_NAME",
                    "write": ["USER_NAME"],
                    "delete": ["USER_NAME"]
                }
            }
        }
    }
}