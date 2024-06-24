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

# @app.post("/submit-vacancy")
# async def submit_vacancy(request: Request, vacancy_number: str = Form(...), keywords: str = Form(...)):
#     for key in vacancies:
#         if key == vacancy_number:
#             return RedirectResponse(url=f"/vacancy/{key}", status_code=302)
#     return templates.TemplateResponse("1str.html", {"request": request, "error": "Введенный номер вакансии и UID не существуют."})

@app.post("/submit-vacancy")
async def submit_vacancy(
    request: Request, 
    vacancy_number: str = Form(...), 
    keywords: str = Form(...), 
    uid_number: str = Form(...),
    option1: str = Form(None),
    where: List[str] = Form(None)
):
    if not all(keyword.strip() for keyword in keywords.split(';')):
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





# @app.get("/", response_class=HTMLResponse)
# async def index(request: Request):
#     return templates.TemplateResponse("2str.html", {"request": request, "data": resumes})



# from fastapi import FastAPI, Request, Form, HTTPException
# from fastapi.responses import HTMLResponse
# from fastapi.templating import Jinja2Templates
# from typing import Optional
# from fastapi.staticfiles import StaticFiles
# from fastapi.responses import RedirectResponse, PlainTextResponse
# import json
# from pydantic import BaseModel
# from typing import Dict, List, Optional
# # from fastapi.responses import StreamingResponse
# # from jinja2 import Environment, FileSystemLoader
# # from weasyprint import HTML
# # import io

# app = FastAPI()


# templates = Jinja2Templates(directory="templates")
# app.mount("/static", StaticFiles(directory="static"), name="static")
# # env = Environment(loader=FileSystemLoader('templates'))

# with open('vacancies.json', 'r', encoding='utf-8') as f:
#     vacancies = json.load(f)

# with open('resumes.json', 'r', encoding='utf-8') as f:
#     resumes = json.load(f)

# class Job(BaseModel):
#     company_name: str
#     post: str
#     post_desc: str
#     period_begin: str
#     period_end: Optional[str]

# class Education(BaseModel):
#     university: str
#     specialization: str
#     year_of_graduation: str

# class CandidateInfo(BaseModel):
#     education: List[Education]
#     job: List[Job]


# @app.get("/1str", response_class=HTMLResponse)
# async def get_first_page(request: Request):
#     return templates.TemplateResponse("1str.html", {"request": request, "error": None})

# @app.post("/submit-vacancy")
# async def submit_vacancy(request: Request, vacancy_key: str = Form(...)):
#     if vacancy_key not in vacancies:
#         return templates.TemplateResponse("1str.html", {"request": request, "error": "Введенный номер вакансии не существует."})
    
#     # # Поиск резюме по UID
#     # if uid not in resumes:
#     #     return templates.TemplateResponse("1str.html", {"request": request, "error": f"Кандидат с UID {uid} не найден."})
    
#     # Возвращаем редирект на страницу с вакансией и UID
#     return RedirectResponse(url=f"/vacancy/{vacancy_key}", status_code=302)
    

# @app.get("/vacancy/{vacancy_key}", response_class=HTMLResponse)
# async def get_vacancy(request: Request, vacancy_key: str):
#     if vacancy_key not in vacancies:
#         raise HTTPException(status_code=404, detail="Вакансия не найдена")
#     vacancy = vacancies[vacancy_key]
#     return templates.TemplateResponse("2str.html", {"request": request, "vacancy_number": vacancy_key, "vacancy_value": vacancy["value"], "data": resumes})
# # @app.get("/vacancy/{vacancy_number}/{uid}", response_class=HTMLResponse)
# # async def get_vacancy(request: Request, vacancy_number: str, uid: str):
# #     # Проверяем существование вакансии
# #     if vacancy_number not in vacancies:
# #          raise HTTPException(status_code=404, detail="Вакансия не найдена")
# #     vacancy = vacancies[vacancy_number]
    
# #     # Проверяем существование кандидата по UID
# #     if uid not in resumes:
# #         raise HTTPException(status_code=404, detail=f"Кандидат с UID {uid} не найден")
    
# #     # Получаем данные о кандидате по UID
# #     # candidateInfo = resumes[uid]

# #     # Отображаем страницу с данными о вакансии и кандидате
# #     return templates.TemplateResponse("2str.html", {"request": request, "vacancy_number": vacancy_number, "vacancy_value": vacancy["value"], "data": resumes})


# # @app.get("/download_pdf")
# # async def download_pdf(candidate_key: str):
# #     template = env.get_template('resume_pdf_template.html')
    
# #     if candidate_key not in resumes:
# #         return {"error": "Резюме не найдено"}

# #     candidate_info = resumes[candidate_key]
# #     html_content = template.render(candidate_key=candidate_key, candidate_info=candidate_info)
    
# #     # Генерация PDF
# #     pdf_file = HTML(string=html_content).write_pdf()
    
# #     # Возврат PDF в качестве ответа
# #     return StreamingResponse(io.BytesIO(pdf_file), media_type="application/pdf", headers={"Content-Disposition": f"attachment;filename={candidate_key}.pdf"})


# # @app.get("/", response_class=HTMLResponse)
# # async def index(request: Request):
# #     return templates.TemplateResponse("2str.html", {"request": request, "data": resumes})



