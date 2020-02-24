from rest_framework import serializers
from arc_app.models import UserProfile, Contract, Session, ContractMeeting
from django.contrib.auth.models import User

#TODO: need testing
class UserProfileSerializer(serializers.HyperlinkedModelSerializer):
	tutor_contracts = serializers.HyperlinkedRelatedField(many=True, view_name='contract-detail', read_only=True)
	tutee_contracts = serializers.HyperlinkedRelatedField(many=True, view_name='contract-detail', read_only=True)
	class Meta:
		model = UserProfile
		fields = ('url','id', 'user', 'tutor_contracts',
			'tutee_contracts','first_name', 'last_name', 
			'email','d_number','phone', 'is_tutor', 
			'is_tutee', 'is_admin')

class ContractSerializer(serializers.HyperlinkedModelSerializer):
	sessions = serializers.HyperlinkedRelatedField(many=True, view_name='session-detail', read_only=True)
	contract_meetings = serializers.HyperlinkedRelatedField(many=True, view_name='contractmeeting-detail', read_only=True)
	class Meta:
		model = Contract
		fields = ('url', 'id', 'tutor', 'tutee','sessions',
			'contract_meetings', 'class_name', 'subject', 'professor_name')

class UserSerializer(serializers.HyperlinkedModelSerializer):
	userprofiles = serializers.HyperlinkedRelatedField(many=False, view_name='userprofile-detail', read_only=True)
	class Meta:
		model = User
		fields = ('url', 'id', 'userprofiles', 'first_name', 'last_name', 'email')

class SessionSerializer(serializers.HyperlinkedModelSerializer): 
	class Meta: 
		model = Session
		fields = ('url', 'id', 'contract', 'date', 'start', 'end', 'summary')

class ContractMeetingSerializer(serializers.HyperlinkedModelSerializer): 
	class Meta: 
		model = ContractMeeting
		fields = ('url','id', 'contract', 'date', 'start', 'end', 'location')

		
