from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from datetime import datetime
from app.schemas import BugCreate, BugResponse

router = APIRouter()

# Mock bugs database
fake_bugs_db = [
    {
        "id": 1,
        "title": "Checkout Page Shows Empty Cart",
        "description": "When adding items to cart and proceeding to checkout, the cart section appears completely empty",
        "severity": "Critical",
        "bug_type": "Functional",
        "reproduction_steps": ["1. Login", "2. Add product", "3. Go to checkout"],
        "expected_behavior": "Cart displays all items",
        "actual_behavior": "Cart is empty",
        "environment": "Chrome 120, Windows 11",
        "status": "Open",
        "created_at": datetime.now(),
        "created_by": "tester@buggy.com"
    }
]

@router.get("", response_model=list[BugResponse])
async def get_bugs(
    status: Optional[str] = None,
    severity: Optional[str] = None,
    skip: int = 0,
    limit: int = 20
):
    """Get all bug reports with filtering"""
    results = fake_bugs_db
    
    if status:
        results = [b for b in results if b["status"].lower() == status.lower()]
    if severity:
        results = [b for b in results if b["severity"].lower() == severity.lower()]
    
    return results[skip:skip + limit]

@router.get("/{bug_id}", response_model=BugResponse)
async def get_bug(bug_id: int):
    """Get specific bug by ID"""
    bug = next((b for b in fake_bugs_db if b["id"] == bug_id), None)
    if not bug:
        raise HTTPException(status_code=404, detail="Bug not found")
    return bug

@router.post("", response_model=BugResponse)
async def create_bug(bug: BugCreate):
    """Create new bug report"""
    new_bug = {
        "id": len(fake_bugs_db) + 1,
        **bug.dict(),
        "status": "Open",
        "created_at": datetime.now(),
        "created_by": "tester@buggy.com"
    }
    fake_bugs_db.append(new_bug)
    return new_bug

@router.put("/{bug_id}/status")
async def update_bug_status(bug_id: int, status: str):
    """Update bug status"""
    bug = next((b for b in fake_bugs_db if b["id"] == bug_id), None)
    if not bug:
        raise HTTPException(status_code=404, detail="Bug not found")
    
    if status not in ["Open", "In Progress", "Resolved", "Closed"]:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    bug["status"] = status
    return bug

@router.get("/severity/{severity}", response_model=list[BugResponse])
async def get_by_severity(severity: str):
    """Get bugs by severity level"""
    if severity not in ["Critical", "High", "Medium", "Low"]:
        raise HTTPException(status_code=400, detail="Invalid severity level")
    return [b for b in fake_bugs_db if b["severity"] == severity]

@router.delete("/{bug_id}")
async def delete_bug(bug_id: int):
    """Delete bug report"""
    global fake_bugs_db
    if not any(b["id"] == bug_id for b in fake_bugs_db):
        raise HTTPException(status_code=404, detail="Bug not found")
    fake_bugs_db = [b for b in fake_bugs_db if b["id"] != bug_id]
    return {"message": "Bug deleted"}

@router.get("/stats/summary")
async def get_bug_statistics():
    """Get bug statistics"""
    return {
        "total_bugs": len(fake_bugs_db),
        "by_severity": {
            "Critical": len([b for b in fake_bugs_db if b["severity"] == "Critical"]),
            "High": len([b for b in fake_bugs_db if b["severity"] == "High"]),
            "Medium": len([b for b in fake_bugs_db if b["severity"] == "Medium"]),
            "Low": len([b for b in fake_bugs_db if b["severity"] == "Low"])
        },
        "by_status": {
            "Open": len([b for b in fake_bugs_db if b["status"] == "Open"]),
            "In Progress": len([b for b in fake_bugs_db if b["status"] == "In Progress"]),
            "Resolved": len([b for b in fake_bugs_db if b["status"] == "Resolved"]),
            "Closed": len([b for b in fake_bugs_db if b["status"] == "Closed"])
        }
    }
