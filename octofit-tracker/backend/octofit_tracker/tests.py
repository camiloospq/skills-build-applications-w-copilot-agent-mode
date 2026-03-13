from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import User, Team, Activity, Leaderboard, Workout

class APITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        Team.objects.create(name='Marvel')
        Team.objects.create(name='DC')
        User.objects.create_user(username='ironman', email='ironman@marvel.com', password='password', team='Marvel')
        User.objects.create_user(username='batman', email='batman@dc.com', password='password', team='DC')
        Activity.objects.create(user='ironman', team='Marvel', type='run', duration=30)
        Leaderboard.objects.create(team='Marvel', points=100)
        Workout.objects.create(name='Push Ups', difficulty='Easy')

    def test_api_root(self):
        response = self.client.get(reverse('api-root'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_users_list(self):
        response = self.client.get('/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_teams_list(self):
        response = self.client.get('/teams/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_activities_list(self):
        response = self.client.get('/activities/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_leaderboard_list(self):
        response = self.client.get('/leaderboard/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_workouts_list(self):
        response = self.client.get('/workouts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
