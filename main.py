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
async def submit_vacancy(request: Request):
    form_data = await request.form()
    
    vacancy_number = form_data.get('vacancy_number')
    group_count = int(form_data.get('group_count', 1))
    uid_number = form_data.get('uid_number')
    
    all_keywords = []
    all_options = []
    all_where = []

    for i in range(group_count):
        keywords = form_data.getlist(f'keywords_{i}')
        option1 = form_data.getlist(f'option1_{i}')
        where = form_data.getlist(f'where_{i}')

        if keywords:
            all_keywords.extend(keywords)
        if option1:
            all_options.extend(option1)
        if where:
            all_where.extend(where)

    if all_keywords:
        keywords = ';'.join(all_keywords)
        if keywords and not all(keyword.strip() for keyword in keywords.split(';')):
            return templates.TemplateResponse("1str.html", {"request": request, "error": "Ключевые слова должны быть разделены точкой с запятой."})

    if vacancy_number in vacancies:
        query_params = {
            "uid_number": uid_number,
            "keywords": keywords if all_keywords else None,
            "option1": all_options[0] if all_options else None,  
            "where": ','.join(all_where) if all_where else ""
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
    key: str
    id: str
    label: int

@app.post("/process_data")
async def process_data(data: LabelData):
    key = data.key
    id = data.id
    label = data.label
    print(f"Получен label: {label}, key: {key}, id: {id}")
    return {"message": "Данные успешно получены"}

