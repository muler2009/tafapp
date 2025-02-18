from rest_framework import generics, status, permissions, mixins
from rest_framework.response import Response
from rest_framework.request import Request
from exceptions.exceptions import CustomExceptionForError
from ...models.machine_model import MachineModel
from ...serializers.create.create_machine_serializer import MachineSerialzier

class MachineCreateRequestHandler(generics.GenericAPIView, mixins.CreateModelMixin):
    queryset = MachineModel.objects.all()
    serializer_class = MachineSerialzier

    def post(self, request, *args, **kwargs):
        try:
            serializer =self.validate_request_data(request=request)

            # Check for existing policy name
            machine = serializer.validated_data.get("machine_name")
            if MachineModel.objects.filter(machine_name=machine).exists():
                raise CustomExceptionForError(
                    message=f"Policy with '{machine}' name already exists in the system. You can reuse it if the permission you want to provide is the same, otherwise, create a new custom policy with a different name.",
                    error_type="ALREADY_EXIST", 
                    status_code=409
                )

            # Save the new policy
            machine = serializer.save()  # Save validated data and create the policy

            # Return success response
            return Response({
                "status_code": 201,
                "status_text": "OK",
                # "policy_id": policy.policy_ormomia_id,  # Optionally return the created policy ID
            }, status=status.HTTP_201_CREATED)

        except CustomExceptionForError as exc:
            # Handle custom exceptions
            return Response({
                "message": exc.message,
                "error_type": exc.error_type,
                "status_code": exc.status_code
            }, status=exc.status_code)



   # Validates the request data that will be posted
    def validate_request_data(self, request):
        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid():
            raise CustomExceptionForError(
                message=str(serializer.errors), error_type="ERROR", status_code=400
            )
        return serializer