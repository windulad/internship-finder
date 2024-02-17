from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from InterviewFinderApp.serializers import ApplicantSerializer
from InterviewFinderApp.models import Applicant

@csrf_exempt
def applicantApi(request, id=0):
    if request.method == 'GET':
        if id != 0:
            try:
                applicant = Applicant.objects.get(id=id)
                applicant_serializer = ApplicantSerializer(applicant)
                return JsonResponse(applicant_serializer.data, safe=False)
            except Applicant.DoesNotExist:
                return JsonResponse("Applicant not found", safe=False, status=404)
        else:
            applicants = Applicant.objects.all()
            applicant_serializer = ApplicantSerializer(applicants, many=True)
            return JsonResponse(applicant_serializer.data, safe=False)
    elif request.method == 'DELETE':
        try:
            applicant = Applicant.objects.get(id=id)
            applicant.delete()
            return JsonResponse("Deleted Successfully", safe=False)
        except Applicant.DoesNotExist:
            return JsonResponse("Applicant not found", safe=False, status=404)
    else:
        return JsonResponse("Invalid request method", safe=False, status=400)
