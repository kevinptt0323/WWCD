import coreapi
from rest_framework_swagger.renderers import OpenAPIRenderer, SwaggerUIRenderer
from rest_framework.decorators import api_view, renderer_classes
from rest_framework import response, schemas
from mac import coreapi as macAPI
from transaction import coreapi as transacAPI

content = {}
content.update(macAPI.link)
content.update(transacAPI.link)

document = coreapi.Document(
    title='Backend API',
    url='http://pubg.nctu.me:8000/',
    content=content
    )

@api_view()
@renderer_classes([SwaggerUIRenderer, OpenAPIRenderer])
def schema_view(request):
    return response.Response(document)
