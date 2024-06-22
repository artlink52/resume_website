from fastapi import FastAPI, Request, Form, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from typing import Optional
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse, PlainTextResponse
import json
from pydantic import BaseModel
from typing import Dict, List, Optional

app = FastAPI()


templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")

with open('vacancies.json', 'r', encoding='utf-8') as f:
    vacancies = json.load(f)

with open('resumes.json', 'r', encoding='utf-8') as f:
    resumes = json.load(f)

class Job(BaseModel):
    company_name: str
    post: str
    post_desc: str
    period_begin: str
    period_end: Optional[str]

class Education(BaseModel):
    university: str
    specialization: str
    year_of_graduation: str

class CandidateInfo(BaseModel):
    education: List[Education]
    job: List[Job]


@app.get("/1str", response_class=HTMLResponse)
async def get_first_page(request: Request):
    return templates.TemplateResponse("1str.html", {"request": request, "error": None})

@app.post("/submit-vacancy")
async def submit_vacancy(request: Request, vacancy_number: str = Form(...)):
    for key in vacancies:
        if key == vacancy_number:
            return RedirectResponse(url=f"/vacancy/{key}", status_code=302)
    return templates.TemplateResponse("1str.html", {"request": request, "error": "Введенный номер вакансии не существует."})

@app.get("/vacancy/{vacancy_key}", response_class=HTMLResponse)
async def get_vacancy(request: Request, vacancy_key: str):
    if vacancy_key not in vacancies:
        raise HTTPException(status_code=404, detail="Вакансия не найдена")
    vacancy = vacancies[vacancy_key]
    return templates.TemplateResponse("2str.html", {"request": request, "vacancy_number": vacancy_key, "vacancy_value": vacancy["value"], "data": resumes})





# @app.get("/", response_class=HTMLResponse)
# async def index(request: Request):
#     return templates.TemplateResponse("2str.html", {"request": request, "data": resumes})



