from test.test_base import TestBase


class HomeHandlerTest(TestBase):

    def test_welcome(self):
        response = self.api.get('/welcome')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json['welcomeMessage'],
            'Step 1: Run the server (completed!)')

    def test_registration(self):
        response = self.api.post('/registration')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json['message'],
            'User registration')

    def test_login(self):
        response = self.api.post('/login')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json['message'],
            'User login')

    def test_logout_access(self):
        response = self.api.post('/logout/access')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json['message'],
            'User logout')

    def test_logout_refresh(self):
        response = self.api.post('/logout/refresh')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json['message'],
            'User logout')

    def test_token_refresh(self):
        response = self.api.post('/token/refresh')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json['message'],
            'Token refresh')

