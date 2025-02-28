from rest_framework import generics, mixins, permissions, status
from rest_framework.response import Response
from exceptions.exceptions import CustomExceptionForError
from ...models.machine_model import MachineModel



class MachineRemoveRequestHandler(generics.GenericAPIView, mixins.DestroyModelMixin):
    lookup_field = "machine_id" 
    permission_classes = [permissions.IsAuthenticated]

    # get the instance to be deleted via its primary key 
    def get_object(self):
        machine_id = self.kwargs.get(self.lookup_field)
        try:
            instantce = MachineModel.objects.get(pk=machine_id)
            return instantce
        except MachineModel.DoesNotExist:
            return
        

    def destroy(self, request, *args, **kwargs):
        try:
            instance_deleted = self.get_object()
            if not instance_deleted:
                raise CustomExceptionForError(message="Data Not Found", error_type="NOT_FOUND", status_code=4004)
            # if instance found
            self.perform_destroy(instance_deleted)
            return Response({'message': "Successfully deleted"}, status=status.HTTP_204_NO_CONTENT)
            
        except CustomExceptionForError as custom_exception:
            return Response(
                {
                    "message": custom_exception.message,
                    "error_type": custom_exception.error_type,
                    "status_code": custom_exception.status_code
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
    def perform_destroy(self, instance):
        return instance.delete()
            