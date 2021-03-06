from arc_app import views
from rest_framework import renderers
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from django.conf.urls import url

#Create a router and register our viewsets
router = DefaultRouter()
router.register(r'userprofiles', views.UserProfileViewSet)
router.register(r'users', views.UserViewSet)
router.register(r'contracts', views.ContractViewSet)
router.register(r'sessions', views.SessionViewSet)
router.register(r'contractmeetings', views.ContractMeetingViewSet)
router.register(r'subjects', views.SubjectViewSet)

urlpatterns = [
    path(r'api/', include(router.urls)),
    path(r'verify/sessions/', views.verify, name='verify'),
    path(r'encode/', views.encode, name='encode')
]
