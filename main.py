from fastapi import FastAPI, Request, Form, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from typing import Optional
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse, PlainTextResponse, JSONResponse
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
async def submit_vacancy(
    request: Request, 
    vacancy_number: str = Form(...), 
    keywords: Optional[str] = Form(None), 
    uid_number: str = Form(...),
    option1: str = Form(None),
    where: List[str] = Form(None)
):
    if keywords and not all(keyword.strip() for keyword in keywords.split(';')):
        return templates.TemplateResponse("1str.html", {"request": request, "error": "Ключевые слова должны быть разделены точкой с запятой."})

    if vacancy_number in vacancies:
        query_params = {
            # "vacancy_number": vacancy_number,
            "keywords": keywords,
            "uid_number": uid_number,
            "option1": option1,
            "where": ",".join(where) if where else ""
        }
        query_string = "&".join(f"{key}={value}" for key, value in query_params.items() if value)
        return RedirectResponse(url=f"/vacancy/{vacancy_number}?{query_string}", status_code=302)
    
    return templates.TemplateResponse("1str.html", {"request": request, "error": "Введенный номер вакансии и UID не существуют."})

@app.get("/vacancy/{vacancy_key}", response_class=HTMLResponse)
async def get_vacancy(request: Request, vacancy_key: str):
    if vacancy_key not in vacancies:
        raise HTTPException(status_code=404, detail="Вакансия не найдена")
    vacancy = vacancies[vacancy_key]
    return templates.TemplateResponse("2str.html", {"request": request, "vacancy_number": vacancy_key, "vacancy_value": vacancy["value"], "data": resumes})



class CandidateInfo(BaseModel):
    key: str
    id: str

# Список добавленных кандидатов
added_candidates = []

@app.post("/process-resumes")
async def process_resumes(candidates: List[CandidateInfo]):
    global added_candidates
    added_candidates = candidates
    return {"message": "Данные успешно обработаны"}

@app.get("/added-resumes", response_class=HTMLResponse)
async def get_added_candidates(request: Request):
    global added_candidates
    return templates.TemplateResponse("3str.html", {"request": request, "addedCandidates": added_candidates})

class LabelData(BaseModel):
    label: int

@app.post("/process_data")
async def process_data(data: LabelData):
    label = data.label
    print(f"Получен label: {label}")
    return {"message": "Данные успешно получены"}

