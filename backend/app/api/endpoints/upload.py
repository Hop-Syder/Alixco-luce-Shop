import os
import cloudinary
import cloudinary.uploader
from fastapi import APIRouter, UploadFile, File, HTTPException, status
from pydantic import BaseModel

router = APIRouter()

# Initialisation de Cloudinary (si les variables ne sont pas dans CLOUDINARY_URL)
# Par défaut, cloudinary utilise CLOUDINARY_URL si elle est présente dans l'environnement.
cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME')
api_key = os.getenv('CLOUDINARY_API_KEY')
api_secret = os.getenv('CLOUDINARY_API_SECRET')

if cloud_name and api_key and api_secret:
    cloudinary.config(
        cloud_name=cloud_name,
        api_key=api_key,
        api_secret=api_secret
    )

class UploadResponse(BaseModel):
    url: str

@router.post("/", response_model=UploadResponse)
async def upload_image(file: UploadFile = File(...)):
    # Validate file extension
    allowed_extensions = ["jpg", "jpeg", "png", "webp", "gif"]
    file_ext = file.filename.split(".")[-1].lower() if "." in file.filename else ""
    if file_ext not in allowed_extensions:
        raise HTTPException(status_code=400, detail="Type de fichier non autorisé. Seuls JPG, PNG, WEBP et GIF sont acceptés.")

    try:
        # Read the file content
        contents = await file.read()
        
        # Upload to Cloudinary
        result = cloudinary.uploader.upload(contents, folder="alixco_luxe")
        
        # Return the secure url provided by Cloudinary
        secure_url = result.get("secure_url")
        if not secure_url:
            raise Exception("Impossible de récupérer l'URL sécurisée depuis Cloudinary")
            
        return UploadResponse(url=secure_url)
    except Exception as e:
        print(f"Erreur d'upload: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erreur lors de l'upload: {str(e)}"
        )
