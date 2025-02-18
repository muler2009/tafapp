
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
     path('taf/', include('taf.urls', namespace='taf')),

]
