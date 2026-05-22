"""
/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Endpoints utilisateurs et gestion de profil
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
*/──────────────────────────────────
"""

from fastapi import APIRouter, Depends
from app.api import deps
from app.models.user import UserResponse

router = APIRouter()

@router.get("/me", response_model=UserResponse)
async def read_users_me(
    current_user: dict = Depends(deps.get_current_active_user)
):
    """
    Get current user profile.
    """
    return current_user

@router.get("/admin-test", response_model=dict)
async def test_admin_access(
    current_user: dict = Depends(deps.get_current_active_admin)
):
    """
    Test admin access. Returns a message if the user is an admin.
    """
    return {"message": "You have admin privileges", "user_id": current_user["id"]}
