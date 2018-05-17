from social_core.backends.oauth import BaseOAuth2
import social_core.pipeline.social_auth
import social_core.pipeline.user
import social_django.models
import requests
import json


class FigshareBackend(BaseOAuth2):
    """Figshare OAuth Backend"""

    name = 'figshare'
    AUTHORIZATION_URL = 'https://figshare.com/account/applications/authorize'
    ACCESS_TOKEN_URL = 'https://figshare.com/v2/token'

    def get_user_details(self, response):
        """Return user details from Figshare account"""
        print(response.get('email'))
        return {
            'username': response.get('email').split('@')[0],
            'email': response.get('email'),
            'first_name': response.get('first_name'),
            'last_name': response.get('last_name')
        }

    def user_data(self, access_token, *args, **kwargs):
        """Loads user data from service"""
        url = 'https://api.figshare.com/v2/account'
        response = requests.get(
            url, headers={'Authorization': f'token {access_token}'}
        )
        return json.loads(response.content)
