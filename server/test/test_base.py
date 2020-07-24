
import unittest
from app import flask_app

class TestBase(unittest.TestCase):

    # executed prior to each test
    def setUp(self):
        flask_app.testing = True
        self.api = flask_app.test_client()

    # executed after each test
    def tearDown(self):
        pass

    if __name__ == "__main__":
        unittest.main()
