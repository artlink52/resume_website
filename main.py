# from fastapi import FastAPI, Request
# from fastapi.responses import HTMLResponse
# from fastapi.staticfiles import StaticFiles
# from fastapi.templating import Jinja2Templates
# from pydantic import BaseModel
# from typing import List
# import uvicorn

# app = FastAPI()

# templates = Jinja2Templates(directory="templates")

# class DataModel(BaseModel):
#     keywords: List[str]

# # Тестовые данные
# test_data = [
#     {"keywords": ["ааа"], "option": "Все слова", "places": ["resume_title"]},
#     {"keywords": ["ббб"], "option": "Любое из слов", "places": ["education", "skills"]}
# ]

# @app.get("/", response_class=HTMLResponse)
# async def read_root(request: Request):
#     return templates.TemplateResponse("1str.html", {"request": request})

# @app.post("/submit", response_class=HTMLResponse)
# async def submit_data(data: DataModel, request: Request):
#     test_data.append(data.model_dump())
#     return {"message": "Data received successfully"}

# if __name__ == "__main__":
#     uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)

from fastapi import FastAPI, Request, Form, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from typing import Optional
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse, PlainTextResponse

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")


templates = Jinja2Templates(directory="templates")

vacancies = {
    "19d9a2d3-89ba-b21c-a4eb-65f99d5dec19_Фрезеровщик": {
        "value": "Изготовление сложно профильных деталей с точностью размеров по 4 - 6 квалификациям, сложных деталей с точностью размеров по 6, 7 квалификациям на фрезерных станках.\nОпыт работы в изготовлении режущего инструмента",
        "number": "talentforce"
    }
}

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
    return templates.TemplateResponse("2str.html", {"request": request, "vacancy_number": vacancy["number"], "vacancy_value": vacancy["value"]})



