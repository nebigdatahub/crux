from django.apps import AppConfig


class CruxAppConfig(AppConfig):
    name = 'app'
    verbose_name = 'CRUX'

    def ready(self):
        import app.signals
