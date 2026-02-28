"""Jobs router — CRUD and listing."""

import uuid
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_current_user, require_role
from app.db.enums import UserRole
from app.db.session import get_db_session
from app.models.user import User
from app.schemas.job import JobCreate, JobRead, JobUpdate
from app.schemas.bookmark import BookmarkMessage
from app.services.job_service import JobService
from app.services.profile_service import ProfileService
from app.services.bookmark_service import BookmarkService
from app.utils.pagination import PaginationParams

router = APIRouter(prefix="/jobs", tags=["Jobs"])


def _job_service(db: AsyncSession = Depends(get_db_session)) -> JobService:
    return JobService(db)


def _profile_service(db: AsyncSession = Depends(get_db_session)) -> ProfileService:
    return ProfileService(db)


def _bookmark_service(db: AsyncSession = Depends(get_db_session)) -> BookmarkService:
    return BookmarkService(db)


@router.post(
    "",
    response_model=JobRead,
    status_code=status.HTTP_201_CREATED,
    summary="Create a job posting (employer only)",
)
async def create_job(
    payload: JobCreate,
    current_user: Annotated[User, Depends(require_role(UserRole.EMPLOYER))],
    job_svc: Annotated[JobService, Depends(_job_service)],
    profile_svc: Annotated[ProfileService, Depends(_profile_service)],
):
    employer_profile = await profile_svc.get_employer_profile(current_user.id)
    if employer_profile is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Create an employer profile before posting jobs",
        )
    job = await job_svc.create(employer_profile.id, payload)
    # Re-fetch to eagerly load employer_profile for company_name
    job = await job_svc.get_by_id(job.id)
    return JobRead.model_validate(job)


@router.get(
    "",
    response_model=list[JobRead],
    summary="Search & filter jobs",
)
async def list_jobs(
    job_svc: Annotated[JobService, Depends(_job_service)],
    pagination: Annotated[PaginationParams, Depends()],
    keyword: str | None = Query(None, description="Search in title/description"),
    location: str | None = Query(None),
    experience_level: str | None = Query(None),
    job_type: str | None = Query(None),
    is_remote: bool | None = Query(None),
):
    jobs = await job_svc.list_jobs(
        skip=pagination.skip,
        limit=pagination.limit,
        keyword=keyword,
        location=location,
        experience_level=experience_level,
        job_type=job_type,
        is_remote=is_remote,
    )
    return [JobRead.model_validate(j) for j in jobs]


@router.get(
    "/employer/me",
    response_model=list[JobRead],
    summary="List own posted jobs (employer only)",
)
async def list_my_jobs(
    current_user: Annotated[User, Depends(require_role(UserRole.EMPLOYER))],
    job_svc: Annotated[JobService, Depends(_job_service)],
    profile_svc: Annotated[ProfileService, Depends(_profile_service)],
    pagination: Annotated[PaginationParams, Depends()],
):
    employer_profile = await profile_svc.get_employer_profile(current_user.id)
    if employer_profile is None:
        return []
    jobs = await job_svc.list_by_employer(
        employer_profile.id, pagination.skip, pagination.limit
    )
    return [JobRead.model_validate(j) for j in jobs]


@router.get(
    "/saved",
    response_model=list[JobRead],
    summary="List saved jobs (seeker only)",
)
async def list_saved_jobs_route(
    current_user: Annotated[User, Depends(require_role(UserRole.SEEKER))],
    bookmark_svc: Annotated[BookmarkService, Depends(_bookmark_service)],
    pagination: Annotated[PaginationParams, Depends()],
):
    jobs = await bookmark_svc.list_saved_jobs(
        current_user.id, pagination.skip, pagination.limit
    )
    return [JobRead.model_validate(j) for j in jobs]


@router.get(
    "/recommendations",
    response_model=list[JobRead],
    summary="Get job recommendations (seeker only)",
)
async def get_recommendations(
    current_user: Annotated[User, Depends(require_role(UserRole.SEEKER))],
    job_svc: Annotated[JobService, Depends(_job_service)],
):
    jobs = await job_svc.get_recommended_jobs(current_user.id)
    return [JobRead.model_validate(j) for j in jobs]


@router.get(
    "/{job_id}",
    response_model=JobRead,
    summary="Get job detail (increments view count)",
)
async def get_job(
    job_id: uuid.UUID,
    job_svc: Annotated[JobService, Depends(_job_service)],
):
    job = await job_svc.get_by_id(job_id, increment_views=True)
    if job is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Job not found"
        )
    return JobRead.model_validate(job)


@router.patch(
    "/{job_id}",
    response_model=JobRead,
    summary="Update a job (employer only, own jobs)",
)
async def update_job(
    job_id: uuid.UUID,
    payload: JobUpdate,
    current_user: Annotated[User, Depends(require_role(UserRole.EMPLOYER))],
    job_svc: Annotated[JobService, Depends(_job_service)],
    profile_svc: Annotated[ProfileService, Depends(_profile_service)],
):
    employer_profile = await profile_svc.get_employer_profile(current_user.id)
    if employer_profile is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Employer profile required",
        )
    job = await job_svc.update(job_id, employer_profile.id, payload)
    return JobRead.model_validate(job)


@router.delete(
    "/{job_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Archive a job (employer only, own jobs)",
)
async def delete_job(
    job_id: uuid.UUID,
    current_user: Annotated[User, Depends(require_role(UserRole.EMPLOYER))],
    job_svc: Annotated[JobService, Depends(_job_service)],
    profile_svc: Annotated[ProfileService, Depends(_profile_service)],
):
    employer_profile = await profile_svc.get_employer_profile(current_user.id)
    if employer_profile is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Employer profile required",
        )
    await job_svc.delete(job_id, employer_profile.id)


@router.post(
    "/{job_id}/save",
    response_model=BookmarkMessage,
    status_code=status.HTTP_200_OK,
    summary="Save a job (seeker only)",
)
async def save_job(
    job_id: uuid.UUID,
    current_user: Annotated[User, Depends(require_role(UserRole.SEEKER))],
    bookmark_svc: Annotated[BookmarkService, Depends(_bookmark_service)],
):
    await bookmark_svc.save_job(current_user.id, job_id)
    return {"message": "Job saved successfully"}


@router.delete(
    "/{job_id}/unsave",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Unsave a job (seeker only)",
)
async def unsave_job(
    job_id: uuid.UUID,
    current_user: Annotated[User, Depends(require_role(UserRole.SEEKER))],
    bookmark_svc: Annotated[BookmarkService, Depends(_bookmark_service)],
):
    await bookmark_svc.unsave_job(current_user.id, job_id)
